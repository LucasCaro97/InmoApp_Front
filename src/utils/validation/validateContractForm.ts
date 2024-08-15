type Result = {
  ok: boolean;
  message?: string;
};
const validateContractForm = (contract: Contract): Result => {
  if (typeof contract.inmuebleId !== "number" || contract.inmuebleId <= 0) {
    return { ok: false, message: "Seleccione un inmueble válido." };
  }
  if (typeof contract.inquilinoId !== "number" || contract.inquilinoId <= 0) {
    return { ok: false, message: "Seleccione un inquilino válido." };
  }
  if (
    typeof contract.tipoContratoId !== "number" ||
    contract.tipoContratoId <= 0
  ) {
    return { ok: false, message: "Seleccione un tipo de contrato válido." };
  }
  if (!contract.indice) {
    return { ok: false, message: "Seleccione un indice." };
  }
  if (!contract.fechaInicio || !contract.fechaFin) {
    return {
      ok: false,
      message: "Ingrese fechas de inicio y fin.",
    };
  }
  if (new Date(contract.fechaInicio) >= new Date(contract.fechaFin)) {
    return {
      ok: false,
      message: "La fecha de inicio debe ser anterior a la fecha de fin.",
    };
  }
  if (!contract.importeBase || contract.importeBase <= 0)
    return {
      ok: false,
      message: "Seleccione un importe válido.",
    };
  if (!contract.actualizaCada || contract.actualizaCada <= 0)
    return {
      ok: false,
      message: "Ingrese un periodo de actualización válido",
    };

  return { ok: true };
};
export { validateContractForm };
