import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FacturacionService } from '../service/facturacion.service';
import { IFacturacion, Facturacion } from '../facturacion.model';
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

import { FacturacionUpdateComponent } from './facturacion-update.component';

describe('Facturacion Management Update Component', () => {
  let comp: FacturacionUpdateComponent;
  let fixture: ComponentFixture<FacturacionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let facturacionService: FacturacionService;
  let registroService: RegistroService;
  let clienteService: ClienteService;
  let visitanteService: VisitanteService;
  let empleadoService: EmpleadoService;
  let formaDePagoService: FormaDePagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FacturacionUpdateComponent],
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
      .overrideTemplate(FacturacionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FacturacionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    facturacionService = TestBed.inject(FacturacionService);
    registroService = TestBed.inject(RegistroService);
    clienteService = TestBed.inject(ClienteService);
    visitanteService = TestBed.inject(VisitanteService);
    empleadoService = TestBed.inject(EmpleadoService);
    formaDePagoService = TestBed.inject(FormaDePagoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Registro query and add missing value', () => {
      const facturacion: IFacturacion = { id: 456 };
      const registro: IRegistro = { id: 48923 };
      facturacion.registro = registro;

      const registroCollection: IRegistro[] = [{ id: 5943 }];
      jest.spyOn(registroService, 'query').mockReturnValue(of(new HttpResponse({ body: registroCollection })));
      const additionalRegistros = [registro];
      const expectedCollection: IRegistro[] = [...additionalRegistros, ...registroCollection];
      jest.spyOn(registroService, 'addRegistroToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ facturacion });
      comp.ngOnInit();

      expect(registroService.query).toHaveBeenCalled();
      expect(registroService.addRegistroToCollectionIfMissing).toHaveBeenCalledWith(registroCollection, ...additionalRegistros);
      expect(comp.registrosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Cliente query and add missing value', () => {
      const facturacion: IFacturacion = { id: 456 };
      const cliente: ICliente = { id: 36239 };
      facturacion.cliente = cliente;

      const clienteCollection: ICliente[] = [{ id: 10784 }];
      jest.spyOn(clienteService, 'query').mockReturnValue(of(new HttpResponse({ body: clienteCollection })));
      const additionalClientes = [cliente];
      const expectedCollection: ICliente[] = [...additionalClientes, ...clienteCollection];
      jest.spyOn(clienteService, 'addClienteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ facturacion });
      comp.ngOnInit();

      expect(clienteService.query).toHaveBeenCalled();
      expect(clienteService.addClienteToCollectionIfMissing).toHaveBeenCalledWith(clienteCollection, ...additionalClientes);
      expect(comp.clientesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Visitante query and add missing value', () => {
      const facturacion: IFacturacion = { id: 456 };
      const visitante: IVisitante = { id: 79891 };
      facturacion.visitante = visitante;

      const visitanteCollection: IVisitante[] = [{ id: 90248 }];
      jest.spyOn(visitanteService, 'query').mockReturnValue(of(new HttpResponse({ body: visitanteCollection })));
      const additionalVisitantes = [visitante];
      const expectedCollection: IVisitante[] = [...additionalVisitantes, ...visitanteCollection];
      jest.spyOn(visitanteService, 'addVisitanteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ facturacion });
      comp.ngOnInit();

      expect(visitanteService.query).toHaveBeenCalled();
      expect(visitanteService.addVisitanteToCollectionIfMissing).toHaveBeenCalledWith(visitanteCollection, ...additionalVisitantes);
      expect(comp.visitantesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Empleado query and add missing value', () => {
      const facturacion: IFacturacion = { id: 456 };
      const empleado: IEmpleado = { id: 93339 };
      facturacion.empleado = empleado;

      const empleadoCollection: IEmpleado[] = [{ id: 82521 }];
      jest.spyOn(empleadoService, 'query').mockReturnValue(of(new HttpResponse({ body: empleadoCollection })));
      const additionalEmpleados = [empleado];
      const expectedCollection: IEmpleado[] = [...additionalEmpleados, ...empleadoCollection];
      jest.spyOn(empleadoService, 'addEmpleadoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ facturacion });
      comp.ngOnInit();

      expect(empleadoService.query).toHaveBeenCalled();
      expect(empleadoService.addEmpleadoToCollectionIfMissing).toHaveBeenCalledWith(empleadoCollection, ...additionalEmpleados);
      expect(comp.empleadosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call FormaDePago query and add missing value', () => {
      const facturacion: IFacturacion = { id: 456 };
      const formaDePago: IFormaDePago = { id: 15243 };
      facturacion.formaDePago = formaDePago;

      const formaDePagoCollection: IFormaDePago[] = [{ id: 12887 }];
      jest.spyOn(formaDePagoService, 'query').mockReturnValue(of(new HttpResponse({ body: formaDePagoCollection })));
      const additionalFormaDePagos = [formaDePago];
      const expectedCollection: IFormaDePago[] = [...additionalFormaDePagos, ...formaDePagoCollection];
      jest.spyOn(formaDePagoService, 'addFormaDePagoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ facturacion });
      comp.ngOnInit();

      expect(formaDePagoService.query).toHaveBeenCalled();
      expect(formaDePagoService.addFormaDePagoToCollectionIfMissing).toHaveBeenCalledWith(formaDePagoCollection, ...additionalFormaDePagos);
      expect(comp.formaDePagosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const facturacion: IFacturacion = { id: 456 };
      const registro: IRegistro = { id: 18988 };
      facturacion.registro = registro;
      const cliente: ICliente = { id: 55936 };
      facturacion.cliente = cliente;
      const visitante: IVisitante = { id: 38253 };
      facturacion.visitante = visitante;
      const empleado: IEmpleado = { id: 60698 };
      facturacion.empleado = empleado;
      const formaDePago: IFormaDePago = { id: 7290 };
      facturacion.formaDePago = formaDePago;

      activatedRoute.data = of({ facturacion });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(facturacion));
      expect(comp.registrosSharedCollection).toContain(registro);
      expect(comp.clientesSharedCollection).toContain(cliente);
      expect(comp.visitantesSharedCollection).toContain(visitante);
      expect(comp.empleadosSharedCollection).toContain(empleado);
      expect(comp.formaDePagosSharedCollection).toContain(formaDePago);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Facturacion>>();
      const facturacion = { id: 123 };
      jest.spyOn(facturacionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ facturacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: facturacion }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(facturacionService.update).toHaveBeenCalledWith(facturacion);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Facturacion>>();
      const facturacion = new Facturacion();
      jest.spyOn(facturacionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ facturacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: facturacion }));
      saveSubject.complete();

      // THEN
      expect(facturacionService.create).toHaveBeenCalledWith(facturacion);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Facturacion>>();
      const facturacion = { id: 123 };
      jest.spyOn(facturacionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ facturacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(facturacionService.update).toHaveBeenCalledWith(facturacion);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackRegistroById', () => {
      it('Should return tracked Registro primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackRegistroById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackClienteById', () => {
      it('Should return tracked Cliente primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackClienteById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackVisitanteById', () => {
      it('Should return tracked Visitante primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackVisitanteById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackEmpleadoById', () => {
      it('Should return tracked Empleado primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackEmpleadoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackFormaDePagoById', () => {
      it('Should return tracked FormaDePago primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackFormaDePagoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
