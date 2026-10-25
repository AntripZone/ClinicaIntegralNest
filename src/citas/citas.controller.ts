import { UseGuards, Param, Patch } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CitasService } from './citas.service.js';
import { CreateCitaDto } from './dto/create-cita.dto.js';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { UpdateEstadoCitaDto } from './dto/update-cita.dto.js';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Citas')
@Controller('citas')
export class CitasController {
  constructor(private readonly citasService: CitasService) {}

  @ApiOperation({ summary: 'Crear citas' })
  @Post()
  create(@Body() createCitaDto: CreateCitaDto) {
    return this.citasService.create(createCitaDto);
  }

  @ApiOperation({ summary: 'Lista todas las citas' })
  @ApiQuery({
    name: 'estado',
    required: false,
    enum: ['PROGRAMADA', 'COMPLETADA', 'CANCELADA'],
  })
  @ApiQuery({ name: 'pacienteId', required: false, type: Number })
  @Get()
  findAll(
    @Query('estado') estado?: string,
    @Query('pacienteId') pacienteId?: string,
  ) {
    return this.citasService.findAll(
      estado,
      pacienteId ? +pacienteId : undefined,
    );
  }

  @ApiOperation({ summary: 'Cambiar el estado de una cita' })
  @Patch(':id/estado')
  updateEstado(@Param('id') id: string, @Body() dto: UpdateEstadoCitaDto) {
    return this.citasService.updateEstado(+id, dto.estado);
  }
}
