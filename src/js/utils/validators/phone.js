export function validatePhone(phone) {
  const regex = /^\([1-9]{2}\) [0-9]{4,5}-[0-9]{4}$/;

  return regex.test(phone);
}
