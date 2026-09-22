import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const trim = () =>
  Transform(({ value }) => (typeof value === 'string' ? value.trim() : value));

export class CreatePacienteDto {
  @ApiProperty({ example: 'Ana' })
  @trim()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(100)
  nombre: string;

  @ApiProperty({ example: 'Alva' })
  @trim()
  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @MinLength(2, { message: 'El apellido debe tener al menos 2 caracteres' })
  @MaxLength(100)
  apellido: string;

  @ApiProperty({ example: 'ana@example.com' })
  @trim()
  @IsEmail({}, { message: 'El email debe estar en el formato correcto' })
  @MaxLength(150)
  email: string;

  @ApiProperty({ example: '985478552' })
  @trim()
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  @Matches(/^\d{9}$/, { message: 'El teléfono debe tener 9 dígitos' })
  telefono: string;

  @ApiProperty({ example: 'YYYY-MM-DD' })
  @IsDateString(
    {},
    {
      message: 'La fecha de nacimiento debe ser una fecha válida (YYYY-MM-DD)',
    },
  )
  fechaNacimiento: Date;

  @ApiProperty({ example: 'Lugar de Ubicacion: Trujillo' })
  @IsOptional()
  @trim()
  @IsString()
  @MaxLength(255)
  direccion?: string;
}
