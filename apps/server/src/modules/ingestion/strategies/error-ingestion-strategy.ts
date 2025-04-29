import { Injectable } from '@nestjs/common';
import { IngestionStrategy } from './ingestion-strategy.interface';
import { ErrorPayload } from '@bugpilot/common';
import { ClickhouseService } from 'src/database/clickhouse.service';
import { PrismaService } from 'src/database/prisma.service';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class ErrorStrategy implements IngestionStrategy {
  constructor(
    private readonly clickhouseService: ClickhouseService,
    private readonly prisma: PrismaService,
  ) {}
  
  async process(payload: ErrorPayload): Promise<{ success: boolean }> {
    try {
      console.log('Processing error:', payload);
      const traceId = uuidv4();
      this.prisma.errorMeta.create({
        data: {
         project:{
          connect: {
            id: payload.projectId
          }
         },
         session:{
          connect: {
            id: payload.sessionId
          }
         },
         timestamp: payload.timestamp,
         message: payload.message,
         level: payload.level || "info",
         traceId: traceId,
        },
      });

      const error = await this.prisma.errorMeta.create({
        data: {
          level: payload.level,
          message: payload.message,
          timestamp: payload.timestamp,
          traceId: traceId,
          project: {
            connect: {
              id: payload.projectId,
            },
          },
          session: {
            connect: {
              id: payload.sessionId,
            },
          },
        },
      });

      const client = this.clickhouseService.getClient();
      client.insert({
        table: 'events',
        format: 'JSONEachRow',
        values: [{ 
          trace_id: traceId,
          project_id: payload.projectId,
          device: payload.device,
          timestamp: payload.timestamp,
          source: payload.source,
          message: payload.message,
          level: payload.level,
          environment: payload.environment,
          stacktrace: payload.stacktrace,
          tags: payload.tags,
        }],
      });
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }
}

