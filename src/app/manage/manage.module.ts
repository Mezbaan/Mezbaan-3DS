import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { ManageRentalsComponent } from './manage-rentals/manage-rentals.component';
import { ManageReservationsComponent } from './manage-reservations/manage-reservations.component';
import { ManageComponent } from './manage.component';
import { ManageRentalsReservationComponent } from './manage-rentals/manage-rentals-reservation/manage-rentals-reservation.component';

import { RentalService } from '../rental/shared/rental.service';
import { ReservationService } from '../reservation/shared/reservation.service';
import { AuthGuard } from '../shared/auth.guard';

const routes: Routes = [
  {
    path: 'manage',
    component: ManageComponent,
    children: [
      { path: 'rentals', component: ManageRentalsComponent, canActivate: [AuthGuard] },
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
    ManageRentalsComponent,
    ManageRentalsReservationComponent,
    ManageReservationsComponent
  ],
  providers: [RentalService, ReservationService]
})
export class ManageModule {}
