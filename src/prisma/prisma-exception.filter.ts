import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();

    let error: HttpException;
    switch (exception.code) {
      case 'P2002':
        return new ConflictException(
          'Ya existe un registro con ese valor único',
        );
        break;
      case 'P2025':
        return new NotFoundException('Registro no encontrado');
        break;
      default:
        error = new InternalServerErrorException('Error de base de datos');
    }
    res.status(error.getStatus()).json(error.getResponse());
  }
}
