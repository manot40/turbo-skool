import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import User from './User';

@Entity({ name: 'passwords' })
export default class Password extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @OneToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_email', referencedColumnName: 'email' })
  user!: User;

  @Column('char', { length: 50 })
  password!: string;

  @Column('char', { length: 20 })
  salt!: string;

  @Column('char', { nullable: true, length: 50 })
  resetToken!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
