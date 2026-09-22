import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicosService } from './medicos.service.js';
import { CreateMedicoDto } from './dto/create-medico.dto.js';
import { UpdateMedicoDto } from './dto/update-medico.dto.js';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Medicos')
@ApiBearerAuth()
@Controller('medicos')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('RECEPCIONISTA')
export class MedicosController {
  constructor(private readonly medicosService: MedicosService) {}

  @ApiOperation({ summary: 'Lista todos los medicos' })
  @Get()
  findAll() {
    return this.medicosService.findAll();
  }

  @ApiOperation({ summary: 'Crear 1 medico' })
  @Post()
  create(@Body() createMedicoDTO: CreateMedicoDto) {
    return this.medicosService.create(createMedicoDTO);
  }

  @ApiOperation({ summary: 'Listar 1 medico' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicosService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualizar 1 medico' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateMedicoDto: UpdateMedicoDto) {
    return this.medicosService.update(+id, UpdateMedicoDto);
  }

  @ApiOperation({ summary: 'Eliminar 1 medico [Activo = false]' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicosService.remove(+id);
  }
}
