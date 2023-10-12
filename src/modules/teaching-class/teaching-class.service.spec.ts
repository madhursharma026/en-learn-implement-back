import { Test, TestingModule } from '@nestjs/testing';

import { TeachingClassService } from './teaching-class.service';

describe('TeachingClassService', () => {
  let service: TeachingClassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeachingClassService],
    }).compile();

    service = module.get<TeachingClassService>(TeachingClassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
