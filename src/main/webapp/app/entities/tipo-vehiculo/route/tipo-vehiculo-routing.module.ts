import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TipoVehiculoComponent } from '../list/tipo-vehiculo.component';
import { TipoVehiculoDetailComponent } from '../detail/tipo-vehiculo-detail.component';
import { TipoVehiculoUpdateComponent } from '../update/tipo-vehiculo-update.component';
import { TipoVehiculoRoutingResolveService } from './tipo-vehiculo-routing-resolve.service';
import { Authority } from '../../../config/authority.constants';

const tipoVehiculoRoute: Routes = [
  {
    path: '',
    component: TipoVehiculoComponent,
    data: {
      authorities: [Authority.ADMIN, Authority.CELADOR],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipoVehiculoDetailComponent,
    resolve: {
      tipoVehiculo: TipoVehiculoRoutingResolveService,
    },
    data: {
      authorities: [Authority.ADMIN, Authority.CELADOR],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipoVehiculoUpdateComponent,
    resolve: {
      tipoVehiculo: TipoVehiculoRoutingResolveService,
    },
    data: {
      authorities: [Authority.ADMIN, Authority.CELADOR],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipoVehiculoUpdateComponent,
    resolve: {
      tipoVehiculo: TipoVehiculoRoutingResolveService,
    },
    data: {
      authorities: [Authority.ADMIN, Authority.CELADOR],
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(tipoVehiculoRoute)],
  exports: [RouterModule],
})
export class TipoVehiculoRoutingModule {}
