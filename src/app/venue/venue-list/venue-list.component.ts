import { Component, OnInit } from '@angular/core';
import { VenueService } from '../shared/venue.service';

import { Venue } from '../shared/venue.model';

@Component({
  selector: 'bwm-venue-list',
  templateUrl: './venue-list.component.html',
  styleUrls: ['venue-list.component.scss']
})
export class VenueListComponent implements OnInit {
  public venues: Venue[];

  constructor(public venueService: VenueService) {}

  ngOnInit() {
    this.venueService.getVenues().subscribe((venues: Venue[]) => {
      this.venues = venues;
    });
  }
}
