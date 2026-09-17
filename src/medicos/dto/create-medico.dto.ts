import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsInt,
  IsPositive,
} from 'class-validator';

const trim = () =>
  Transform(({ value }) => (typeof value === 'string' ? value.trim() : value));

export class CreateMedicoDto {
  @trim()
  @IsString({ message: 'el nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'el nombre es obligatorio' })
  @MinLength(2, { message: 'El nombre debe tener almenos 2 caracteres' })
  @Matches(/\S/, {
    message: 'El nombre  no puede contener solo espacios',
  })
  @MaxLength(100)
  nombre: string;

  @trim()
  @IsString({ message: 'el apellido debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'el apellido es obligatorio' })
  @MinLength(2, { message: 'El apellido debe tener almenos 2 caracteres' })
  @MaxLength(100)
  apellido: string;

  @trim()
  @IsEmail({}, { message: 'el email debe estar en el formato correcto' })
  @MaxLength(150)
  email: string;

  @IsOptional()
  @trim()
  @IsString()
  @Matches(/^\d{9}$/, { message: 'El teléfono debe tener 9 dígitos' })
  telefono?: string;

  @trim()
  @IsString({
    message: 'el numero de colegiatura debe ser una cadena de texto',
  })
  @IsNotEmpty({ message: 'el numero de colegiatura es obligatorio' })
  @MinLength(2, {
    message: 'El numero de colegiatura debe tener almenos 2 caracteres',
  })
  @MaxLength(20)
  numColegiatura: string;

  @Type(() => Number)
  @IsInt({ message: 'La especialidad debe ser un número entero' })
  @IsPositive({ message: 'La especialidad debe ser un ID válido' })
  especialidadId: number;
}
