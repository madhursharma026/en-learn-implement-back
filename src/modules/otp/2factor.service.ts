import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import {
  Logger,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { OTP } from './otp.interface';

@Injectable()
export class TwoFactorService implements OTP {
  private readonly logger = new Logger(TwoFactorService.name);
  private readonly apiKey: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiKey = 'e22905d7-a75a-11ec-a4c2-0200cd936042';
  }
  async startSMSVerification(mobileNumber: string): Promise<string> {
    try {
      const res = await lastValueFrom<{
        data: { Status: string; Details: string };
      }>(
        this.httpService.get(
          `/V1/${this.apiKey}/SMS/${mobileNumber}/AUTOGEN3/OTP1`,
        ),
      );
      this.logger.debug(res.data);
      if (res.data.Status !== 'Success') {
        this.logger.debug('startSMSVerification: ', res.data);
        throw new InternalServerErrorException(res.data.Details);
      }
      return res.data.Details;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }
  async checkVerification(
    mobileNumber: string,
    otpCode: string,
  ): Promise<string> {
    try {
      const res = await lastValueFrom<{
        data: { Status: string; Details: string };
      }>(
        this.httpService.get(
          `/V1/${this.apiKey}/SMS/VERIFY3/${mobileNumber}/${otpCode}`,
        ),
      );
      if (res.data.Details !== 'OTP Matched') {
        this.logger.debug('checkVerification: ', res.data);
        throw new InternalServerErrorException(res.data.Details);
      }
      this.logger.debug('checkVerification response: ', res.data);
      return mobileNumber;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}
