const Reservation = require("../models/reservation");
const Venue = require("../models/venue");
const User = require("../models/user");
const {normalizeErrors} = require("../helpers/mongoose-helper");
const moment = require('moment');

exports.createReservation = function(req, res, next) {
  const { startAt, endAt, totalPrice, days, guests, venueId, venue } = req.body;
  const user = res.locals.user;
  const reservation = new Reservation({startAt, endAt, totalPrice, days, guests});

  Venue.findById(venue._id).populate('reservations').populate('user').exec(function(err, foundvenue) {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors) });
    }

    if (foundVenue.user.id === user.id) {
      return res.status(422).send({errors: [{title: 'Invalid User', detail: "Cannot create reservation on your venue"}] });
    }

    if (isValidReservation(reservation, foundVenue)) {
      reservation.user = user;
      reservation.venue = foundVenue;
      foundVenue.reservations.push(reservation);

      User.update({_id: user.id}, { $push: {reservations: reservation}}, function(){});
      reservation.save();
      foundVenue.save();

      return res.json({startAt: reservation.startAt, endAt: reservation.endAt});
    } else {
      return res.status(422).send({errors: [{title: 'Invalid Reservation', detail: "Choosen dates are already taken"}] });
    }
  })
}

exports.getUserReservations = function(req, res, next) {
  const user = res.locals.user;

  Reservation.where({user: user}).populate('venue').exec(function(err, foundReservations){
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors) });
    }

    res.json(foundReservations);
  });
}

function isValidReservation(proposedReservation, venue) {
  let isValid = true;

  if (venue.reservations && venue.reservations.length > 0) {
    isValid = venue.reservations.every(function(reservation) {
      const proposedStart = moment(proposedReservation.startAt);
      const proposedEnd = moment(proposedReservation.endAt);
      const actualStart = moment(reservation.startAt);
      const actualEnd = moment(reservation.endAt);

      return ((actualStart < proposedStart && actualEnd < proposedStart) || (proposedEnd < actualEnd && proposedEnd < actualStart));
    });
  }

  return isValid;
}


