import { Module } from '@nestjs/common';
import { Resume } from './resume.entity';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Resume])],
  providers: [ResumeService],
  controllers: [ResumeController],
})
export class ResumeModule {}
