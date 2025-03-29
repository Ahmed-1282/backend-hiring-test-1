import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config/database.config'; // Ensure correct path
import { CallModule } from './Calls/call.module';
import { VoicemailModule } from './Voicemails/voicemail.module';

const env = process.env.NODE_ENV || 'development'; // Ensure it has a value

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load environment variables globally
    SequelizeModule.forRoot({
      ...databaseConfig[env], // Use the fallback value
      autoLoadModels: true,
      synchronize: false, // Always false in production
    }),
    CallModule,
    VoicemailModule,
  ],
})
export class AppModule {}
