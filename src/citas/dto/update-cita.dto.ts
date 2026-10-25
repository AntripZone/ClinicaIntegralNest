import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EstadoCita } from '../../generated/prisma/enums.js';

export class UpdateEstadoCitaDto {
  @ApiProperty({ enum: EstadoCita, example: 'COMPLETADA' })
  @IsEnum(EstadoCita, {
    message: 'Estado inválido (PROGRAMADA, COMPLETADA o CANCELADA)',
  })
  estado: EstadoCita;
}
