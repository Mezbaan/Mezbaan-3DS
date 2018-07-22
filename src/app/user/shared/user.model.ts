import { Rental } from '../../rental/shared/rental.model';
import { Booking } from '../../booking/shared/booking.model';
import { Venue } from '../../venue/shared/venue.model';
import { Reservation } from '../../reservation/shared/reservation.model';

export interface User {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  dietaryCategory: String;
  bio: String;
  avatarUrl: String;
  bookings: Booking[];
  rentals: Rental[];
  venues: Venue[];
  reservations:Reservation[];
}

export function userFactory(username?: string,
                            email?: string,
                            password?: string,
                            passwordConfirmation?: string,
                            dietaryCategory?: string,
                            bio?: string,
                            avatarUrl?: string,
                            rentals?:Rental[],
                            venues?:Venue[],
                            reservations?:Reservation[],
                            bookings?:Booking[] ): User {
  return {
    username,
    email,
    password,
    passwordConfirmation,
    rentals,
    bookings,
    venues,
    reservations,
    bio,
    dietaryCategory,
    avatarUrl
  }
}
