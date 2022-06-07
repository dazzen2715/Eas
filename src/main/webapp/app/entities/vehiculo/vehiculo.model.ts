import { ITipoVehiculo } from 'app/entities/tipo-vehiculo/tipo-vehiculo.model';
import { IRegistro } from 'app/entities/registro/registro.model';

export interface IVehiculo {
  id?: number;
  placa?: string;
  tipoVehiculo?: ITipoVehiculo;
  registro?: IRegistro;
}

export class Vehiculo implements IVehiculo {
  constructor(public id?: number, public placa?: string, public tipoVehiculo?: ITipoVehiculo, public registro?: IRegistro) {}
}

export function getVehiculoIdentifier(vehiculo: IVehiculo): number | undefined {
  return vehiculo.id;
}
