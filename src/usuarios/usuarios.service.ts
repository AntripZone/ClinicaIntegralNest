import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuariosDto } from './dto/create-usuarios.dto.js';
import { UpdateUsuariosDto } from './dto/update-usuarios.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUsuariosDto: CreateUsuariosDto) {
    const { password, ...rest } = createUsuariosDto;
    return await this.prisma.usuario.create({
      data: {
        ...rest,
        passwordHash: await bcrypt.hash(password, 10),
      },
    });
  }

  async findAll() {
    return this.prisma.usuario.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
    });
    if (!usuario) {
      throw new NotFoundException(`usuario de ID: ${id} no encontrado`);
    }
    return usuario;
  }

  async update(id: number, updateUsuariosDto: UpdateUsuariosDto) {
    return await this.prisma.usuario.update({
      where: { id },
      data: updateUsuariosDto,
    });
  }

  async remove(id: number) {
    const user = await this.prisma.usuario.findUnique({
      where: { id },
    });
    if (!user)
      throw new NotFoundException(`usuario de ID: ${id} no encontrado`);

    return await this.prisma.usuario.delete({
      where: { id },
    });
  }
  async findByEmail(email: string) {
    return this.prisma.usuario.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        rol: true,
        creadoEn: true,
        passwordHash: true,
      },
    });
  }
}
