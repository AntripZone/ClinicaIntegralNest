import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    switch (exception.code) {
      case 'P2002':
        return new ConflictException(
          'Ya existe un registro con ese valor único',
        ).getResponse();
      case 'P2025':
        return new NotFoundException('Registro no encontrado').getResponse();
      default:
        throw exception;
    }
  }
}
