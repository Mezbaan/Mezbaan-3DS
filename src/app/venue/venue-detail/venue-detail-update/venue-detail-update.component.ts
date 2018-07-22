import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VenueService } from '../../shared/venue.service';
import { HelperService } from '../../../shared/service/helper.service';

import { Venue } from '../../shared/venue.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-venue-detail-update',
  templateUrl: './venue-detail-update.component.html',
  styleUrls: ['./venue-detail-update.component.scss']
})
export class VenueDetailUpdateComponent implements OnInit {

  public venue: Venue;

  public locationChanged$: Subject<any>;

  constructor(public venueService: VenueService,
              public route: ActivatedRoute,
              public helper: HelperService) {}

  ngOnInit() {
    this.locationChanged$ = new Subject();

    this.route.params.subscribe(params => {
      this.getVenueById(params['venueId']);
    });
  }

  getVenueById(id: string) {
    this.venueService.getVenueById(id).subscribe((venue) => {
      this.venue = venue;
    })
  }

  parseInt(value) {
    return parseInt(value);
  }

  updateVenue(id, venueData) {
    this.venueService.updateVenue(id, venueData).subscribe((venue) => {
      this.venue = venue;
      if (venueData.city || venueData.street) {
        this.locationChanged$.next(venue.city + ', ' + venue.street);
      }
    })
  }
}
