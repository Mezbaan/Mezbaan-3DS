import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../reservation/shared/reservation.model';
import { ReservationService } from '../../reservation/shared/reservation.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'bwm-manage-reservations',
  templateUrl: './manage-reservations.component.html',
  styleUrls: ['./manage-reservations.component.scss']
})
export class ManageReservationsComponent implements OnInit {
  public reservations: Reservation[];
  public errors: any;

  constructor(private reservationService: ReservationService){}

  ngOnInit() {
    this.reservationService.getCurrentUserReservations().subscribe((reservations: Reservation[]) => {
      this.reservations = reservations;
    }, (errorsResponse: HttpErrorResponse) => {
      this.errors = errorsResponse.error.errors;
    });
  }
}
