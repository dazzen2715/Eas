import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IFacturacion, Facturacion } from '../facturacion.model';
import { FacturacionService } from '../service/facturacion.service';
import { IRegistro } from 'app/entities/registro/registro.model';
import { RegistroService } from 'app/entities/registro/service/registro.service';
import { ICliente } from 'app/entities/cliente/cliente.model';
import { ClienteService } from 'app/entities/cliente/service/cliente.service';
import { IVisitante } from 'app/entities/visitante/visitante.model';
import { VisitanteService } from 'app/entities/visitante/service/visitante.service';
import { IEmpleado } from 'app/entities/empleado/empleado.model';
import { EmpleadoService } from 'app/entities/empleado/service/empleado.service';
import { IFormaDePago } from 'app/entities/forma-de-pago/forma-de-pago.model';
import { FormaDePagoService } from 'app/entities/forma-de-pago/service/forma-de-pago.service';

@Component({
  selector: 'easyparking-facturacion-update',
  templateUrl: './facturacion-update.component.html',
})
export class FacturacionUpdateComponent implements OnInit {
  isSaving = false;

  registrosSharedCollection: IRegistro[] = [];
  clientesSharedCollection: ICliente[] = [];
  visitantesSharedCollection: IVisitante[] = [];
  empleadosSharedCollection: IEmpleado[] = [];
  formaDePagosSharedCollection: IFormaDePago[] = [];

  editForm = this.fb.group({
    id: [],
    fechaFactura: [null, [Validators.required]],
    valorFactura: [null, [Validators.required]],
    registro: [null, Validators.required],
    cliente: [null, Validators.required],
    visitante: [null, Validators.required],
    empleado: [null, Validators.required],
    formaDePago: [null, Validators.required],
  });

  constructor(
    protected facturacionService: FacturacionService,
    protected registroService: RegistroService,
    protected clienteService: ClienteService,
    protected visitanteService: VisitanteService,
    protected empleadoService: EmpleadoService,
    protected formaDePagoService: FormaDePagoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ facturacion }) => {
      this.updateForm(facturacion);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const facturacion = this.createFromForm();
    if (facturacion.id !== undefined) {
      this.subscribeToSaveResponse(this.facturacionService.update(facturacion));
    } else {
      this.subscribeToSaveResponse(this.facturacionService.create(facturacion));
    }
  }

  trackRegistroById(_index: number, item: IRegistro): number {
    return item.id!;
  }

  trackClienteById(_index: number, item: ICliente): number {
    return item.id!;
  }

  trackVisitanteById(_index: number, item: IVisitante): number {
    return item.id!;
  }

  trackEmpleadoById(_index: number, item: IEmpleado): number {
    return item.id!;
  }

  trackFormaDePagoById(_index: number, item: IFormaDePago): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFacturacion>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(facturacion: IFacturacion): void {
    this.editForm.patchValue({
      id: facturacion.id,
      fechaFactura: facturacion.fechaFactura,
      valorFactura: facturacion.valorFactura,
      registro: facturacion.registro,
      cliente: facturacion.cliente,
      visitante: facturacion.visitante,
      empleado: facturacion.empleado,
      formaDePago: facturacion.formaDePago,
    });

    this.registrosSharedCollection = this.registroService.addRegistroToCollectionIfMissing(
      this.registrosSharedCollection,
      facturacion.registro
    );
    this.clientesSharedCollection = this.clienteService.addClienteToCollectionIfMissing(this.clientesSharedCollection, facturacion.cliente);
    this.visitantesSharedCollection = this.visitanteService.addVisitanteToCollectionIfMissing(
      this.visitantesSharedCollection,
      facturacion.visitante
    );
    this.empleadosSharedCollection = this.empleadoService.addEmpleadoToCollectionIfMissing(
      this.empleadosSharedCollection,
      facturacion.empleado
    );
    this.formaDePagosSharedCollection = this.formaDePagoService.addFormaDePagoToCollectionIfMissing(
      this.formaDePagosSharedCollection,
      facturacion.formaDePago
    );
  }

  protected loadRelationshipsOptions(): void {
    this.registroService
      .query()
      .pipe(map((res: HttpResponse<IRegistro[]>) => res.body ?? []))
      .pipe(
        map((registros: IRegistro[]) =>
          this.registroService.addRegistroToCollectionIfMissing(registros, this.editForm.get('registro')!.value)
        )
      )
      .subscribe((registros: IRegistro[]) => (this.registrosSharedCollection = registros));

    this.clienteService
      .query()
      .pipe(map((res: HttpResponse<ICliente[]>) => res.body ?? []))
      .pipe(
        map((clientes: ICliente[]) => this.clienteService.addClienteToCollectionIfMissing(clientes, this.editForm.get('cliente')!.value))
      )
      .subscribe((clientes: ICliente[]) => (this.clientesSharedCollection = clientes));

    this.visitanteService
      .query()
      .pipe(map((res: HttpResponse<IVisitante[]>) => res.body ?? []))
      .pipe(
        map((visitantes: IVisitante[]) =>
          this.visitanteService.addVisitanteToCollectionIfMissing(visitantes, this.editForm.get('visitante')!.value)
        )
      )
      .subscribe((visitantes: IVisitante[]) => (this.visitantesSharedCollection = visitantes));

    this.empleadoService
      .query()
      .pipe(map((res: HttpResponse<IEmpleado[]>) => res.body ?? []))
      .pipe(
        map((empleados: IEmpleado[]) =>
          this.empleadoService.addEmpleadoToCollectionIfMissing(empleados, this.editForm.get('empleado')!.value)
        )
      )
      .subscribe((empleados: IEmpleado[]) => (this.empleadosSharedCollection = empleados));

    this.formaDePagoService
      .query()
      .pipe(map((res: HttpResponse<IFormaDePago[]>) => res.body ?? []))
      .pipe(
        map((formaDePagos: IFormaDePago[]) =>
          this.formaDePagoService.addFormaDePagoToCollectionIfMissing(formaDePagos, this.editForm.get('formaDePago')!.value)
        )
      )
      .subscribe((formaDePagos: IFormaDePago[]) => (this.formaDePagosSharedCollection = formaDePagos));
  }

  protected createFromForm(): IFacturacion {
    return {
      ...new Facturacion(),
      id: this.editForm.get(['id'])!.value,
      fechaFactura: this.editForm.get(['fechaFactura'])!.value,
      valorFactura: this.editForm.get(['valorFactura'])!.value,
      registro: this.editForm.get(['registro'])!.value,
      cliente: this.editForm.get(['cliente'])!.value,
      visitante: this.editForm.get(['visitante'])!.value,
      empleado: this.editForm.get(['empleado'])!.value,
      formaDePago: this.editForm.get(['formaDePago'])!.value,
    };
  }
}
