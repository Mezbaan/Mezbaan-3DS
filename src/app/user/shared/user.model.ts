import { Reservation } from '../../reservation/shared/reservation.model';
import { Venue } from '../../venue/shared/venue.model';

export interface User {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  reservations: Reservation[];
  venues: Venue[];
}

export function userFactory(username?: string,
                            email?: string,
                            password?: string,
                            passwordConfirmation?:string,
                            venues?:Venue[],
                            reservations?:Reservation[] ): User {
  return {
    username,
    email,
    password,
    passwordConfirmation,
    venues,
    reservations
  }
}
