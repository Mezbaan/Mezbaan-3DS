import { Component, OnInit, Input } from '@angular/core';
import { Venue } from '../../shared/venue.model';
import { HelperService } from '../../../shared/service/helper.service';

@Component({
  selector: 'bwm-venue-detail-info',
  templateUrl: './venue-detail-info.component.html',
  styleUrls: ['./venue-detail-info.component.scss']
})
export class VenueDetailInfoComponent {

  @Input() public venue: Venue;

  constructor(public helper: HelperService) {}
}
