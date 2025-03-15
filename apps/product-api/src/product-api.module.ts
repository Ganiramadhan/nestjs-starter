import { Module } from '@nestjs/common';
import { ProductApiController } from './product-api.controller';
import { ProductApiService } from './product-api.service';

@Module({
  imports: [],
  controllers: [ProductApiController],
  providers: [ProductApiService],
})
export class ProductApiModule {}
