import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AppService {
  constructor(private readonly sequelize: Sequelize) {}

  async testDatabaseConnection(): Promise<string> {
    try {
      await this.sequelize.authenticate();
      console.log('✅ Database connection successful!');
      return 'Database connection is successful!';
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      return 'Database connection failed!';
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
