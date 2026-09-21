import { Module } from '@nestjs/common';
import { CitasController } from './citas.controller.js';
import { CitasService } from './citas.service.js';
import { PacientesModule } from '../pacientes/pacientes.module.js';

@Module({
  imports: [PacientesModule],
  controllers: [CitasController],
  providers: [CitasService],
})
export class CitasModule {}
