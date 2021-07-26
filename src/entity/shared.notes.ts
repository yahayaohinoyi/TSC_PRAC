import { ShareNote } from '@interfaces/share.notes';
// import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '@entity/users.entity';
import { NoteEntity } from '@entity/notes.entity';

@Entity()
export class SharedNoteEntity implements ShareNote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.sharedNotes)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => NoteEntity, note => note.users)
  @JoinColumn({ name: 'note_id' })
  note: NoteEntity;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
