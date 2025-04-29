import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { ClickhouseService } from 'src/database/clickhouse.service';
import { PrismaService } from 'src/database/prisma.service';
import { IngestEventDto } from './dto/injest.dto';
import { v4 as uuidv4 } from 'uuid';
import { IngestionStrategy } from './strategies/ingestion-strategy.interface';
import { ErrorStrategy } from './strategies/error-ingestion-strategy';

@Injectable()
export class IngestionService {
  constructor(
    private prisma: PrismaService,
    private clickhouseService: ClickhouseService,
  ) {}

  async validateApiKey(projectId: string, apiKey: string): Promise<boolean> {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: { apiKey: true },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    if (!project.apiKey) {
      throw new NotFoundException('API key not found');
    }

    if (project.apiKey.key !== apiKey) {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }

  getStrategy(eventType: string): IngestionStrategy {
    switch (eventType) {
      case 'error':
        return new ErrorStrategy(this.clickhouseService, this.prisma);
      default:
        throw new NotFoundException('Invalid event type');
    }
  }

  async ingest(body: IngestEventDto, projectId: string): Promise<void> {
    try {
      const traceId = uuidv4();

      const eventType = body.eventType;
      const payload = body.payload;
      const sessionId = payload.sessionId;
      const user = payload.user;

      const session = await this.prisma.session.findUnique({
        where: {
          id: sessionId,
        },
      });

      let sessionUser = await this.prisma.sessionUser.findFirst({
        where: {
          email: user.email || 'anonymous@bugpilot.com',
        },
      });

      if (!sessionUser) {
        sessionUser = await this.prisma.sessionUser.create({
          data: {
            email: user.email || 'anonymous@bugpilot.com',
            name: user.name || 'Anonymous',
            image: user.image || '',
            moreInfo: user.moreInfo || {},
          },
        });
      }

      if (!session) {
        await this.prisma.session.create({
          data: {
            id: sessionId,
            status: 'active',
            source: payload.source,
            environment: payload.environment,
            project: {
              connect: {
                id: projectId,
              },
            },
            sessionUser: {
              connect: {
                id: sessionUser.id,
              },
            },
          },
        });
      }

      const strategy = this.getStrategy(eventType);
      await strategy.process(payload);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
