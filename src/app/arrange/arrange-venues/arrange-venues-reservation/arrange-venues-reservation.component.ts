import { Component, Input } from '@angular/core';
import { Reservation } from '../../../reservation/shared/reservation.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'bwm-arrange-venues-reservation',
  templateUrl: './arrange-venues-reservation.component.html',
  styleUrls: ['./arrange-venues-reservation.component.scss']
})
export class ArrangeVenuesReservationComponent {
  @Input() public reservations: Reservation[];

  constructor(public modalService: NgbModal){}
}
