const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const venueSchema = new Schema({
  name: String,
  address: String,
  placeId: String,
  dietaryCategories: String,
  picture: String,
  seats: Number,
  bio: String,
  individualRate: Number,
  dayOfTheWeek: String,
  shared: Boolean,
  createdAt: {type: Date, default: Date.now},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  reservations: [{ type: Schema.Types.ObjectId, ref: 'Reservation' }]
});

module.exports = mongoose.model("Venue", venueSchema);
