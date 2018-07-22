import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venue } from './venue.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VenueService {

  constructor(private http: HttpClient) { }

  public getVenues(): Observable<any> {
    return this.http.get('/api/v1/venues');
  }

  public getVenueById(id: string): Observable<any> {
    return this.http.get(`/api/v1/venues/${id}`);
  }

  public deleteById(id: string): Observable<any> {
    return this.http.delete(`/api/v1/venues/${id}`);
  }

  public searchVenues(city): Observable<any> {
    return this.http.get(`/api/v1/venues?city=${city}`);
  }

  public createVenue(venue: Venue): Observable<any> {
    return this.http.post('/api/v1/venues', venue);
  }

  public getCurrentUserVenues(): Observable<any> {
    return this.http.get('/api/v1/venues/manage');
  }

  public updateVenue(id, venue): Observable<any> {
    return this.http.patch(`api/v1/venues/${id}`, venue);
  }
}
