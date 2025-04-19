import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';

interface FindAllParams {
  projectId: string;
  skip: number;
  take: number;
  filters?: {
    level?: string;
    type?: number;
    search?: string;
    from?: string;
    to?: string;
  };
}

class IssueFilterBuilder {
  private whereClause: any = {};

  constructor(projectId: string) {
    this.whereClause.projectId = projectId;
  }

  withLevel(level?: string) {
    if (level) {
      this.whereClause.level = level;
    }
    return this;
  }

  withType(type?: number) {
    if (type !== undefined) {
      this.whereClause.type = type;
    }
    return this;
  }

  withSearch(search?: string) {
    if (search) {
      this.whereClause.message = { 
        contains: search, 
        mode: Prisma.QueryMode.insensitive 
      };
    }
    return this;
  }

  withDateRange(from?: string, to?: string) {
    if (from || to) {
      this.whereClause.timestamp = {
        ...(from ? { gte: from } : {}),
        ...(to ? { lte: to } : {})
      };
    }
    return this;
  }

  build() {
    return this.whereClause;
  }
}

@Injectable()
export class IssuesService {
  constructor(private prisma: PrismaService) {}

  async findAll({ projectId, skip, take, filters }: FindAllParams) {
    // Build query conditions using the builder pattern
    const where = new IssueFilterBuilder(projectId)
      .withLevel(filters?.level)
      .withType(filters?.type)
      .withSearch(filters?.search)
      .withDateRange(filters?.from, filters?.to)
      .build();

    // Get total count for pagination
    const total = await this.prisma.event.count({ where });

    // Get paginated results
    const items = await this.prisma.event.findMany({
      where,
      skip,
      take,
      orderBy: { timestamp: 'desc' },
    });

    return {
      items,
      meta: {
        total,
        page: Math.floor(skip / take) + 1,
        limit: take,
        hasMore: skip + take < total,
      },
    };
  }
}
