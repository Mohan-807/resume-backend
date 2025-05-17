import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resume } from './resume.entity';

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume)
    private resumeRepo: Repository<Resume>,
  ) {}

  create(data: Partial<Resume>) {
    return this.resumeRepo.save(data);
  }

  findAll() {
    return this.resumeRepo.find();
  }

  findOne(id: number) {
    return this.resumeRepo.findOneBy({ id });
  }

  update(id: number, data: Partial<Resume>) {
    return this.resumeRepo.update(id, data);
  }

  remove(id: number) {
    return this.resumeRepo.delete(id);
  }
}
