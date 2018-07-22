const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationShema = new Schema({
  date: {type: Date},
  price: Number,
  createdAt: {type: Date, default: Date.now},
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  rental: { type: Schema.Types.ObjectId, ref: 'Rental' },
  venue: { type: Schema.Types.ObjectId, ref: 'Venue' }
});

module.exports = mongoose.model("Reservation", reservationShema);
