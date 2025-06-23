import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { existsSync } from 'fs';

const envPath = resolve(
  process.cwd(),
  'apps',
  'auth-api',
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
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth-api.controller';
import { AuthService } from './auth-api.service';
import { User } from './entities/user.entity';
import { JwtStrategy } from './jwt.strategy';

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
        entities: [User],
        autoLoadEntities: true,
        synchronize: false,
        logging: true,
      }),
    }),

    TypeOrmModule.forFeature([User]),

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], 
})
export class AuthApiModule {}
