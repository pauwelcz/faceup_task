import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('attachments')
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'record_id',
  })
  recordId: number;

  @Column()
  filename: string;

  @Column()
  extension: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
