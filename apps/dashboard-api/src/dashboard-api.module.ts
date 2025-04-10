import { Module } from '@nestjs/common';
import { DashboardApiController } from './dashboard-api.controller';
import { DashboardApiService } from './dashboard-api.service';

@Module({
  imports: [],
  controllers: [DashboardApiController],
  providers: [DashboardApiService],
})
export class DashboardApiModule {}
