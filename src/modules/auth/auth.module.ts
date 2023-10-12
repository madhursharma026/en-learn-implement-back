import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { OtpModule } from '../otp/otp.module';
import { UsersModule } from '../users/users.module';
import { AuthService } from './services/user-auth.service';
import { TeachersModule } from '../teachers/teachers.module';
import { UserAuthResolver } from './resolvers/user-auth.resolver';
import { TeacherAuthService } from './services/teacher-auth.service';
import { TeacherAuthResolver } from './resolvers/teacher-auth.resolver';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: 'secret_KEsdfsdfjkshdfkja2kjh34kj2h3',
        signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    OtpModule,
    TeachersModule,
  ],
  providers: [
    UserAuthResolver,
    AuthService,
    TeacherAuthService,
    TeacherAuthResolver,
  ],
})
export class AuthModule {}
