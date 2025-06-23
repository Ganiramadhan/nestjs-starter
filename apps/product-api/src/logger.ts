import { Logger } from '@nestjs/common';
import { Logger as TypeOrmLogger, QueryRunner } from 'typeorm';

export class TypeOrmCustomLogger implements TypeOrmLogger {
  private readonly logger = new Logger('TypeORM');

  logQuery(query: string, parameters?: any[], _queryRunner?: QueryRunner) {
    this.logger.log(`🟢 QUERY: ${query}`);
    if (parameters?.length) {
      this.logger.debug(`🔸 PARAMS: ${JSON.stringify(parameters)}`);
    }
  }

  logQueryError(error: string, query: string, parameters?: any[], _queryRunner?: QueryRunner) {
    this.logger.error(`❌ QUERY ERROR: ${error}`);
    this.logger.error(`⛔ QUERY: ${query}`);
    if (parameters?.length) {
      this.logger.error(`🔸 PARAMS: ${JSON.stringify(parameters)}`);
    }
  }

  logQuerySlow(time: number, query: string, parameters?: any[], _queryRunner?: QueryRunner) {
    this.logger.warn(`⚠️ SLOW QUERY (${time} ms): ${query}`);
    if (parameters?.length) {
      this.logger.warn(`🔸 PARAMS: ${JSON.stringify(parameters)}`);
    }
  }

  logMigration(message: string, _queryRunner?: QueryRunner) {
    this.logger.log(`📦 MIGRATION: ${message}`);
  }

  logSchemaBuild(message: string, _queryRunner?: QueryRunner) {
    this.logger.log(`🛠 SCHEMA BUILD: ${message}`);
  }

  log(level: 'log' | 'info' | 'warn', message: any, _queryRunner?: QueryRunner) {
    switch (level) {
      case 'log':
        this.logger.log(message);
        break;
      case 'info':
        this.logger.debug(message);
        break;
      case 'warn':
        this.logger.warn(message);
        break;
    }
  }
}
