import { Controller, Get } from '@nestjs/common';
import { DashboardApiService } from './dashboard-api.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardApiController {
  constructor(private readonly dashboardApiService: DashboardApiService) {}

  @Get('status')
  getStatus(): string {
    return this.dashboardApiService.getStatus();
  }

  @Get('seafood-stats')
  getSeafoodStats(): any {
    return this.dashboardApiService.getSeafoodStats();
  }

  @Get('daily-consumption')
  getDailyConsumption(): any {
    return this.dashboardApiService.getDailyConsumption();
  }

  @Get('monthly-summary')
  getMonthlySummary(): any {
    return this.dashboardApiService.getMonthlySummary();
  }
}
