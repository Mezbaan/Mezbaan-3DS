import { Component, Input } from '@angular/core';
import { Reservation } from '../../../reservation/shared/reservation.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'bwm-manage-rentals-reservation',
  templateUrl: './manage-rentals-reservation.component.html',
  styleUrls: ['./manage-rentals-reservation.component.scss']
})
export class ManageRentalsReservationComponent {
  @Input() public reservations: Reservation[];

  constructor(public modalService: NgbModal){}
}
