import { IVehiculo } from 'app/entities/vehiculo/vehiculo.model';

export interface ITipoVehiculo {
  id?: number;
  tipoVehiculo?: string;
  marcaVehiculo?: string;
  vehiculos?: IVehiculo[] | null;
}

export class TipoVehiculo implements ITipoVehiculo {
  constructor(public id?: number, public tipoVehiculo?: string, public marcaVehiculo?: string, public vehiculos?: IVehiculo[] | null) {}
}

export function getTipoVehiculoIdentifier(tipoVehiculo: ITipoVehiculo): number | undefined {
  return tipoVehiculo.id;
}
