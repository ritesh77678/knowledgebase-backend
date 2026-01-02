import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Content } from '../content/content.entity';

@Entity()
export class ContentVersion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb' })
  snapShot: any;

  @Column({ nullable: true })
  message: string;

  @ManyToOne(() => Content, (content) => content.contentVersions, {onDelete: "CASCADE"})
  content: Content;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
