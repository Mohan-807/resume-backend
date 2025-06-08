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

    const renderTickItem = (text?: string) =>
      text ? `<li class="l-list-style"><span class="l-list-sub">✔</span> ${text}</li>` : '';

    const renderBulletItem = (text?: string) =>
      text
        ? `<li style="position: relative; padding-left: 16px; margin-bottom: 6px; text-align: justify;">
         <span style="position: absolute; left: 0; font-weight: normal;">•</span>
         ${text}
       </li>`
        : '';

    // Skills (if needed similarly)
    const skillList = [
      renderTickItem(dto.skillOne),
      renderTickItem(dto.skillTwo),
      renderTickItem(dto.skillThree),
      renderTickItem(dto.skillFour),
      renderTickItem(dto.skillFive),
    ].join('');

    // Languages
    const languageList = [
      renderTickItem(dto.languageOne),
      renderTickItem(dto.languageTwo),
      renderTickItem(dto.languageThree),
      renderTickItem(dto.languageFour),
      renderTickItem(dto.languageFive),
    ].join('');

    // Company Descriptions
    const firstCompanyDescriptionList = [
      renderBulletItem(dto.firstCompanyDescriptionOne),
      renderBulletItem(dto.firstCompanyDescriptionTwo),
    ].join('');

    const secondCompanyDescriptionList = [
      renderBulletItem(dto.secondCompanyDescriptionOne),
      renderBulletItem(dto.secondCompanyDescriptionTwo),
    ].join('');


    html = html
      .replace(/\$\{jobTitle}/g, dto.jobTitle || '')
      .replace(/\$\{email}/g, dto.email || '')
      .replace(/\$\{templateImageTag}/g, templateImg)
      .replace(/\$\{coverImageTag}/g, coverImg)
      .replace(/\$\{phone}/g, dto.phone || '')
      .replace(/\$\{location}/g, dto.location || '')
      .replace(/\$\{profileSummary}/g, dto.profileSummary || '')
      .replace(/\$\{skillList}/g, skillList)
      .replace(/\$\{languageList}/g, languageList)
      .replace(/\$\{firstCompanyDescriptionList}/g, firstCompanyDescriptionList)
      .replace(/\$\{secondCompanyDescriptionList}/g, secondCompanyDescriptionList)
      .replace(/\$\{lastName}/g, dto.lastName || '')
      .replace(/\$\{firstName}/g, dto.firstName || '')
      .replace(/\$\{firstCompanyName}/g, dto.firstCompanyName || '')
      .replace(/\$\{firstCompanyRole}/g, dto.firstCompanyName || '')
      .replace(/\$\{firstCompanyLocation}/g, dto.firstCompanyLocation || '')
      .replace(/\$\{secondCompanyName}/g, dto.secondCompanyName || '')
      .replace(/\$\{secondCompanyRole}/g, dto.secondCompanyRole || '')
      .replace(/\$\{secondCompanyLocation}/g, dto.secondCompanyLocation || '')
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
