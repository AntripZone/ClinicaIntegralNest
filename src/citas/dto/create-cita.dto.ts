import { Type } from 'class-transformer';
import {
  IsInt,
  IsPositive,
  IsDateString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCitaDto {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  pacienteId: number;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  medicoId: number;

  @ApiProperty({ example: 'YYY-MM-DD' })
  @IsDateString({}, { message: 'La fecha y hora debe ser una fecha válida' })
  fechaHora: string;

  @ApiProperty({ example: 'Dolor de estomago' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  motivo?: string;

  @ApiProperty({ example: 'Se recetó penisilina' })
  @IsOptional()
  @IsString()
  notas?: string;
}
