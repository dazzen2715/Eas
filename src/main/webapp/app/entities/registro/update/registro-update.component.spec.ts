import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RegistroService } from '../service/registro.service';
import { IRegistro, Registro } from '../registro.model';

import { RegistroUpdateComponent } from './registro-update.component';

describe('Registro Management Update Component', () => {
  let comp: RegistroUpdateComponent;
  let fixture: ComponentFixture<RegistroUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let registroService: RegistroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [RegistroUpdateComponent],
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
      .overrideTemplate(RegistroUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RegistroUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    registroService = TestBed.inject(RegistroService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const registro: IRegistro = { id: 456 };

      activatedRoute.data = of({ registro });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(registro));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Registro>>();
      const registro = { id: 123 };
      jest.spyOn(registroService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ registro });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: registro }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(registroService.update).toHaveBeenCalledWith(registro);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Registro>>();
      const registro = new Registro();
      jest.spyOn(registroService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ registro });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: registro }));
      saveSubject.complete();

      // THEN
      expect(registroService.create).toHaveBeenCalledWith(registro);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Registro>>();
      const registro = { id: 123 };
      jest.spyOn(registroService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ registro });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(registroService.update).toHaveBeenCalledWith(registro);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
