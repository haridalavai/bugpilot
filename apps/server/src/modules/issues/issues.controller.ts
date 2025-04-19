import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';
import { IssuesService } from './issues.service';

@ApiTags('issues')
@Controller('issues')
export class IssuesController {
    constructor(private readonly issuesService: IssuesService) {}

    @Get('project/:projectId')
    @ApiOperation({ summary: 'Get all issues for a project' })
    @ApiParam({ name: 'projectId', description: 'The ID of the project' })
    @ApiQuery({ name: 'page', required: false, description: 'Page number (default: 1)' })
    @ApiQuery({ name: 'limit', required: false, description: 'Items per page (default: 10)' })
    @ApiQuery({ name: 'level', required: false, description: 'Filter by level (error, warning, info, etc.)' })
    @ApiQuery({ name: 'type', required: false, description: 'Filter by type' })
    @ApiQuery({ name: 'search', required: false, description: 'Search in message' })
    @ApiQuery({ name: 'from', required: false, description: 'Start date (ISO string)' })
    @ApiQuery({ name: 'to', required: false, description: 'End date (ISO string)' })
    async getProjectIssues(
        @Param('projectId') projectId: string,
        @Query('page') page = 1,
        @Query('limit') limit = 10,
        @Query('level') level?: string,
        @Query('type') type?: number,
        @Query('search') search?: string,
        @Query('from') from?: string,
        @Query('to') to?: string,
    ) {
        const skip = (page - 1) * limit;
        const take = +limit;
        
        return this.issuesService.findAll({
            projectId,
            skip,
            take,
            filters: {
                level,
                type: type ? +type : undefined,
                search,
                from,
                to,
            }
        });
    }
}
