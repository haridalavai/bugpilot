import { Module } from '@nestjs/common';
import { IssuesController } from './issues.controller';
import { IssuesService } from './issues.service';
import { PrismaService } from 'src/database/prisma.service';
import { ClickhouseService } from 'src/database/clickhouse.service';
@Module({
  controllers: [IssuesController],
  providers: [IssuesService, PrismaService, ClickhouseService],
})
export class IssuesModule {}
