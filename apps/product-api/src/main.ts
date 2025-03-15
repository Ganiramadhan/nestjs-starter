import { NestFactory } from '@nestjs/core';
import { ProductApiModule } from './product-api.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductApiModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
