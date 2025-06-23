import { NestFactory } from '@nestjs/core';
import { AuthApiModule } from './auth-api.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthApiModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Auth API')
      .setDescription('API for user authentication')
      .setVersion('1.0')
      .addTag('Auth')
      .addBearerAuth() 
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }

  const port = parseInt(process.env.PORT || '3001', 10);
  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`🚀 Auth API running at: http://localhost:${port}`);
  if (process.env.NODE_ENV === 'development') {
    logger.log(`📚 Swagger Docs: http://localhost:${port}/api-docs`);
  }
}
bootstrap();
