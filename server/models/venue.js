const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const venueSchema = new Schema({
  name: String,
  address: String,
  dietaryCategory: String,
  picture: String,
  seats: Number,
  bio: String,
  price: Number,
  dayOfTheWeek: String,
  createdAt: {type: Date, default: Date.now},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  reservations: [{ type: Schema.Types.ObjectId, ref: 'Reservation' }]
});

module.exports = mongoose.model("Venue", venueSchema);
