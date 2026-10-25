import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePacienteDto } from './dto/create-paciente.dto.js';
import { UpdatePacienteDto } from './dto/update-paciente.dto.js';

@Injectable()
export class PacientesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query?: string) {
    const texto = query?.trim();

    return this.prisma.paciente.findMany({
      where: texto
        ? {
            OR: [
              { nombre: { contains: texto, mode: 'insensitive' } },
              { apellido: { contains: texto, mode: 'insensitive' } },
              { email: { contains: texto, mode: 'insensitive' } },
            ],
          }
        : undefined,
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const paciente = await this.prisma.paciente.findUnique({
      where: { id },
    });
    if (!paciente)
      throw new NotFoundException(`Paciente con ID: ${id} no encontrado.`);

    return paciente;
  }

  async create(createPacienteDto: CreatePacienteDto) {
    return await this.prisma.paciente.create({
      data: createPacienteDto,
    });
  }

  async update(id: number, updatePacienteDto: UpdatePacienteDto) {
    return await this.prisma.paciente.update({
      where: { id },
      data: updatePacienteDto,
    });
  }

  async remove(id: number) {
    const paciente = await this.prisma.paciente.findUnique({
      where: { id },
    });
    if (!paciente)
      throw new NotFoundException(`Paciente con ID: ${id} no encontrado.`);

    return await this.prisma.paciente.delete({
      where: { id },
    });
  }
}
