import { Resolver, Mutation, Args } from '@nestjs/graphql';

import {
  RegisterResponse,
  FirstStepLoginResponse,
  LoginVerificationResponse,
  FirstStepLoginInput,
  LoginVerificationInput,
} from '../dto/user-auth.dto';
import { AuthService } from '../services/user-auth.service';

@Resolver(() => RegisterResponse)
export class UserAuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => FirstStepLoginResponse)
  firstStepUserLogin(
    @Args('firstStepUserLoginInput')
    firstStepUserLoginInput: FirstStepLoginInput,
  ) {
    return this.authService.firstStepUserLogin(firstStepUserLoginInput);
  }

  @Mutation(() => LoginVerificationResponse)
  userLoginVerification(
    @Args('loginVerificationInput')
    userLoginVerificationInput: LoginVerificationInput,
  ) {
    return this.authService.loginVerification(userLoginVerificationInput);
  }
}
