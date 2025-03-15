import { Controller, Get } from '@nestjs/common';
import { ProductApiService } from './product-api.service';

@Controller()
export class ProductApiController {
  constructor(private readonly productApiService: ProductApiService) {}

  @Get()
  getHello(): string {
    return this.productApiService.getHello();
  }
}
