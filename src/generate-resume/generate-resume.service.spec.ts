import { Test, TestingModule } from '@nestjs/testing';
import { GenerateResumeService } from './generate-resume.service';

describe('GenerateResumeService', () => {
  let service: GenerateResumeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenerateResumeService],
    }).compile();

    service = module.get<GenerateResumeService>(GenerateResumeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
