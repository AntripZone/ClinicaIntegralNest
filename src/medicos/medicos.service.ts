import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateMedicoDto } from './dto/create-medico.dto.js';
import { UpdateMedicoDto } from './dto/update-medico.dto.js';

@Injectable()
export class MedicosService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.medico.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async create(CreateMedicoDto: CreateMedicoDto) {
    return await this.prisma.medico.create({
      data: CreateMedicoDto,
    });
  }

  async findOne(id: number) {
    const medico = await this.prisma.medico.findUnique({
      where: { id },
    });
    if (!medico)
      throw new NotFoundException(`Medico con ID ${id} no encontrado.`);

    return medico;
  }

  async update(id: number, UpdateMedicoDto: UpdateMedicoDto) {
    return await this.prisma.medico.update({
      where: { id },
      data: UpdateMedicoDto,
    });
  }

  async remove(id: number) {
    const medico = await this.prisma.medico.findUnique({
      where: { id },
    });
    if (!medico)
      throw new NotFoundException(`Medico con ID ${id} no encontrado.`);

    return await this.prisma.medico.delete({
      where: { id },
    });
  }
}
