import { describe, it, expect } from 'vitest';
import { formatCnpj } from '../formatters/cnpj';

describe('formatCnpj', () => {
  it('should return empty string for empty input', () => {
    expect(formatCnpj('')).toBe('');
    expect(formatCnpj(null)).toBe('');
    expect(formatCnpj(undefined)).toBe('');
  });

  it('should format valid CNPJ correctly', () => {
    expect(formatCnpj('12345678000195')).toBe('12.345.678/0001-95');
  });

  it('should remove non-digit characters', () => {
    expect(formatCnpj('12.345.678/0001-95')).toBe('12.345.678/0001-95');
    expect(formatCnpj('abc12345678000195def')).toBe('12.345.678/0001-95');
  });

  it('should truncate inputs longer than 18 characters', () => {
    expect(formatCnpj('1234567800019512345')).toBe('12.345.678/0001-95');
  });

  it('should not format inputs that do not match the pattern', () => {
    expect(formatCnpj('123')).toBe('123');
  });
});
