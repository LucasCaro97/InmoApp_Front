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

type Option = {
  id: number;
  nombre: string;
};

type Property = {
  id?: number;
  nombre: string;
  direccion: string;
  ciudad: string;
  provincia: string;
  descripcion: string;
  categoria: Array;
  caracteristicas: Array<Option>;
  servicios: Array<Option>;
  ambientes: Array<Option>;
  esVenta: boolean;
  esAlquiler: boolean;
  precioAlquiler: number;
  precioVenta: number;
  listaImagenes: Array<File>;
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

type Index = {
  id: number;
  nombre: string;
};

type ContractType = {
  id: number;
  nombre: string;
};
