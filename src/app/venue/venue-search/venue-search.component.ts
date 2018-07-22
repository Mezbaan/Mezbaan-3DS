import { Component, OnInit } from '@angular/core';
import { VenueService } from '../shared/venue.service';
import { HelperService } from '../../shared/service/helper.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Venue } from '../shared/venue.model';

@Component({
  selector: 'bwm-venue-search',
  templateUrl: './venue-search.component.html'
})
export class VenueSearchComponent implements OnInit {
  public venues: Venue[];
  public city: string;
  public errors: any;

  constructor(public venueService: VenueService,
              public helper: HelperService,
              public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.city = params['city'];
      this.getSearchedVenues(params['city']);
    });
  }

  getSearchedVenues(city: string) {
    this.errors = [];

    this.venueService.searchVenues(city).subscribe(
      venues => {
        this.venues = venues;
      }, (errorsResponse: HttpErrorResponse) => {
        this.venues = [];
        this.errors = errorsResponse.error.errors;
      });
  }
}
