import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RegistroComponent } from '../list/registro.component';
import { RegistroDetailComponent } from '../detail/registro-detail.component';
import { RegistroUpdateComponent } from '../update/registro-update.component';
import { RegistroRoutingResolveService } from './registro-routing-resolve.service';
import { Authority } from '../../../config/authority.constants';

const registroRoute: Routes = [
  {
    path: '',
    component: RegistroComponent,
    data: {
      authorities: [Authority.ADMIN, Authority.CELADOR],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RegistroDetailComponent,
    resolve: {
      registro: RegistroRoutingResolveService,
    },
    data: {
      authorities: [Authority.ADMIN, Authority.CELADOR],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RegistroUpdateComponent,
    resolve: {
      registro: RegistroRoutingResolveService,
    },
    data: {
      authorities: [Authority.ADMIN, Authority.CELADOR],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RegistroUpdateComponent,
    resolve: {
      registro: RegistroRoutingResolveService,
    },
    data: {
      authorities: [Authority.ADMIN, Authority.CELADOR],
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(registroRoute)],
  exports: [RouterModule],
})
export class RegistroRoutingModule {}
