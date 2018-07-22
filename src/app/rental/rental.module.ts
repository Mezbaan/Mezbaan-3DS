import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MapModule } from '../shared/component/map/map.module';
import { ImageUploadModule } from "../shared/component/image-upload/image-upload.module";

import { Daterangepicker } from 'ng2-daterangepicker';

import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListDetailComponent } from './rental-list-detail/rental-list-detail.component';
import { RentalSearchComponent } from './rental-search/rental-search.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalDetailReservationComponent } from './rental-detail/rental-detail-reservation/rental-detail-reservation.component';
import { RentalCreateComponent } from './rental-create/rental-create.component';

import { RentalService } from './shared/rental.service';
import { ReservationService } from '../reservation/shared/reservation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditableModule } from '../shared/component/editable/editable.module';

import { AuthGuard } from '../shared/auth.guard';
import { RentalDetailUpdateComponent } from './rental-detail/rental-detail-update/rental-detail-update.component';
import { RentalDetailInfoComponent } from './rental-detail/rental-detail-info/rental-detail-info.component';

const routes: Routes = [
  {
    path: 'rentals',
    component: RentalComponent,
    children: [
      { path: '', component: RentalListComponent },
      { path: 'new', component: RentalCreateComponent, canActivate: [AuthGuard] },
      { path: ':rentalId/edit', component: RentalDetailUpdateComponent },
      { path: ':rentalId', component: RentalDetailComponent },
      { path: ':city/homes', component: RentalSearchComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ToastModule.forRoot(),
    SharedModule,
    MapModule,
    Daterangepicker,
    BrowserAnimationsModule,
    EditableModule,
    ImageUploadModule,
  ],
  exports: [],
  declarations: [
    RentalComponent,
    RentalListComponent,
    RentalListDetailComponent,
    RentalDetailComponent,
    RentalDetailReservationComponent,
    RentalSearchComponent,
    RentalCreateComponent,
    RentalDetailUpdateComponent,
    RentalDetailInfoComponent
  ],
  providers: [RentalService, ReservationService]
})
export class RentalModule {}
