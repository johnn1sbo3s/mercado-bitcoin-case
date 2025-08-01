export function validateCpf(cpf) {
  if (cpf.length !== 14) {
    return false;
  }

  return true;
}
