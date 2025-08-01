export function validatePhone(phone) {
  if (!phone) {
    return false;
  }

  if (phone.length !== 11) {
    return false;
  }

  return true;
}
