import { IFacturacion } from 'app/entities/facturacion/facturacion.model';

export interface IVisitante {
  id?: number;
  nombrevisitante?: string;
  apellido?: string | null;
  phone?: string;
  facturacions?: IFacturacion[] | null;
}

export class Visitante implements IVisitante {
  constructor(
    public id?: number,
    public nombrevisitante?: string,
    public apellido?: string | null,
    public phone?: string,
    public facturacions?: IFacturacion[] | null
  ) {}
}

export function getVisitanteIdentifier(visitante: IVisitante): number | undefined {
  return visitante.id;
}
