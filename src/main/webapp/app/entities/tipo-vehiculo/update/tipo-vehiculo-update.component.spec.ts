import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TipoVehiculoService } from '../service/tipo-vehiculo.service';
import { ITipoVehiculo, TipoVehiculo } from '../tipo-vehiculo.model';

import { TipoVehiculoUpdateComponent } from './tipo-vehiculo-update.component';

describe('TipoVehiculo Management Update Component', () => {
  let comp: TipoVehiculoUpdateComponent;
  let fixture: ComponentFixture<TipoVehiculoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tipoVehiculoService: TipoVehiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TipoVehiculoUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(TipoVehiculoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TipoVehiculoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tipoVehiculoService = TestBed.inject(TipoVehiculoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const tipoVehiculo: ITipoVehiculo = { id: 456 };

      activatedRoute.data = of({ tipoVehiculo });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(tipoVehiculo));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TipoVehiculo>>();
      const tipoVehiculo = { id: 123 };
      jest.spyOn(tipoVehiculoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoVehiculo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoVehiculo }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(tipoVehiculoService.update).toHaveBeenCalledWith(tipoVehiculo);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TipoVehiculo>>();
      const tipoVehiculo = new TipoVehiculo();
      jest.spyOn(tipoVehiculoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoVehiculo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoVehiculo }));
      saveSubject.complete();

      // THEN
      expect(tipoVehiculoService.create).toHaveBeenCalledWith(tipoVehiculo);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TipoVehiculo>>();
      const tipoVehiculo = { id: 123 };
      jest.spyOn(tipoVehiculoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoVehiculo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tipoVehiculoService.update).toHaveBeenCalledWith(tipoVehiculo);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
