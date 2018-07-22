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
import { VenueDetailBookingComponent } from './venue-detail/venue-detail-booking/venue-detail-booking.component';
import { VenueCreateComponent } from './venue-create/venue-create.component';

import { VenueService } from './shared/venue.service';
import { BookingService } from '../booking/shared/booking.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
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
    EditableModule,
    ImageUploadModule,
  ],
  exports: [],
  declarations: [
    VenueComponent,
    VenueListComponent,
    VenueListDetailComponent,
    VenueDetailComponent,
    VenueDetailBookingComponent,
    VenueSearchComponent,
    VenueCreateComponent,
    VenueDetailUpdateComponent,
    VenueDetailInfoComponent
  ],
  providers: [VenueService, BookingService]
})
export class VenueModule {}
