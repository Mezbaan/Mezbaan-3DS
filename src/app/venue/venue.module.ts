import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MapModule } from '../shared/component/map/map.module';
import { ImageUploadModule } from "../shared/component/image-upload/image-upload.module";

import { Daterangepicker } from 'ng2-daterangepicker';

import { VenueComponent } from './venue.component';
import { VenueListComponent } from './venue-list/venue-list.component';
import { VenueListDetailComponent } from './venue-list-detail/venue-list-detail.component';
import { VenueSearchComponent } from './venue-search/venue-search.component';
import { VenueDetailComponent } from './venue-detail/venue-detail.component';
import { VenueDetailReservationComponent } from './venue-detail/venue-detail-reservation/venue-detail-reservation.component';
import { VenueCreateComponent } from './venue-create/venue-create.component';

import { FormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';

import { VenueService } from './shared/venue.service';
import { ReservationService } from '../reservation/shared/reservation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditableModule } from '../shared/component/editable/editable.module';

import { AuthGuard } from '../shared/auth.guard';
import { VenueDetailUpdateComponent } from './venue-detail/venue-detail-update/venue-detail-update.component';
import { VenueDetailInfoComponent } from './venue-detail/venue-detail-info/venue-detail-info.component';

const routes: Routes = [
  {
    path: 'venues',
    component: VenueComponent,
    children: [
      { path: '', component: VenueListComponent },
      { path: 'new', component: VenueCreateComponent, canActivate: [AuthGuard] },
      { path: ':venueId/edit', component: VenueDetailUpdateComponent },
      { path: ':venueId', component: VenueDetailComponent },
      { path: ':city/homes', component: VenueSearchComponent }
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
    FormsModule,
    MyDatePickerModule,
    EditableModule,
    ImageUploadModule,
  ],
  exports: [],
  declarations: [
    VenueComponent,
    VenueListComponent,
    VenueListDetailComponent,
    VenueDetailComponent,
    VenueDetailReservationComponent,
    VenueSearchComponent,
    VenueCreateComponent,
    VenueDetailUpdateComponent,
    VenueDetailInfoComponent
  ],
  providers: [VenueService, ReservationService]
})
export class VenueModule {}
