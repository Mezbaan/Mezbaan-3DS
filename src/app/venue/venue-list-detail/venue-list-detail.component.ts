import { Component, OnInit, Input } from '@angular/core';
import { Venue } from '../shared/venue.model';
import { HelperService } from '../../shared/service/helper.service';

@Component({
  selector: 'bwm-venue-list-detail',
  templateUrl: './venue-list-detail.component.html',
  styleUrls: ['venue-list-detail.component.scss']
})
export class VenueListDetailComponent {
  @Input() venue: Venue;

  constructor(public helper: HelperService){}
}
