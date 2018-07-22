import { Venue } from '../../venue/shared/venue.model';
import { User } from '../../user/shared/user.model';

export class Reservation {
  _id: string;
  startAt: string;
  endAt: string;
  price: number;
  guests: number;
  date: string;
  createdAt: string;
  venue: Venue;
  user: User;
}
