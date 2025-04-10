import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardApiService {
  getStatus(): string {
    return 'Dashboard is running smoothly';
  }

  getSeafoodStats(): any {
    return {
      totalConsumption: 1500,
      mostPopularItem: 'Shrimp',
      topRegion: 'North Coast',
    };
  }

  getDailyConsumption(): any {
    return {
      date: new Date().toISOString(),
      consumption: 45,
    };
  }

  getMonthlySummary(): any {
    return {
      month: new Date().toLocaleString('default', { month: 'long' }),
      totalConsumption: 1200,
      averageDailyConsumption: 40,
    };
  }
}
