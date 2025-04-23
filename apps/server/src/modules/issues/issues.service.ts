import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';

interface FindAllParams {
  skip: number;
  take: number;
  filters?: {
    level?: string;
    type?: number;
    search?: string;
    from?: string;
    to?: string;
    projectId?: string;
  };
}

class IssueFilterBuilder {
  private whereClause: any = {};

  constructor() {
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

  withProjectId(projectId?: string) {
    if (projectId) {
      this.whereClause.projectId = projectId;
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

  async findAll({ skip, take, filters }: FindAllParams) {
    // Build query conditions using the builder pattern
    const where = new IssueFilterBuilder()
      .withLevel(filters?.level)
      .withType(filters?.type)
      .withSearch(filters?.search)
      .withDateRange(filters?.from, filters?.to)
      .withProjectId(filters?.projectId)
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
