import { Test, TestingModule } from '@nestjs/testing';
import { GenerateResumeController } from './generate-resume.controller';

describe('GenerateResumeController', () => {
  let controller: GenerateResumeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenerateResumeController],
    }).compile();

    controller = module.get<GenerateResumeController>(GenerateResumeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
