import { Test, TestingModule } from '@nestjs/testing';
import { DashboardApiController } from './dashboard-api.controller';
import { DashboardApiService } from './dashboard-api.service';

describe('DashboardApiController', () => {
  let dashboardApiController: DashboardApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DashboardApiController],
      providers: [DashboardApiService],
    }).compile();

    dashboardApiController = app.get<DashboardApiController>(DashboardApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(dashboardApiController.getHello()).toBe('Hello World!');
    });
  });
});
