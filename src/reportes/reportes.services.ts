import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ReportesService {
  constructor(private readonly prisma: PrismaService) {}

  async citasPorEspecialidad() {
    const especialidades = await this.prisma.especialidad.findMany({
      orderBy: { nombre: 'asc' },
      select: {
        nombre: true,
        medicos: { select: { _count: { select: { citas: true } } } },
      },
    });

    return especialidades.map((e) => ({
      especialidad: e.nombre,
      total: e.medicos.reduce((acc, m) => acc + m._count.citas, 0),
    }));
  }
}
