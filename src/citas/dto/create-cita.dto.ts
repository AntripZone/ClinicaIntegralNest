import { Type } from 'class-transformer';
import {
  IsInt,
  IsPositive,
  IsDateString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCitaDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  pacienteId: number;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  medicoId: number;

  @IsDateString({}, { message: 'La fecha y hora debe ser una fecha válida' })
  fechaHora: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  motivo?: string;

  @IsOptional()
  @IsString()
  notas?: string;
}
