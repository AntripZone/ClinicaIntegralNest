import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCitaDto } from './dto/create-cita.dto.js';
import { Prisma } from '../generated/prisma/client.js';
import { EstadoCita } from '../generated/prisma/enums.js';

const incluirResumen = {
  paciente: { select: { id: true, nombre: true, apellido: true } },
  medico: { select: { id: true, nombre: true, apellido: true } },
} as const;

@Injectable()
export class CitasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCitaDto: CreateCitaDto) {
    if (new Date(createCitaDto.fechaHora) < new Date())
      throw new BadRequestException(
        'No se puede agendar una cita en el pasado',
      );

    try {
      return await this.prisma.cita.create({
        data: createCitaDto,
        include: incluirResumen,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          throw new ConflictException(
            'El medico ya tiene una cita en ese horario.',
          );

        if (error.code === 'P2003')
          throw new NotFoundException('El paciente o medico no existe');
      }
      throw error;
    }
  }

  findAll(estado?: string, pacienteId?: number) {
    const estadoNormalizado = estado?.toUpperCase();

    if (
      estadoNormalizado &&
      !Object.values(EstadoCita).includes(estadoNormalizado as EstadoCita)
    ) {
      throw new BadRequestException(`Estado inválido: ${estado}`);
    }

    return this.prisma.cita.findMany({
      where: {
        ...(estadoNormalizado && { estado: estadoNormalizado as EstadoCita }),
        ...(pacienteId && { pacienteId }),
      },
      include: incluirResumen,
      orderBy: { fechaHora: 'asc' },
    });
  }

  async updateEstado(id: number, estado: EstadoCita) {
    const cita = await this.prisma.cita.findUnique({ where: { id } });
    if (!cita) throw new NotFoundException(`Cita con ID: ${id} no encontrada.`);

    return this.prisma.cita.update({
      where: { id },
      data: { estado },
      include: incluirResumen,
    });
  }
}
