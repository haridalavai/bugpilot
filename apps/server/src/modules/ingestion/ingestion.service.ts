import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { ClickhouseService } from 'src/database/clickhouse.service';
import { PrismaService } from 'src/database/prisma.service';
import { IngestEventDto } from './dto/injest.dto';
import { v4 as uuidv4 } from 'uuid';

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

  async ingest(body: IngestEventDto, projectId: string): Promise<void> {
    try {
      console.log('Ingesting event', body);
      const traceId = uuidv4();

      const event = await this.prisma.event.create({
        data: {
         project:{
          connect: {
            id: projectId
          }
         },
         timestamp: body.timestamp,
         message: body.message,
         type: body.type,
         level: body.level || "info",
         traceId: traceId,
        },
      });

      const client = this.clickhouseService.getClient();
      const result = await client.insert({
        table: 'events',
        format: 'JSONEachRow',
        values: [{ 
          trace_id: traceId,
          project_id: projectId,
          device: body.device,
          timestamp: body.timestamp,
          source: body.source,
          type: body.type,
          message: body.message,
          level: body.level,
          environment: body.environment,
          stacktrace: body.stacktrace,
          tags: body.tags,
        }],
      });
      console.log(result);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
