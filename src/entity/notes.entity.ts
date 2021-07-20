import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Note } from '@interfaces/notes.interface';
import { UserEntity } from '@entity/users.entity';

@Entity()
export class NoteEntity implements Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  note: string;

  @Column()
  @IsNotEmpty()
  noteLink: string;

  @ManyToOne(() => UserEntity, user => user.notes)
  createdBy: UserEntity;

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
