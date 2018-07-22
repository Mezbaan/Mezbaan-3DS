import { Component, OnInit, Input } from '@angular/core';
import { Venue } from '../../shared/venue.model';

@Component({
  selector: 'bwm-venue-detail-info',
  templateUrl: './venue-detail-info.component.html',
  styleUrls: ['./venue-detail-info.component.scss']
})
export class VenueDetailInfoComponent {

  @Input() public venue: Venue;

  constructor() {}
}
