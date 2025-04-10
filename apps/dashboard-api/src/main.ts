import { NestFactory } from '@nestjs/core';
import { DashboardApiModule } from './dashboard-api.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(DashboardApiModule);

  // 🔓 Enable CORS for frontend access
  app.enableCors({
    origin: 'http://localhost:3000', 
    credentials: true,
  });

  // 📚 Swagger configuration for seafood habit monitoring
  const config = new DocumentBuilder()
    .setTitle('Seafood Habit Monitoring API')
    .setDescription('API for tracking seafood consumption habits and related data')
    .setVersion('1.0')
    .addTag('Dashboard')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); 

  const port = process.env.PORT || 3002;
  await app.listen(port);

  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`📚 Swagger docs available at http://localhost:${port}/api-docs`);
}
bootstrap();
