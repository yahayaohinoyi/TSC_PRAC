import { NextFunction, Request, Response } from 'express';
import { CreateNoteDto } from '@dtos/notes.dto';
import { Note } from '@interfaces/notes.interface';
import noteService from '@services/notes.service';

class NotesController {
  public noteService = new noteService();

  public getNotes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllNotesData: Note[] = await this.noteService.findAllNotes();

      res.status(200).json({ data: findAllNotesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getNoteById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const noteId = req.params.id;
      const findOneNoteData: Note = await this.noteService.findNoteById(noteId);

      res.status(200).json({ data: findOneNoteData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const noteData: CreateNoteDto = req.body;
      const createNoteData: Note = await this.noteService.createNote(noteData);

      res.status(201).json({ data: createNoteData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const noteId = req.params.id;
      const noteData: CreateNoteDto = req.body;
      const updateNoteData: Note = await this.noteService.updateNote(noteId, noteData);

      res.status(200).json({ data: updateNoteData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const noteId = Number(req.params.id);
      const deleteNoteData: Note = await this.noteService.deleteNote(noteId);

      res.status(200).json({ data: deleteNoteData, message: 'deleted' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default NotesController;
