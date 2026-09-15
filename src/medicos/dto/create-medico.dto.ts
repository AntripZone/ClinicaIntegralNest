export class CreateMedicoDto {
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  numColegiatura: string;
  especialidadId: number;
}
