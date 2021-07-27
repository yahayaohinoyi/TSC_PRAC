import { IsString, IsOptional } from 'class-validator';

export class ShareNoteDto {
  @IsString()
  public userId: string;

  @IsString()
  @IsOptional()
  public noteId?: string;

  @IsString()
  @IsOptional()
  public sharedWith?: string;
}
