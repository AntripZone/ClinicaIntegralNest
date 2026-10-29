import {
  IsEmail,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActualizarPerfilDto {
  @ApiProperty({ example: 'Adrián Alva' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(100)
  nombre: string;

  @ApiProperty({ example: 'adrian@clinica.com' })
  @IsEmail({}, { message: 'Ingresa un email válido' })
  email: string;

  @ApiProperty({ example: '987654321', required: false })
  @IsOptional()
  @Matches(/^\d{8,15}$/, {
    message: 'El teléfono debe tener entre 8 y 15 dígitos',
  })
  telefono?: string;
}
