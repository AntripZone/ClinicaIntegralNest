import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCitaDto } from './dto/create-cita.dto.js';
import { Prisma } from '../generated/prisma/client.js';

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

  findAll() {
    return this.prisma.cita.findMany({
      include: {
        paciente: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
          },
        },
        medico: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
          },
        },
      },
      orderBy: { fechaHora: 'asc' },
    });
  }
}
