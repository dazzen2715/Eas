import dayjs from 'dayjs/esm';
import { IVehiculo } from 'app/entities/vehiculo/vehiculo.model';
import { IFacturacion } from 'app/entities/facturacion/facturacion.model';

export interface IRegistro {
  id?: number;
  horaIngreso?: dayjs.Dayjs;
  horaSalida?: dayjs.Dayjs;
  vehiculos?: IVehiculo[] | null;
  facturacions?: IFacturacion[] | null;
}

export class Registro implements IRegistro {
  constructor(
    public id?: number,
    public horaIngreso?: dayjs.Dayjs,
    public horaSalida?: dayjs.Dayjs,
    public vehiculos?: IVehiculo[] | null,
    public facturacions?: IFacturacion[] | null
  ) {}
}

export function getRegistroIdentifier(registro: IRegistro): number | undefined {
  return registro.id;
}
