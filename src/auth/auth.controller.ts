import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'node:path';
import { AuthService } from './auth.service.js';
import { CreateUsuariosDto } from '../usuarios/dto/create-usuarios.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { ActualizarPerfilDto } from './dto/actualizar-perfil.dto.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { UsuariosService } from '../usuarios/usuarios.service.js';

type RequestConUsuario = Request & {
  user: { id: number; email: string; rol: string };
};

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usuariosService: UsuariosService,
  ) {}

  @Post('register')
  async register(@Body() createUsuariosDto: CreateUsuariosDto) {
    return this.authService.register(createUsuariosDto);
  }
  @Post('login')
  async login(@Body() LoginDto: LoginDto) {
    return this.authService.login(LoginDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Req() req: RequestConUsuario) {
    return req.user;
  }

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard)
  @Put('perfil')
  @UseInterceptors(
    FileInterceptor('foto', {
      storage: diskStorage({
        destination: 'uploads/perfiles',
        filename: (_req, file, cb) => {
          const unico = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, `${unico}${extname(file.originalname).toLowerCase()}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        if (file.mimetype.startsWith('image/')) cb(null, true);
        else
          cb(new BadRequestException('El archivo debe ser una imagen'), false);
      },
    }),
  )
  async actualizarPerfil(
    @Req() req: RequestConUsuario,
    @Body() dto: ActualizarPerfilDto,
    @UploadedFile() foto?: Express.Multer.File,
  ) {
    const fotoUrl = foto ? `/uploads/perfiles/${foto.filename}` : undefined;
    return this.usuariosService.actualizarPerfil(req.user.id, dto, fotoUrl);
  }
}
