export function formatPhone(phone) {
  if (!phone) return;

  phone = phone.replace(/\D/g, '');

  if (phone.length > 11) {
    phone = phone.substring(0, 11);
  }

  return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}
