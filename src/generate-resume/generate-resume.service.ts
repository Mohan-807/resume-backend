import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenerateResumeDto } from './create-generate-resume.dto';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class GenerateResumeService {
  private templateDir = (() => {
    const dev = join(process.cwd(), 'src', 'templates');
    const prod = join(process.cwd(), 'dist', 'src', 'templates');
    return existsSync(prod) ? prod : dev;
  })();

  generate(dto: CreateGenerateResumeDto): string {
    const path = join(this.templateDir, `${dto.templateId}.html`);
    if (!existsSync(path)) throw new NotFoundException('Template not found');
    let html = readFileSync(path, 'utf8');

    const templateImg = dto.backgroundImageUrl
      ? `<img src="${dto.backgroundImageUrl}" class="background-image" />`
      : '';
    const coverImg = dto.profileImageUrl
      ? `<img src="${dto.profileImageUrl}" style="width:100%;height:100%;object-fit:cover;" />`
      : '';

    html = html
      .replace(/\$\{jobTitle}/g, dto.jobTitle || '')
      .replace(/\$\{email}/g, dto.email || '')
      .replace(/\$\{templateImageTag}/g, templateImg)
      .replace(/\$\{coverImageTag}/g, coverImg)
      .replace(/\$\{phone}/g, dto.phone || '')
      .replace(/\$\{location}/g, dto.location || '')
      .replace(/\$\{profileSummary}/g, dto.profileSummary || '')
        .replace(/\$\{skillOne}/g, dto.skillOne || '')
        .replace(/\$\{skillTwo}/g, dto.skillTwo || '')
        .replace(/\$\{skillThree}/g, dto.skillThree || '')
      .replace(/\$\{skillFour}/g, dto.skillFour || '')
      .replace(/\$\{skillFive}/g, dto.skillFive || '')
      .replace(/\$\{languageOne}/g, dto.languageTwo || '')
      .replace(/\$\{languageTwo}/g, dto.languageTwo || '')
      .replace(/\$\{languageThree}/g, dto.languageThree || '')
      .replace(/\$\{languageFour}/g, dto.languageFour || '')
      .replace(/\$\{languageFive}/g, dto.languageFive || '')
      .replace(/\$\{lastName}/g, dto.lastName || '')
      .replace(/\$\{firstName}/g, dto.firstName || '')
      .replace(/\$\{firstCompanyName}/g, dto.firstCompanyName || '')
      .replace(/\$\{firstCompanyRole}/g, dto.firstCompanyName || '')
      .replace(/\$\{firstCompanyLocation}/g, dto.firstCompanyLocation || '')
      .replace(/\$\{firstCompanyDescriptionOne}/g, dto.firstCompanyDescriptionOne || '')
      .replace(/\$\{firstCompanyDescriptionTwo}/g, dto.firstCompanyDescriptionTwo || '')
      .replace(/\$\{secondCompanyName}/g, dto.secondCompanyName || '')
      .replace(/\$\{secondCompanyRole}/g, dto.secondCompanyRole || '')
      .replace(/\$\{secondCompanyLocation}/g, dto.secondCompanyLocation || '')
      .replace(/\$\{secondCompanyDescriptionOne}/g, dto.secondCompanyDescriptionOne || '')
      .replace(/\$\{secondCompanyDescriptionTwo}/g, dto.secondCompanyDescriptionTwo || '')
      .replace(/\$\{firstFieldOfStudy}/g, dto.firstFieldOfStudy || '')
      .replace(/\$\{firstFieldOfStudyGrade}/g, dto.firstFieldOfStudyGrade || '')
      .replace(/\$\{firstFieldOfStudyLocation}/g, dto.firstFieldOfStudyLocation || '')
      .replace(/\$\{secondFieldOfStudy}/g, dto.secondFieldOfStudy || '')
      .replace(/\$\{secondFieldOfStudyGrade}/g, dto.secondFieldOfStudyGrade || '')
      .replace(/\$\{secondFieldOfStudyLocation}/g, dto.secondFieldOfStudyLocation || '')
      .replace(/\$\{thirdFieldOfStudy}/g, dto.thirdFieldOfStudy || '')
      .replace(/\$\{thirdFieldOfStudyGrade}/g, dto.thirdFieldOfStudyGrade || '')
      .replace(/\$\{thirdFieldOfStudyLocation}/g, dto.thirdFieldOfStudyLocation || '');

    return html;
  }
}
