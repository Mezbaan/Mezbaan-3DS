import { Component, Input } from '@angular/core';
import { Reservation } from '../../../reservation/shared/reservation.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'bwm-manage-venues-reservation',
  templateUrl: './manage-venues-reservation.component.html',
  styleUrls: ['./manage-venues-reservation.component.scss']
})
export class ManageVenuesReservationComponent {
  @Input() public reservations: Reservation[];

  constructor(public modalService: NgbModal){}
}
