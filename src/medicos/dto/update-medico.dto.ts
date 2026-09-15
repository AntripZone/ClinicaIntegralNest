import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateMedicoDto } from './create-medico.dto.js';

export class UpdateMedicoDto extends PartialType(CreateMedicoDto) {
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
