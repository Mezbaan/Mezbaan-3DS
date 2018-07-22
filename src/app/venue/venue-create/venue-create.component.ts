import { Component, OnInit } from '@angular/core';
import { Venue } from '../shared/venue.model';
import { VenueService } from '../shared/venue.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FileHolder } from "angular2-image-upload";

@Component({
  selector: 'bwm-venue-create-component',
  templateUrl: './venue-create.component.html'
})
export class VenueCreateComponent implements OnInit {
  public newVenue: Venue;
  public errors: any = [];
  public venueCategories = Venue.CATEGORIES;
  public venueDays = Venue.DAYS

  constructor(private venueService: VenueService,
              private router: Router) {}


  ngOnInit() {
    this.newVenue = new Venue();
  }

  createVenue() {
    console.log('hitting createVenue()');
    this.venueService.createVenue(this.newVenue).subscribe(
      () => {
        this.router.navigate(['/venues']);
      }, (errorsResponse: HttpErrorResponse) => {
        this.errors = errorsResponse.error.errors;
        console.log('this.errors: ',this.errors);
      });
  }

  onUploadFinished(file: FileHolder, sadad) {
    debugger;
    console.log(file);
  }

  onRemoved(file: FileHolder) {
    console.log(file);
  }

  onUploadStateChanged(state: boolean) {
    console.log(state);
  }
}
