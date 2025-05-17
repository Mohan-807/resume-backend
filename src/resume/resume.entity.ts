import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  jobTitle: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  profileImageUrl: string;

  @Column({ nullable: true })
  backgroundImageUrl: string;
}
