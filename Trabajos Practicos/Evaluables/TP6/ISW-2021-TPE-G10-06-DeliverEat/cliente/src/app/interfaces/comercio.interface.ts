import { Producto } from './producto.interface';

export interface Comercio {
  _id: string;
  productos: Producto[];
  horarioCierre: string;
  diasAtencion: string[];
  tiempoPromedioAtencion: number;
  ubicacion: Ubicacion;
  nombre: string;
  adherido: boolean;
  tipo: string;
  categoriasProducto: string[];
  seguimientoCadete: boolean;
  image: string;
  __v: number;
  horarioApertura: string;
}

export interface Ubicacion {
  ciudad: string;
  calle: string;
  nro: string;
}
