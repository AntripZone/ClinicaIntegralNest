import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePacienteDto } from './dto/create-paciente.dto.js';
import { UpdatePacienteDto } from './dto/update-paciente.dto.js';

@Injectable()
export class PacientesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return this.prisma.paciente.findMany({
        orderBy: { id: 'asc' },
      });
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const paciente = await this.prisma.paciente.findUnique({
        where: { id },
      });
      if (!paciente)
        throw new NotFoundException(`Paciente con ID: ${id} no encontrado.`);

      return paciente;
    } catch (error) {
      return error;
    }
  }

  async create(createPacienteDto: CreatePacienteDto) {
    try {
      return await this.prisma.paciente.create({
        data: createPacienteDto,
      });
    } catch (error) {
      return error;
    }
  }

  async update(id: number, updatePacienteDto: UpdatePacienteDto) {
    try {
      return await this.prisma.paciente.update({
        where: { id },
        data: updatePacienteDto,
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const paciente = await this.prisma.paciente.findUnique({
        where: { id },
      });
      if (!paciente)
        throw new NotFoundException(`Paciente con ID: ${id} no encontrado.`);

      return await this.prisma.paciente.delete({
        where: { id },
      });
    } catch (error) {
      return error;
    }
  }
}
