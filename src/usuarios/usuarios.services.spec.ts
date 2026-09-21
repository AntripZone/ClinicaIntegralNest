import { describe, it, expect } from 'vitest';
import { UsuariosService } from './usuarios.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Test, TestingModule } from '@nestjs/testing';

describe('UsuariosService', () => {
  let service: UsuariosService;

  const primsaFalse = {
    usuario: {
      findMany: vi.fn(),
    },
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
        {
          provide: PrismaService,
          useValue: primsaFalse,
        },
      ],
    }).compile();
    service = module.get<UsuariosService>(UsuariosService);
  });
  it('Debe devolver la lista de usuarios', async () => {
    const falseList = [
      { id: 1, nombre: 'Adrian', email: 'adrian@example.com' },
      { id: 2, nombre: 'Jose', email: 'jose@example.com' },
      { id: 3, nombre: 'Alfonso', email: 'alfonso@example.com' },
      { id: 4, nombre: 'Roberto', email: 'roberto@example.com' },
    ];
    primsaFalse.usuario.findMany.mockResolvedValue(falseList);
    const resultado = await service.findAll();

    expect(resultado).toEqual(falseList);
  });
});
