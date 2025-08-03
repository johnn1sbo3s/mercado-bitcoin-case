export function validateCnpj(cnpj) {
  if (!cnpj || cnpj.length !== 18) {
    return false;
  }

  const cnpjDigits = cnpj.replace(/\D/g, '');
  if (cnpjDigits.length !== 14) return false;

  const calculateChecksum = (cnpj, size) => {
    const coefficients = size === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const sum = cnpj.slice(0, size).reduce((acc, num, index) => acc + num * coefficients[index], 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const cnpjArray = cnpjDigits.split('').map(Number);
  const firstChecksum = calculateChecksum(cnpjArray, 12);
  const secondChecksum = calculateChecksum(cnpjArray, 13);

  return firstChecksum === cnpjArray[12] && secondChecksum === cnpjArray[13];
}
