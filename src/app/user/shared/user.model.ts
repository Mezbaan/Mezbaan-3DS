import { Rental } from '../../rental/shared/rental.model';
import { Reservation } from '../../reservation/shared/reservation.model';

export interface User {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  reservations: Reservation[];
  rentals: Rental[];
}

export function userFactory(username?: string,
                            email?: string,
                            password?: string,
                            passwordConfirmation?:string,
                            rentals?:Rental[],
                            reservations?:Reservation[] ): User {
  return {
    username,
    email,
    password,
    passwordConfirmation,
    rentals,
    reservations
  }
}
