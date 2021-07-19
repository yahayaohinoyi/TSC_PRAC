import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Note } from '@interfaces/notes.interface';

@Entity()
export class NoteEntity implements Note {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  @IsNotEmpty()
  note: string;

  @Column()
  @IsNotEmpty()
  noteLink: string;

  @Column({ type: Boolean, default: false })
  isSharable: boolean;

  @Column({ type: Boolean, default: false })
  isResharable: boolean;

  @Column({ type: Boolean, default: false })
  isEditable: boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
