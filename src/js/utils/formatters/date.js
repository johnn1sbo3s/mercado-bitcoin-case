export function formatDate(date) {
  if (!date) return;

  date = date.replace(/\D/g, '');

  if (date.length > 8) {
    date = date.substring(0, 8);
  }

  return date.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
}
