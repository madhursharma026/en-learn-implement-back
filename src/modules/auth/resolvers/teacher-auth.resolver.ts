import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  FirstStepLoginInput,
  FirstStepLoginResponse,
  LoginVerificationInput,
  LoginVerificationResponse,
} from '../dto/user-auth.dto';

import { TeacherAuthService } from '../services/teacher-auth.service';

@Resolver()
export class TeacherAuthResolver {
  constructor(private readonly teacherAuthService: TeacherAuthService) {}

  @Mutation(() => FirstStepLoginResponse)
  firstStepTeacherLogin(
    @Args('firstStepLoginInput')
    firstStepLoginInput: FirstStepLoginInput,
  ) {
    return this.teacherAuthService.firstStepTeacherLogin(firstStepLoginInput);
  }

  @Mutation(() => LoginVerificationResponse)
  teacherLoginVerification(
    @Args('loginVerificationInput')
    loginVerificationInput: LoginVerificationInput,
  ) {
    return this.teacherAuthService.loginVerification(loginVerificationInput);
  }
}
