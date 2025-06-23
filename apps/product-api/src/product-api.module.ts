import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { existsSync } from 'fs';

const envPath = resolve(
  process.cwd(),
  'apps',
  'product-api',
  'src',
  'common',
  'envs',
  `${process.env.NODE_ENV || 'development'}.env`
);

if (existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log(`✅ ENV Loaded from: ${envPath}`);
} else {
  console.error(`❌ ENV file not found at: ${envPath}`);
}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductApiController } from './product-api.controller';
import { ProductApiService } from './product-api.service';
import { Product } from './entities/product.entity';
import { TypeOrmCustomLogger } from './logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envPath,
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432', 10),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        entities: [Product],
        autoLoadEntities: true,
        synchronize: false,
        logging: true, 
        logger: new TypeOrmCustomLogger(), 
      }),
    }),

    // ✅ Register entitas Product
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductApiController],
  providers: [ProductApiService],
})
export class ProductApiModule {}
