import { Reservation } from '../../reservation/shared/reservation.model';
import { User } from '../../user/shared/user.model';

export class Venue {
  public static readonly CATEGORIES = ['Kosher', 'Gluten-Free', 'Halal', 'Keto', 'Vegetarian', 'Vegan', 'Peanut Allergy', 'GMO-Free', 'Locally Sourced', 'Pescatarian', 'Lactose-Free', 'Paleo']

  public static readonly DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  _id: string;
  name: String;
  address: String;
  dietaryCategory: String;
  picture: String;
  seats: number;
  bio: String;
  price: number;
  dayOfTheWeek: number
  createdAt: string;
  reservations: Reservation[];
  user: User;
}
