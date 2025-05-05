import { PrismaService } from 'src/database/prisma.service';
import { IngestionStrategy } from './ingestion-strategy.interface';
import { UpdateSessionPayload } from '@bugpilot/common';

export class UpdateSessionStrategy implements IngestionStrategy {
  constructor(private readonly prisma: PrismaService) {}

  async process(payload: UpdateSessionPayload): Promise<void> {
    const { sessionId, endTime, status } = payload;

    await this.prisma.session.update({
      where: { id: sessionId },
      data: {
        status,
        endTime,
      },
    });
  }
}
