import { IFacturacion } from 'app/entities/facturacion/facturacion.model';

export interface ICliente {
  id?: number;
  nombreCliente?: string;
  apellidocliente?: string;
  bloqueCliente?: string;
  phone?: string;
  correoCliente?: string;
  facturacions?: IFacturacion[] | null;
}

export class Cliente implements ICliente {
  constructor(
    public id?: number,
    public nombreCliente?: string,
    public apellidocliente?: string,
    public bloqueCliente?: string,
    public phone?: string,
    public correoCliente?: string,
    public facturacions?: IFacturacion[] | null
  ) {}
}

export function getClienteIdentifier(cliente: ICliente): number | undefined {
  return cliente.id;
}
