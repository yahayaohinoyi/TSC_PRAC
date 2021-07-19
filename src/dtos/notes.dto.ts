import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  public noteLink: string;

  @IsString()
  public note: string;

  @IsString()
  public name: string;

  @IsBoolean()
  @IsOptional()
  public isSharable?: boolean;

  @IsBoolean()
  @IsOptional()
  public isResharable?: boolean;

  @IsBoolean()
  @IsOptional()
  public isEditable?: boolean;
}
