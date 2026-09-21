import { describe, it, expect } from 'vitest';

function esPasswordSeguro(password: string, minimo = 8): boolean {
  return password.length >= minimo;
}

describe('Contraseña Segura si Dios quiere', () => {
  it.each([
    { minimo: 5, password: '1234', esperado: false },
    { minimo: 5, password: '12345', esperado: true },
    { minimo: 6, password: '12345', esperado: false },
    { minimo: 8, password: '1234567', esperado: false },
    { minimo: 8, password: '12345678', esperado: true },
  ])(
    'mínimo $minimo con "$password" → $esperado',
    ({ minimo, password, esperado }) => {
      expect(esPasswordSeguro(password, minimo)).toBe(esperado);
    },
  );
});
