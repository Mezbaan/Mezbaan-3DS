import { Reservation } from '../../reservation/shared/reservation.model';
import { User } from '../../user/shared/user.model';

export class Rental {
  public static readonly CATEGORIES = ['apartment', 'house', 'condo']

  _id: string;
  title: string;
  city: string;
  street: string;
  category: string;
  image: string;
  bedrooms: number;
  description: string;
  dailyRate: number;
  createdAt: string;
  shared: boolean;
  reservations: Reservation[];
  user: User;
}
