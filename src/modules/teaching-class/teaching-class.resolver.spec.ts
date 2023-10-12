import { Test, TestingModule } from '@nestjs/testing';

import { TeachingClassResolver } from './teaching-class.resolver';
import { TeachingClassService } from './teaching-class.service';

describe('TeachingClassResolver', () => {
  let resolver: TeachingClassResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeachingClassResolver, TeachingClassService],
    }).compile();

    resolver = module.get<TeachingClassResolver>(TeachingClassResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
