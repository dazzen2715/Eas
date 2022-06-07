import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IRegistro, Registro } from '../registro.model';
import { RegistroService } from '../service/registro.service';

@Component({
  selector: 'easyparking-registro-update',
  templateUrl: './registro-update.component.html',
})
export class RegistroUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    horaIngreso: [null, [Validators.required]],
    horaSalida: [null, [Validators.required]],
  });

  constructor(protected registroService: RegistroService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ registro }) => {
      if (registro.id === undefined) {
        const today = dayjs().startOf('day');
        registro.horaIngreso = today;
        registro.horaSalida = today;
      }

      this.updateForm(registro);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const registro = this.createFromForm();
    if (registro.id !== undefined) {
      this.subscribeToSaveResponse(this.registroService.update(registro));
    } else {
      this.subscribeToSaveResponse(this.registroService.create(registro));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRegistro>>): void {
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

  protected updateForm(registro: IRegistro): void {
    this.editForm.patchValue({
      id: registro.id,
      horaIngreso: registro.horaIngreso ? registro.horaIngreso.format(DATE_TIME_FORMAT) : null,
      horaSalida: registro.horaSalida ? registro.horaSalida.format(DATE_TIME_FORMAT) : null,
    });
  }

  protected createFromForm(): IRegistro {
    return {
      ...new Registro(),
      id: this.editForm.get(['id'])!.value,
      horaIngreso: this.editForm.get(['horaIngreso'])!.value
        ? dayjs(this.editForm.get(['horaIngreso'])!.value, DATE_TIME_FORMAT)
        : undefined,
      horaSalida: this.editForm.get(['horaSalida'])!.value ? dayjs(this.editForm.get(['horaSalida'])!.value, DATE_TIME_FORMAT) : undefined,
    };
  }
}
