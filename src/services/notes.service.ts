import { getRepository, getConnection } from 'typeorm';
import { CreateNoteDto } from '@dtos/notes.dto';
import { NoteEntity } from '@entity/notes.entity';
import { UserEntity } from '@entity/users.entity';
import { User } from '@interfaces/users.interface';
import { HttpException } from '@exceptions/HttpException';
import { Note } from '@interfaces/notes.interface';
import { isEmpty } from '@utils/util';

class UserService {
  public notes = NoteEntity;
  public users = UserEntity;

  public async findAllNotes(): Promise<Note[]> {
    // const createNoteData = getRepository(this.notes);
    // const notes: Note[] = await createNoteData.find();
    const conn = getConnection();
    const notes = await conn.getRepository(NoteEntity).createQueryBuilder('notes').leftJoinAndSelect('notes.createdBy', 'user').getMany();
    return notes;
  }

  public async findNoteById(noteId: string): Promise<Note> {
    if (isEmpty(noteId)) throw new HttpException(400, 'Enter an Id');
    const noteRepository = getRepository(this.notes);
    const findNote: Note = await noteRepository.findOne({ where: { id: noteId } });
    if (!findNote) throw new HttpException(409, "You're not user");

    return findNote;
  }

  public async createNote(noteData: CreateNoteDto): Promise<Note> {
    if (isEmpty(noteData)) throw new HttpException(400, 'Enter a valid note data');

    const noteRepository = getRepository(this.notes);
    const userRepository = getRepository(this.users);
    const findNote: Note = await noteRepository.findOne({ where: { noteLink: noteData.noteLink } });
    const findOne: User = await userRepository.findOne({ where: { id: 1 } });
    if (findNote) throw new HttpException(409, `NoteLink ${noteData.noteLink} already exists`);
    if (!findOne) throw new HttpException(409, `User ${1} doesnt already exists`);

    const createNoteData: Note = await noteRepository.save({ ...noteData, createdBy: findOne });

    return createNoteData;
  }

  public async updateNote(noteId: string, noteData: CreateNoteDto): Promise<Note> {
    if (isEmpty(noteData)) throw new HttpException(400, 'Bad Request');

    const noteRepository = getRepository(this.notes);
    const findNote: Note = await noteRepository.findOne({ where: { id: noteId } });
    if (!findNote) throw new HttpException(409, "You're Request user");

    await noteRepository.update(noteId, { ...noteData });

    const updateNote: Note = await noteRepository.findOne({ where: { id: noteId } });
    return updateNote;
  }

  public async deleteNote(noteId: number): Promise<Note> {
    if (isEmpty(noteId)) throw new HttpException(400, 'No noteId');

    const noteRepository = getRepository(this.notes);
    const findNote: Note = await noteRepository.findOne({ where: { id: noteId } });
    if (!findNote) throw new HttpException(409, "Can't find note");

    await noteRepository.delete({ id: noteId });
    return findNote;
  }
}

export default UserService;
