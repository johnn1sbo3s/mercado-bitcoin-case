import { describe, it, expect } from 'vitest';
import { formatCpf } from '@/js/utils/formatters/cpf.js';

describe('formatCpf', () => {
  it('should return empty string for empty input', () => {
    expect(formatCpf('')).toBe('');
    expect(formatCpf(null)).toBe('');
    expect(formatCpf(undefined)).toBe('');
  });

  it('should return valid cpf correctly', () => {
    expect(formatCpf('12345678901')).toBe('123.456.789-01');
  });

  it('should remove non-digit characters', () => {
    expect(formatCpf('123.456.789-01')).toBe('123.456.789-01');
    expect(formatCpf('abc12345678901def')).toBe('123.456.789-01');
  });

  it('should truncate cpf to 11 digits', () => {
    expect(formatCpf('12345678901232312')).toBe('123.456.789-01');
  });

  it('should not format inputs that do not match the pattern', () => {
    expect(formatCpf('123')).toBe('123');
  });
});
