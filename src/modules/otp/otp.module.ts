import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ConfigService } from '@nestjs/config';
import { TwoFactorService } from './2factor.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        baseURL: 'https://2factor.in/API',
        maxRedirects: 5,
        timeout: 10000,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [TwoFactorService],
  exports: [TwoFactorService],
})
export class OtpModule {}
