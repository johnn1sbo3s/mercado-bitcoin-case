export function sanitizeForm(form) {
  const attributes = Object.values(form).reduce((acc, currentStep) => {
    return { ...acc, ...currentStep };
  }, {});

  return {
    name: attributes.name,
    email: attributes.email,
    accountType: attributes.accountType,
    identifier: attributes.identifier.replace(/[^\d]/g, ''),
    referenceDate: attributes.referenceDate.replace(/[^\d]/g, ''),
    phone: attributes.phone.replace(/[^\d]/g, ''),
    password: attributes.password,
  };
}
