import { IFacturacion } from 'app/entities/facturacion/facturacion.model';

export interface IEmpleado {
  id?: number;
  nombreEmpleado?: string;
  apellidoEmpleado?: string | null;
  cargoEmpleado?: string;
  phone?: string;
  facturacions?: IFacturacion[] | null;
}

export class Empleado implements IEmpleado {
  constructor(
    public id?: number,
    public nombreEmpleado?: string,
    public apellidoEmpleado?: string | null,
    public cargoEmpleado?: string,
    public phone?: string,
    public facturacions?: IFacturacion[] | null
  ) {}
}

export function getEmpleadoIdentifier(empleado: IEmpleado): number | undefined {
  return empleado.id;
}
