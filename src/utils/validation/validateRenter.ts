type Result = {
  ok: boolean;
  message?: string;
};
import { validateCUIL, validateDNI } from "./validateDNI-CUIL";
import { validatePhone } from "./validatePhone";
const validateRenter = (renter: Renter): Result => {
  if (!renter.nombreCompleto)
    return { ok: false, message: "Ingrese un nombre completo." };
  if (!renter.dni) return { ok: false, message: "Ingrese un DNI." };
  if (!renter.cuil) return { ok: false, message: "Ingrese un CUIL." };
  if (!renter.telefono) return { ok: false, message: "Ingrese un teléfono." };
  if (!renter.correo) return { ok: false, message: "Ingrese un correo." };
  if (!validatePhone(renter.telefono)) {
    return { ok: false, message: "Ingrese un teléfono válido" };
  }
  if (!validateDNI) {
    return { ok: false, message: "Ingrese un DNI válido" };
  }
  if (!validateCUIL) {
    return { ok: false, message: "Ingrese un CUIL válido" };
  }

  return { ok: true };
};

export { validateRenter };
