import { UserEntity } from '@entity/users.entity';
import { NoteEntity } from '@entity/notes.entity';

export interface ShareNote {
  user: UserEntity;
  note: NoteEntity;
}
