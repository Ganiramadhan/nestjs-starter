import { NestFactory } from '@nestjs/core';
import { ProductApiModule } from './product-api.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ProductApiModule);

  // 🌍 Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // ✅ Global Pipes (Validation, Sanitization, dll)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 📚 Swagger only in development
  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Product API')
      .setDescription('API for managing products')
      .setVersion('1.0')
      .addTag('Products')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }

  // 🚀 Start server
  const port = parseInt(process.env.PORT || '3001', 10);
  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`🚀 Server running on: http://localhost:${port}`);
  if (process.env.NODE_ENV === 'development') {
    logger.log(`📚 Swagger: http://localhost:${port}/api-docs`);
  }
}
bootstrap();
