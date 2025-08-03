export function validateCpf(cpf) {
  if (!cpf || cpf.length !== 14) {
    return false;
  }

  const cpfDigits = cpf.replace(/\D/g, '');
  if (cpfDigits.length !== 11) return false;

  const calculateChecksum = (cpf, size) => {
    const coefficients = size === 9 ? [10, 9, 8, 7, 6, 5, 4, 3, 2] : [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    const sum = cpf.slice(0, size).reduce((acc, num, index) => acc + num * coefficients[index], 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const cpfArray = cpfDigits.split('').map(Number);
  const firstChecksum = calculateChecksum(cpfArray, 9);
  const secondChecksum = calculateChecksum(cpfArray, 10);

  return firstChecksum === cpfArray[9] && secondChecksum === cpfArray[10];
}
