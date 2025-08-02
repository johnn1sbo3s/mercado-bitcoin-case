export function sanitizeForm(form) {
  const attributes = Object.values(form).reduce((acc, currentStep) => {
    return { ...acc, ...currentStep };
  }, {});
  console.log({
    ...attributes,
    cpf: attributes.identifier.replace(/[^\d]/g, ''),
  });

  return {
    ...attributes,
    cpf: attributes.identifier.replace(/[^\d]/g, ''),
  }
}
