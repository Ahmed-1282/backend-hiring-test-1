import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Voicemail } from './voicemail.entity';

@Injectable()
export class VoicemailService {
  private readonly logger = new Logger(VoicemailService.name);

  constructor(
    @InjectModel(Voicemail) private voicemailModel: typeof Voicemail,
  ) {}

  async saveVoicemail(from: string, recording: string): Promise<Voicemail> {
    try {
      const voicemail = await this.voicemailModel.create({
        from,
        recording,
      });
      return voicemail;
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
