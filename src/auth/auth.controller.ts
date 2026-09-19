import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateUsuariosDto } from '../usuarios/dto/create-usuarios.dto.js';
import { LoginDto } from './dto/login.dto.js';
CreateUsuariosDto;
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUsuariosDto: CreateUsuariosDto) {
    return this.authService.register(createUsuariosDto);
  }
  @Post('login')
  async login(@Body() LoginDto: LoginDto) {
    return this.authService.login(LoginDto);
  }

  @Get('profile')
  async profile(@Req() req: Request & { user: unknown }) {
    return req.user;
  }
}
