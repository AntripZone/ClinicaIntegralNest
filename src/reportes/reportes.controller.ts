import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { ReportesService } from './reportes.services.js';

@ApiBearerAuth()
@ApiTags('Reportes')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @ApiOperation({ summary: 'Total de citas por especialidad' })
  @Get('especialidades')
  citasPorEspecialidad() {
    return this.reportesService.citasPorEspecialidad();
  }
}
