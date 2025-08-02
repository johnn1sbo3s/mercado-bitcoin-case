export function validateCnpj(cnpj) {
  if (cnpj.length !== 18) {
    return false;
  }

  return true;
}
