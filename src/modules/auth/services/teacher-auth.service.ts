import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import {
  FirstStepLoginInput,
  FirstStepLoginResponse,
  LoginVerificationInput,
  LoginVerificationResponse,
} from '../dto/user-auth.dto';
import { TwoFactorService } from '../../otp/2factor.service';
import { JWTPayload, UserType } from '../dto/jwt-payload.dto';
import { Teacher } from '../../teachers/entities/teacher.entity';
import { TeachersService } from '../../teachers/teachers.service';

@Injectable()
export class TeacherAuthService {
  constructor(
    private readonly teacherService: TeachersService,
    private readonly otpService: TwoFactorService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async firstStepTeacherLogin({
    mobileNumber,
  }: FirstStepLoginInput): Promise<FirstStepLoginResponse> {
    const teacherExists = await this.teacherService.findOne({
      where: { mobileNumber },
    });

    if (!teacherExists) {
      await this.teacherService.createTeacher({ mobileNumber });
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
    const teacher = await this.teacherService.findOne({
      where: { mobileNumber },
    });
    if (!teacher)
      throw new NotFoundException(
        `teacher with mobileNumber: ${mobileNumber} not exist!`,
      );
    if (!teacher.verified) {
      this.teacherService.update({ id: teacher.id }, { verified: true });
    }
    return this.generateTokens(teacher);
  }

  async generateTokens(
    teacher: Teacher,
  ): Promise<{ jwtToken: string; refreshToken: string }> {
    const payload: JWTPayload = {
      mobileNumber: teacher.mobileNumber,
      id: teacher.id,
      type: UserType.TEACHER,
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
