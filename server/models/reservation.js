const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationShema = new Schema({
  date: Date,
  individualRate: Number,
  createdAt: {type: Date, default: Date.now},
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  venue: { type: Schema.Types.ObjectId, ref: 'Venue' },
});

module.exports = mongoose.model("Reservation", reservationShema);
