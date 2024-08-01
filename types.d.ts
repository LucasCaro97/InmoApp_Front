type Owner = {
  id?: number;
  nombreCompleto: string;
  dni: string;
  cuil: string;
  telefono: string;
  direccion: string;
  correo: string;
  porcentaje_comision: number;
};

type Renter = {
  id?: number;
  nombreCompleto: string;
  dni: string;
  cuil: string;
  cuil: string;
  telefono: string;
  correo: string;
};

type Property = {
  id?: number;
  nombre: string;
  direccion: string;
  ciudad: string;
  provincia: string;
  descripcion: string;
  categoria: number;
  caracteristicas: Array<number>;
  servicios: Array<number>;
  ambientes: Array<number>;
  esVenta: boolean;
  esAlquiler: boolean;
  imagenes: Array<string>;
};

type Contract = {
  inmuebleId: number;
  inquilinoId: number;
  tipoContratoId: number;
  fechaInicio: string;
  fechaFin: string;
  observaciones: string;
  estadoContrato: number;
  importeBase: number;
  indice: number;
  actualizaCada: number;
};
