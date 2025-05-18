import { Module } from '@nestjs/common';
import { GenerateResumeService } from './generate-resume.service';
import { GenerateResumeController } from './generate-resume.controller';

@Module({
  providers: [GenerateResumeService],
  controllers: [GenerateResumeController]
})
export class GenerateResumeModule {}
