import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Call } from './call.entity';

@Injectable()
export class CallService {
  private readonly logger = new Logger(CallService.name);

  constructor(@InjectModel(Call) private readonly callModel: typeof Call) {}

  async logCall(from: string, to: string): Promise<Call> {
    try {
      return await this.callModel.create({ from, to, status: 'incoming' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(
          `Error saving voicemail from ${from}: ${error.message}`,
          error.stack,
        );
      } else {
        this.logger.error(`Unknown error saving voicemail from ${from}`, error);
      }
      throw new InternalServerErrorException('Failed to save voicemail');
    }
  }
}
