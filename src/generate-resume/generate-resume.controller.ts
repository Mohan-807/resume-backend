import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
  Res,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';          // ← import from "multer"
import { Response } from 'express';
import { GenerateResumeService } from './generate-resume.service';
import { CreateGenerateResumeDto } from './create-generate-resume.dto';

/** turn a Multer file buffer into a data-URL */
const toDataURL = (file?: Express.Multer.File): string | undefined => {
  if (!file) return undefined;
  const base64 = file.buffer.toString('base64');
  return `data:${file.mimetype};base64,${base64}`;
};

@Controller('generate-resume')
export class GenerateResumeController {
  constructor(private readonly genService: GenerateResumeService) { }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'templateImage', maxCount: 1 },
        { name: 'coverImage', maxCount: 1 },
      ],
      { storage: memoryStorage() },          // ← RAM only, nothing on disk
    ),
  )
  async generate(
    @UploadedFiles()
    files: {
      templateImage?: Express.Multer.File[];
      coverImage?: Express.Multer.File[];
    },
    @Body() body: any,
    @Res() res: Response,
  ) {
    const dto: CreateGenerateResumeDto = {
      templateId: Number(body.templateId),
      jobTitle: body.jobTitle,
      email: body.email,
      phone: body.phone,
      location: body.location,
      profileSummary: body.profileSummary,
      skillOne: body.skillOne,
      skillThree: body.skillThree,
      skillTwo: body.skillTwo,
      skillFour: body.skillFour,
      languageOne: body.languageOne,
      languageTwo: body.languageTwo,
      languageFour: body.languageFour,
      skillFive: body.skillFive,
      languageThree: body.languageThree,
      lastName: body.lastName,
      languageFive: body.languageFive,
      firstCompanyName: body.firstCompanyName,
      firstName: body.firstName,
      firstCompanyLocation: body.firstCompanyLocation,
      firstCompanyDescriptionOne: body.firstCompanyDescriptionOne,
      firstCompanyDescriptionTwo: body.firstCompanyDescriptionTwo,
      secondCompanyName: body.secondCompanyName,
      secondCompanyRole: body.secondCompanyRole,
      secondCompanyLocation: body.secondCompanyLocation,
      secondCompanyDescriptionOne: body.secondCompanyDescriptionOne,
      firstFieldOfStudy: body.firstFieldOfStudy,
      secondCompanyDescriptionTwo: body.secondCompanyDescriptionTwo,
      firstFieldOfStudyGrade: body.firstFieldOfStudyGrade,
      secondFieldOfStudyGrade: body.secondFieldOfStudyGrade,
      secondFieldOfStudy: body.secondFieldOfStudy,
      firstFieldOfStudyLocation: body.firstFieldOfStudyLocation,
      thirdFieldOfStudy: body.thirdFieldOfStudy,
      secondFieldOfStudyLocation: body.secondFieldOfStudyLocation,
      thirdFieldOfStudyLocation: body.thirdFieldOfStudyLocation,
      thirdFieldOfStudyGrade: body.thirdFieldOfStudyGrade,
      backgroundImageUrl: toDataURL(files.templateImage?.[0]),
      profileImageUrl: toDataURL(files.coverImage?.[0]),
    };

    const html = this.genService.generate(dto);
    res.type('text/html').send(html);        // ← return raw HTML
  }
}
