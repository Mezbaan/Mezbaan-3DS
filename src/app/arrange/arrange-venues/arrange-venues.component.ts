import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Venue } from '../../venue/shared/venue.model';
import { VenueService } from '../../venue/shared/venue.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'bwm-arrange-venues',
  templateUrl: './arrange-venues.component.html',
  styleUrls: ['./arrange-venues.component.scss']
})
export class ArrangeVenuesComponent implements OnInit {
  public venues: Venue[];
  public errors: any;

  constructor(private venueService: VenueService,
              public toastr: ToastsManager,
              public vcr: ViewContainerRef,
              public router: Router,){

    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.rentalService.getCurrentUserRentals().subscribe((venues: Venue[]) => {
      this.venues = venues;
    }, (errorsResponse: HttpErrorResponse) => {
      this.errors = errorsResponse.error.errors;
    });
  }

  removeVenueFromView(venueId: string) {
    const index = this.venues.findIndex(venue => venue._id == rentalId);
    this.venue.splice(index, 1);
  }

  goToUpdate(venueId): any {
    this.router.navigate([`/venues/${venueId}/edit`]);
  }

  deleteVenue(venue): any {
    this.venueService.deleteById(venue._id).subscribe(
      () => {
        this.removeVenueFromView(venue._id);
      },
      (errorsResponse: HttpErrorResponse) => {
        this.toastr.error(errorsResponse.error.errors[0].detail, 'Failed!');
      });
  }
}