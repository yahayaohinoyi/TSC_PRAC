import { ShareNote } from '@interfaces/share.notes';
import { SharedNoteEntity } from '@entity/shared.notes.entity';
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

  public async findAllNotes(): Promise<NoteEntity[]> {
    // const createNoteData = getRepository(this.notes);
    // const notes: Note[] = await createNoteData.find();
    const conn = getConnection();
    const notes = await conn.getRepository(NoteEntity).createQueryBuilder('notes').leftJoinAndSelect('notes.createdBy', 'user').getMany();
    return notes;
  }

  public async findAllNotesSharedWithMe(userId: number): Promise<SharedNoteEntity[]> {
    const conn = getConnection();
    const notes = await conn
      .getRepository(SharedNoteEntity)
      .createQueryBuilder('sharedNotes')
      .leftJoinAndSelect('sharedNotes.note', 'note')
      .leftJoin('sharedNotes.sharedWith', 'sharedWith')
      .where('sharedWith.id = :id', { id: userId })
      .getMany();
    return notes;
  }

  public async findAllNotesShared(userId: number): Promise<SharedNoteEntity[]> {
    const conn = getConnection();
    const notes = await conn
      .getRepository(SharedNoteEntity)
      .createQueryBuilder('sharedNotes')
      .leftJoinAndSelect('sharedNotes.note', 'note')
      .leftJoin('note.createdBy', 'user')
      .where('user.id = :id', { id: userId })
      .getMany();
    return notes;
  }

  // public async findAllNotesSharedWithMe(): Promise<NoteEntity[]> {
  //   const conn = getConnection();
  //   const notesSharedWithMe = await conn.getRepository(NoteEntity).createQueryBuilder('notes').leftJoinAndSelect()
  // }

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
    if (!findOne) throw new HttpException(409, `User ${1} doesn't already exists`);

    const createNoteData: Note = await noteRepository.save({ ...noteData, createdBy: findOne });

    return createNoteData;
  }

  public async updateNote(noteId: string, noteData: CreateNoteDto): Promise<Note> {
    if (isEmpty(noteData)) throw new HttpException(400, 'Bad Request');
    const noteRepository = getRepository(this.notes);

    const findNote: Note = await noteRepository.findOne({ where: { id: noteId } });
    if (!findNote) throw new HttpException(409, "can't find note");

    await noteRepository.update(noteId, { ...noteData });

    const updateNote: Note = await noteRepository.findOne({ where: { id: noteId } });
    return updateNote;
  }

  public async shareNote(userId: number, noteId: number, shareWith: number): Promise<SharedNoteEntity> {
    const noteRepository = getRepository(this.notes);

    const findNote: NoteEntity = await noteRepository
      .createQueryBuilder('note')
      .leftJoinAndSelect('note.createdBy', 'user')
      .where('note.id = :id', { id: noteId })
      .getOne();

    if (!findNote) throw new HttpException(409, "can't find note");

    if (!findNote.isSharable) {
      throw new HttpException(409, 'This note is not sharable');
    }

    if (findNote.createdBy.id !== userId) {
      if (!findNote.isResharable) {
        throw new HttpException(409, "You can't share a note you don't own");
      }
    }

    const user: UserEntity = await getRepository(this.users).findOne(userId);

    const sharedWith: UserEntity = await getRepository(this.users).findOne(shareWith);

    let sharedNote = new SharedNoteEntity();
    sharedNote.user = user;
    sharedNote.note = findNote;
    sharedNote.sharedWith = sharedWith;

    sharedNote = await getRepository(SharedNoteEntity).save(sharedNote);
    return sharedNote;
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
