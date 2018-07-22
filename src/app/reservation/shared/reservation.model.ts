import { Venue } from '../../venue/shared/venue.model';
import { User } from '../../user/shared/user.model';

export class Reservation {
  _id: string;
  date: string;
  individualRate: number;
  guests: number;
  createdAt: string;
  venue: Venue;
  user: User;
}
