export function validateDate(date) {
  date = new Date(date);
  const today = new Date();

  return date < today;
}
