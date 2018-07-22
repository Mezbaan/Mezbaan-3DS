import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VenueService } from '../shared/venue.service';
import { HelperService } from '../../shared/service/helper.service';

import { Venue } from '../shared/venue.model';

@Component({
  selector: 'bwm-venue-detail',
  templateUrl: './venue-detail.component.html',
  styleUrls: ['venue-detail.component.scss']
})
export class VenueDetailComponent implements OnInit {
  public venue: Venue;

  constructor(public venueService: VenueService,
              public route: ActivatedRoute,
              public helper: HelperService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getVenueById(params['venueId']);
    });
  }

  getVenueById(id: string) {
    this.venueService.getVenueById(id).subscribe((venue) => {
      this.venue = venue;
    })
  }
}
