export function validateDate(date) {
  if (!date) {
    return false;
  }

  if (date.length < 10) {
    return false;
  }

  const [day, month, year] = date.split('/').map(Number);
  const maxYear = new Date().getFullYear();

  return (
    day >= 1 && day <= 31 &&
    month >= 1 && month <= 12 &&
    year >= 1900 && year <= maxYear
  );
}
