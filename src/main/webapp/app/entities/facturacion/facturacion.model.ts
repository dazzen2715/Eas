import dayjs from 'dayjs/esm';
import { IRegistro } from 'app/entities/registro/registro.model';
import { ICliente } from 'app/entities/cliente/cliente.model';
import { IVisitante } from 'app/entities/visitante/visitante.model';
import { IEmpleado } from 'app/entities/empleado/empleado.model';
import { IFormaDePago } from 'app/entities/forma-de-pago/forma-de-pago.model';

export interface IFacturacion {
  id?: number;
  fechaFactura?: dayjs.Dayjs;
  valorFactura?: number;
  registro?: IRegistro;
  cliente?: ICliente;
  visitante?: IVisitante;
  empleado?: IEmpleado;
  formaDePago?: IFormaDePago;
}

export class Facturacion implements IFacturacion {
  constructor(
    public id?: number,
    public fechaFactura?: dayjs.Dayjs,
    public valorFactura?: number,
    public registro?: IRegistro,
    public cliente?: ICliente,
    public visitante?: IVisitante,
    public empleado?: IEmpleado,
    public formaDePago?: IFormaDePago
  ) {}
}

export function getFacturacionIdentifier(facturacion: IFacturacion): number | undefined {
  return facturacion.id;
}
