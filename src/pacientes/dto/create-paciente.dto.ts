import { IsDateString } from 'class-validator';

export class CreatePacienteDto {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  @IsDateString()
  fechaNacimiento: Date;
  direccion?: string;
}
