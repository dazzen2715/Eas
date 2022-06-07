import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IEmpleado, Empleado } from '../empleado.model';
import { EmpleadoService } from '../service/empleado.service';

@Component({
  selector: 'easyparking-empleado-update',
  templateUrl: './empleado-update.component.html',
})
export class EmpleadoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombreEmpleado: [null, [Validators.required, Validators.maxLength(20)]],
    apellidoEmpleado: [null, [Validators.maxLength(20)]],
    cargoEmpleado: [null, [Validators.required, Validators.maxLength(20)]],
    phone: [null, [Validators.required, Validators.maxLength(20)]],
  });

  constructor(protected empleadoService: EmpleadoService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ empleado }) => {
      this.updateForm(empleado);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const empleado = this.createFromForm();
    if (empleado.id !== undefined) {
      this.subscribeToSaveResponse(this.empleadoService.update(empleado));
    } else {
      this.subscribeToSaveResponse(this.empleadoService.create(empleado));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmpleado>>): void {
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

  protected updateForm(empleado: IEmpleado): void {
    this.editForm.patchValue({
      id: empleado.id,
      nombreEmpleado: empleado.nombreEmpleado,
      apellidoEmpleado: empleado.apellidoEmpleado,
      cargoEmpleado: empleado.cargoEmpleado,
      phone: empleado.phone,
    });
  }

  protected createFromForm(): IEmpleado {
    return {
      ...new Empleado(),
      id: this.editForm.get(['id'])!.value,
      nombreEmpleado: this.editForm.get(['nombreEmpleado'])!.value,
      apellidoEmpleado: this.editForm.get(['apellidoEmpleado'])!.value,
      cargoEmpleado: this.editForm.get(['cargoEmpleado'])!.value,
      phone: this.editForm.get(['phone'])!.value,
    };
  }
}
