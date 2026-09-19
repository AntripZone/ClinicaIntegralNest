import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuariosDto } from './create-usuarios.dto.js';

export class UpdateUsuariosDto extends PartialType(CreateUsuariosDto) {}
