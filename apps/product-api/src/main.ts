import { NestFactory } from '@nestjs/core';
import { ProductApiModule } from './product-api.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ProductApiModule);

  // 🔓 Enable CORS for frontend access
  app.enableCors({
    origin: 'http://localhost:3000', 
    credentials: true,
  });

  // 📚 Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Product API')
    .setDescription('API for managing products')
    .setVersion('1.0')
    .addTag('Products')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); 

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`📚 Swagger docs available at http://localhost:${port}/api-docs`);
}
bootstrap();
