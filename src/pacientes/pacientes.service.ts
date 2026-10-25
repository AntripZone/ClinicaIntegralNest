import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePacienteDto } from './dto/create-paciente.dto.js';
import { UpdatePacienteDto } from './dto/update-paciente.dto.js';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class PacientesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query?: string, pagina = 1, limite = 20) {
    const texto = query?.trim();
    const paginaSegura = Math.max(1, Math.floor(pagina));
    const limiteSeguro = Math.min(100, Math.max(1, Math.floor(limite)));

    const where: Prisma.PacienteWhereInput | undefined = texto
      ? {
          OR: [
            { nombre: { contains: texto, mode: 'insensitive' } },
            { apellido: { contains: texto, mode: 'insensitive' } },
            { email: { contains: texto, mode: 'insensitive' } },
          ],
        }
      : undefined;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.paciente.findMany({
        where,
        orderBy: { id: 'asc' },
        skip: (paginaSegura - 1) * limiteSeguro,
        take: limiteSeguro,
      }),
      this.prisma.paciente.count({ where }),
    ]);

    return {
      data,
      total,
      pagina: paginaSegura,
      totalPaginas: Math.max(1, Math.ceil(total / limiteSeguro)),
    };
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
