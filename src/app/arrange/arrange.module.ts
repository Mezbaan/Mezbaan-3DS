import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { ArrangeVenuesComponent } from './arrange-venues/arrange-venues.component';
import { ArrangeReservationsComponent } from './arrange-reservations/arrange-reservations.component';
import { ArrangeComponent } from './arrange.component';
import { ArrangeVenuesReservationComponent } from './arrange-venues/arrange-venues-reservation/arrange-venues-registration.component';

import { VenueService } from '../venue/shared/venue.service';
import { ReservationService } from '../reservation/shared/reservation.service';
import { AuthGuard } from '../shared/auth.guard';

const routes: Routes = [
  {
    path: 'arrange',
    component: ArrangeComponent,
    children: [
      { path: 'venues', component: ArrangeVenuesComponent, canActivate: [AuthGuard] },
      { path: 'reservations', component: ArrangeReservationsComponent, canActivate: [AuthGuard] },
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
    ArrangeComponent,
    ArrangeVenuesComponent,
    ArrangeVenuesReservationComponent,
    ArrangeReservationComponent
  ],
  providers: [VenueService, ReservationService]
})
export class ArrangeModule {}
