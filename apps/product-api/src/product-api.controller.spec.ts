import { Test, TestingModule } from '@nestjs/testing';
import { ProductApiController } from './product-api.controller';
import { ProductApiService } from './product-api.service';

describe('ProductApiController', () => {
  let productApiController: ProductApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductApiController],
      providers: [ProductApiService],
    }).compile();

    productApiController = app.get<ProductApiController>(ProductApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(productApiController.getHello()).toBe('Hello World!');
    });
  });
});
