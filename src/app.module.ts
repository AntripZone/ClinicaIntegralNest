import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { PacientesModule } from './pacientes/pacientes.module.js';
import { MedicosModule } from './medicos/medicos.module.js';
import { AuthModule } from './auth/auth.module.js';
import { CitasModule } from './citas/citas.module.js';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './config/envValidation.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => {
        const { error, value } = envValidationSchema.validate(config, {
          abortEarly: false,
          allowUnknown: true,
        });
        if (error) {
          throw new Error(`Config inválida: ${error.message}`);
        }
        return value;
      },
    }),
    AuthModule,
    PrismaModule,
    PacientesModule,
    MedicosModule,
    CitasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
