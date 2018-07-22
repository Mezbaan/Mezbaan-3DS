import { Booking } from '../../booking/shared/booking.model';
import { User } from '../../user/shared/user.model';

export class Venue {
  public static readonly CATEGORIES = ['Kosher', 'Gluten-Free', 'Keto', 'Vegetarian', 'Vegan', 'Peanut Allergy', 'GMO-Free', 'Locally Sourced', 'Pescatarian', 'Lactose-Free', 'Paleo']

  _id: string;
  name: String;
  address: String;
  placeId: String;
  dietaryCategories: String;
  picture: String;
  seats: number;
  bio: String;
  individualRate: number;
  createdAt: string;
  shared: boolean;
  bookings: Booking[];
  user: User;
}
