export function formatCpf(cpf) {
  if (!cpf) return '';

  if (cpf.length > 14) {
    cpf = cpf.substring(0, 14);
  };

  cpf = cpf.replace(/\D/g, '');
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
