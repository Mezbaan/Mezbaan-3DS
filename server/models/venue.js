const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const venueSchema = new Schema({
  name: String,
  address: String,
  placeId: String,
  dietaryCategories: Array,
  picture: String,
  seats: Number,
  bio: String,
  individualRate: Number,
  shared: Boolean,
  createdAt: {type: Date, default: Date.now},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }]
});

module.exports = mongoose.model("Venue", venueSchema);
