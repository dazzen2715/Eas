import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EmpleadoComponent } from '../list/empleado.component';
import { EmpleadoDetailComponent } from '../detail/empleado-detail.component';
import { EmpleadoUpdateComponent } from '../update/empleado-update.component';
import { EmpleadoRoutingResolveService } from './empleado-routing-resolve.service';
import { Authority } from '../../../config/authority.constants';

const empleadoRoute: Routes = [
  {
    path: '',
    component: EmpleadoComponent,
    data: {
      authorities: [Authority.ADMIN],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EmpleadoDetailComponent,
    resolve: {
      empleado: EmpleadoRoutingResolveService,
    },
    data: {
      authorities: [Authority.ADMIN],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EmpleadoUpdateComponent,
    resolve: {
      empleado: EmpleadoRoutingResolveService,
    },
    data: {
      authorities: [Authority.ADMIN],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EmpleadoUpdateComponent,
    resolve: {
      empleado: EmpleadoRoutingResolveService,
    },
    data: {
      authorities: [Authority.ADMIN],
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(empleadoRoute)],
  exports: [RouterModule],
})
export class EmpleadoRoutingModule {}
