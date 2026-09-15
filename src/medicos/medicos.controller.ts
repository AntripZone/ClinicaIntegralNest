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

@Controller('medicos')
export class MedicosController {
  constructor(private readonly medicosService: MedicosService) {}

  @Get()
  findAll() {
    return this.medicosService.findAll();
  }

  @Post()
  create(@Body() createMedicoDTO: CreateMedicoDto) {
    return this.medicosService.create(createMedicoDTO);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateMedicoDto: UpdateMedicoDto) {
    return this.medicosService.update(+id, UpdateMedicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicosService.remove(+id);
  }
}
