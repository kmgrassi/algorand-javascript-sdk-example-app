import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class Base {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ select: true })
  created?: Date;

  @UpdateDateColumn({ select: true })
  updated?: Date;
}
