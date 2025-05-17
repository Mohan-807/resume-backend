import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { Resume } from './resume.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'templateImage', maxCount: 1 },
        { name: 'coverImage', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
            cb(null, uniqueName);
          },
        }),
      },
    ),
  )
  async create(
    @UploadedFiles()
    files: {
      templateImage?: Express.Multer.File[];
      coverImage?: Express.Multer.File[];
    },
    @Body() body: any,
  ) {
    const jobTitle = body.jobTitle;
    const email = body.email;

    const profileImageUrl = files.coverImage?.[0]?.filename ?? null;
    const backgroundImageUrl = files.templateImage?.[0]?.filename ?? null;

    return this.resumeService.create({
      jobTitle,
      email,
      profileImageUrl,
      backgroundImageUrl,
    });
  }

  @Get()
  findAll() {
    return this.resumeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resumeService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() resume: Partial<Resume>) {
    return this.resumeService.update(+id, resume);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resumeService.remove(+id);
  }
}
