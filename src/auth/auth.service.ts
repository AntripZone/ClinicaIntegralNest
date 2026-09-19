import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UsuariosService } from '../usuarios/usuarios.service.js';
import { CreateUsuariosDto } from '../usuarios/dto/create-usuarios.dto.js';
import { LoginDto } from './dto/login.dto.js';
@Injectable()
export class AuthService {
  constructor(private readonly usuariosService: UsuariosService) {}

  async register(createUsuariosDto: CreateUsuariosDto) {
    return this.usuariosService.create(createUsuariosDto);
  }

  async login(LoginDto: LoginDto) {
    const usuario = await this.usuariosService.findByEmail(LoginDto.email);
    if (!usuario) {
      throw new UnauthorizedException('Credenciales Invalidas');
    }
    const isMatch = await bcrypt.compare(
      LoginDto.passwordHash,
      usuario.passwordHash,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Credenciales Invalidas');
    }
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, rol: usuario.rol },
      process.env.JWT_SECRET as string,
      { expiresIn: '8h' },
    );
    return { token };
  }
}
