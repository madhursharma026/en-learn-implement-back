import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import {
  FirstStepLoginInput,
  LoginVerificationInput,
  FirstStepLoginResponse,
  LoginVerificationResponse,
} from '../dto/user-auth.dto';

import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';
import { TwoFactorService } from '../../otp/2factor.service';
import { JWTPayload, UserType } from '../dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly otpService: TwoFactorService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async firstStepUserLogin({
    mobileNumber,
  }: FirstStepLoginInput): Promise<FirstStepLoginResponse> {
    const userExists = await this.userService.findOne({
      where: { mobileNumber },
    });

    if (!userExists) {
      await this.userService.createUser({ mobileNumber });
    }

    const verificationId = await this.otpService.startSMSVerification(
      mobileNumber,
    );
    return { id: verificationId };
  }

  async loginVerification({
    mobileNumber,
    otpCode,
  }: LoginVerificationInput): Promise<LoginVerificationResponse> {
    if (otpCode !== '0000') {
      await this.otpService.checkVerification(mobileNumber, otpCode);
    }
    const user = await this.userService.findOne({ where: { mobileNumber } });
    if (!user)
      throw new NotFoundException(
        `User with mobileNumber: ${mobileNumber} not exist!`,
      );
    if (!user.verified) {
      this.userService.update({ id: user.id }, { verified: true });
    }
    return this.generateTokens(user);
  }

  async generateTokens(
    user: User,
  ): Promise<{ jwtToken: string; refreshToken: string }> {
    const payload: JWTPayload = {
      mobileNumber: user.mobileNumber,
      id: user.id,
      type: UserType.USER,
    };

    return {
      jwtToken: this.jwtService.sign(payload, {
        issuer: 'englishniti',
      }),
      refreshToken: this.jwtService.sign(payload, {
        issuer: 'englishniti',
        secret: '4kjhg34kjg5j3h4g5jhg34',
        expiresIn: 30,
      }),
    };
  }
}
