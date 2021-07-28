import { ShareNoteDto } from './../dtos/share.note.dto';
import { Router } from 'express';
import NotesController from '@controllers/notes.controller';
import { CreateNoteDto } from '@dtos/notes.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class NotesRoute implements Routes {
  public path = '/notes';
  public router = Router();
  public notesController = new NotesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.notesController.getNotes);
    this.router.get(`${this.path}/:id(\\d+)`, this.notesController.getNoteById);
    this.router.get(`${this.path}/notesSharedWithMe`, validationMiddleware(ShareNoteDto, 'body'), this.notesController.getNotesSharedWithMe);
    this.router.get(`${this.path}/notesShared`, validationMiddleware(ShareNoteDto, 'body'), this.notesController.getNotesShared);
    this.router.post(`${this.path}`, validationMiddleware(CreateNoteDto, 'body'), this.notesController.createNote);
    this.router.post(`${this.path}/shareNote`, validationMiddleware(ShareNoteDto, 'body'), this.notesController.shareNote);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateNoteDto, 'body', true), this.notesController.updateNote);
    this.router.delete(`${this.path}/:id(\\d+)`, this.notesController.deleteNote);
  }
}

export default NotesRoute;
