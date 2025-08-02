export function validatePhone(phone) {
  if (!phone) {
    return false;
  }

  if (phone.length < 15) {
    return false;
  }

  return true;
}
