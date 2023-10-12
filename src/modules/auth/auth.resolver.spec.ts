import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './services/user-auth.service';
import { UserAuthResolver } from './resolvers/user-auth.resolver';

describe('UserAuthResolver', () => {
  let resolver: UserAuthResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAuthResolver, AuthService],
    }).compile();

    resolver = module.get<UserAuthResolver>(UserAuthResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
