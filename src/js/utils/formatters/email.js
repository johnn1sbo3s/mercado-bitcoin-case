export function formatEmail(email) {
  email = email.replace(/[^a-zA-Z0-9@._-]/g, '');
  return email.trim().toLowerCase();
}
