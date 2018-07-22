import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from './reservation.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReservationService {

  constructor(private http: HttpClient) { }

  makeReservation(reservation: Reservation): Observable<any> {
    return this.http.post('/api/v1/reservations', reservation);
  }

  getCurrentUserReservations(): Observable<any> {
    return this.http.get('/api/v1/reservations/manage');
  }
}
