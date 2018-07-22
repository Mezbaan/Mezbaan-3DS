import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { ManageVenuesComponent } from './manage-venues/manage-venues.component';
import { ManageReservationsComponent } from './manage-reservations/manage-reservations.component';
import { ManageComponent } from './manage.component';
import { ManageVenuesReservationComponent } from './manage-venues/manage-venues-reservation/manage-venues-reservation.component';

import { VenueService } from '../venue/shared/venue.service';
import { ReservationService } from '../reservation/shared/reservation.service';
import { AuthGuard } from '../shared/auth.guard';

const routes: Routes = [
  {
    path: 'manage',
    component: ManageComponent,
    children: [
      { path: 'venues', component: ManageVenuesComponent, canActivate: [AuthGuard] },
      { path: 'reservations', component: ManageReservationsComponent, canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [],
  declarations: [
    ManageComponent,
    ManageVenuesComponent,
    ManageVenuesReservationComponent,
    ManageReservationsComponent
  ],
  providers: [VenueService, ReservationService]
})
export class ManageModule {}
