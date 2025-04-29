import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { IssuesService } from './issues.service';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';

@ApiTags('issues')
@Controller('issues')
export class IssuesController {
    constructor(private readonly issuesService: IssuesService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get all issues for a project' })
    @ApiBearerAuth()
    @ApiQuery({ name: 'projectId', required: false, description: 'The ID of the project' })
    @ApiQuery({ name: 'page', required: false, description: 'Page number (default: 1)' })
    @ApiQuery({ name: 'limit', required: false, description: 'Items per page (default: 10)' })
    @ApiQuery({ name: 'level', required: false, description: 'Filter by level (error, warning, info, etc.)' })
    @ApiQuery({ name: 'type', required: false, description: 'Filter by type' })
    @ApiQuery({ name: 'search', required: false, description: 'Search in message' })
    @ApiQuery({ name: 'from', required: false, description: 'Start date (ISO string)' })
    @ApiQuery({ name: 'to', required: false, description: 'End date (ISO string)' })
    async getProjectIssues(
        @Query('projectId') projectId: string,
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
            skip,
            take,
            filters: {
                projectId,
                level,
                type: type ? +type : undefined,
                search,
                from,
                to,
            }
        });
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get an issue by ID' })
    @ApiBearerAuth()
    async getIssueById(@Param('id') id: string) {
        return this.issuesService.findById(id);
    }
}
