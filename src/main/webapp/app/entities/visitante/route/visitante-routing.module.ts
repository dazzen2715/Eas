import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { VisitanteComponent } from '../list/visitante.component';
import { VisitanteDetailComponent } from '../detail/visitante-detail.component';
import { VisitanteUpdateComponent } from '../update/visitante-update.component';
import { VisitanteRoutingResolveService } from './visitante-routing-resolve.service';
import { Authority } from '../../../config/authority.constants';

const visitanteRoute: Routes = [
  {
    path: '',
    component: VisitanteComponent,
    data: {
      authorities: [Authority.ADMIN, Authority.CELADOR],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: VisitanteDetailComponent,
    resolve: {
      visitante: VisitanteRoutingResolveService,
    },
    data: {
      authorities: [Authority.ADMIN, Authority.CELADOR],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: VisitanteUpdateComponent,
    resolve: {
      visitante: VisitanteRoutingResolveService,
    },
    data: {
      authorities: [Authority.ADMIN, Authority.CELADOR],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: VisitanteUpdateComponent,
    resolve: {
      visitante: VisitanteRoutingResolveService,
    },
    data: {
      authorities: [Authority.ADMIN, Authority.CELADOR],
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(visitanteRoute)],
  exports: [RouterModule],
})
export class VisitanteRoutingModule {}
