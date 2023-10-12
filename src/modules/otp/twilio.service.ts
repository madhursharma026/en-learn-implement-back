import {
  Logger,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Twilio } from 'twilio';
import { ConfigService } from '@nestjs/config';
import { VerificationInstance } from 'twilio/lib/rest/verify/v2/service/verification';
import { VerificationCheckInstance } from 'twilio/lib/rest/verify/v2/service/verificationCheck';

import { OTP } from './otp.interface';

export enum TwilioChannels {
  SMS = 'sms',
}
@Injectable()
export class TwilioService implements OTP {
  private readonly logger = new Logger(TwilioService.name);
  private readonly accountSid: string;
  private readonly authToken: string;
  private readonly verificationServiceId: string;
  private readonly client: Twilio = null;
  constructor(private readonly configService: ConfigService) {
    this.accountSid = this.configService.getOrThrow('TWILIO_ACCOUNT_SID');
    this.authToken = this.configService.getOrThrow('TWILIO_AUTH_TOKEN');
    this.verificationServiceId = this.configService.getOrThrow(
      'TWILIO_VERIFICATION_SID',
    );
    this.client = new Twilio(this.accountSid, this.authToken);
  }

  async startSMSVerification(mobileNumber: string): Promise<string> {
    try {
      const verificationInstance: VerificationInstance =
        await this.client.verify.v2
          .services(this.verificationServiceId)
          .verifications.create({
            to: mobileNumber,
            channel: TwilioChannels.SMS,
          });
      this.logger.log(verificationInstance.sid);

      return verificationInstance.sid;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(`Error starting sms verification`);
    }
  }

  async checkVerification(mobileNumber: string, code: string): Promise<string> {
    try {
      const VerificationCheckInstance: VerificationCheckInstance =
        await this.client.verify.v2
          .services(this.verificationServiceId)
          .verificationChecks.create({
            code,
            to: mobileNumber,
          });
      this.logger.log(VerificationCheckInstance.status);

      return VerificationCheckInstance.status;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(`Error starting sms verification`);
    }
  }
}
