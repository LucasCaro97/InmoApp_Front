const validateDNI = (dni: string): boolean => {
  const regex = /^\d{7,8}$/;
  return regex.test(dni);
};
const validateCUIL = (cuil: string): boolean => {
  const regex = /^\d{2}-\d{7,8}-\d{1}$/;
  return regex.test(cuil);
};

export { validateDNI, validateCUIL };
