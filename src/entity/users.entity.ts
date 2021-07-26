import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from '@interfaces/users.interface';
import { NoteEntity } from '@entity/notes.entity';
import { SharedNoteEntity } from '@entity/shared.notes';

@Entity('user')
@Unique(['email'])
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => NoteEntity, notes => notes.createdBy)
  notes: NoteEntity[];

  @OneToMany(() => SharedNoteEntity, sharedNotes => sharedNotes.user)
  sharedNotes: SharedNoteEntity[];

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
