import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateMedicoDto } from './dto/create-medico.dto.js';
import { UpdateMedicoDto } from './dto/update-medico.dto.js';

@Injectable()
export class MedicosService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return this.prisma.medico.findMany({
        orderBy: { id: 'asc' },
      });
    } catch (error) {
      return error;
    }
  }

  async create(CreateMedicoDto: CreateMedicoDto) {
    try {
      return await this.prisma.medico.create({
        data: CreateMedicoDto,
      });
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const medico = await this.prisma.medico.findUnique({
        where: { id },
      });
      if (!medico)
        throw new NotFoundException(`Medico con ID ${id} no encontrado.`);

      return medico;
    } catch (error) {
      return error;
    }
  }

  async update(id: number, UpdateMedicoDto: UpdateMedicoDto) {
    try {
      return await this.prisma.medico.update({
        where: { id },
        data: UpdateMedicoDto,
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const medico = await this.prisma.medico.findUnique({
        where: { id },
      });
      if (!medico)
        throw new NotFoundException(`Medico con ID ${id} no encontrado.`);

      return await this.prisma.medico.delete({
        where: { id },
      });
    } catch (error) {
      return error;
    }
  }
}
