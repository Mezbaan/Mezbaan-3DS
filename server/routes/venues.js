const express = require("express");
const router = express.Router();
const Venue = require("../models/venue");
const User = require("../models/user");
const Auth = require("../controllers/auth");
const Reservation = require("../models/reservation");
const {normalizeErrors} = require("../helpers/mongoose-helper");

// TEST WITH AUTH MIDDLEWARE
router.get("", function(req, res) {
  const city = req.query.city;

  if (city) {
    Venue.find({city: city.toLowerCase()}).select('-reservations').exec(function(err, filteredVenues) {
      if (err || filteredVenues.length === 0 ) {
        return res.status(422).send({errors: [{title: 'No Venues found', detail: `There are no venues for city ${city}`}] });
      }

      res.json(filteredVenues);
    });
  } else {
      Venue.find({}).select('-reservations').exec(function(err, allVenues) {
      res.json(allVenues);
    });
  }
});

router.post("", Auth.authMiddleware, function(req, res) {
  // const { title, city, street, category, image, bedrooms, description, dailyRate } = req.body;
  console.log('hitting venue post route');
  
  const { name, address, placeid, dietarycategories, picture, seats, bio, individualRate } = req.body;
  const venue = new Venue({name, address, placeid, dietarycategories, picture, seats, bio, individualRate});
  const user = res.locals.user;
  venue.user = user;

  Venue.create(venue, function(err, newVenue) {
    if (err) {
      console.log('errors: ',err);
      return res.status(422).send({errors: normalizeErrors(err.errors) });
    } else {
      User.update({_id: user.id}, { $push: {venues: newVenue}}, function(){});
      res.status(200).send({});
    }
  });
});

router.get("/manage", Auth.authMiddleware, function(req, res) {
  const user = res.locals.user;

  Venue.where({user: user}).populate('reservations').exec(function(err, foundVenues){
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors) });
    }

    res.json(foundVenues);
  });
});

router.patch("/:id", Auth.authMiddleware, function(req, res) {

  const venueData = req.body;
  const user = res.locals.user;

  Venue.findById(req.params.id)
  .populate('user')
  .exec(function(err, foundVenue) {
     if (foundVenue.user.id !== user.id) {
      return res.status(422).send({errors: [{title: 'Invalid User', detail: "Update not allowed!"}] });
    }

    if (err) { return res.status(422).send({errors: normalizeErrors(err.errors)})};

    foundVenue.set(venueData);
    foundVenue.save(function(err) {
      if (err) { return res.status(422).send({errors: normalizeErrors(err.errors)})};

      return res.status(200).send(foundVenue);
    });
  });
});

router.delete("/:id", Auth.authMiddleware, function(req, res) {

  Venue.deleteOne({_id: req.params.id})
    .where({reservations: {$size: 0}})
    .exec(function(err, venue) {
      if (err) { return res.status(422).send({errors: normalizeErrors(err.errors) });}
      if (venue.n == 0) {
        return res.status(422).send({errors: [{title: 'Has reservations', detail: "Cannot delete venue with active reservations. Please contact support for more info"}] });
      }

      return res.status(200).send({success: "ok"});
  });
});


router.get("/:id", function(req, res) {
  Venue.findById(req.params.id).
    populate('user', 'email -_id').
    populate('reservations', 'startAt endAt -_id').
    exec(function(err, foundVenue) {
      res.json(foundVenue);
  });
});

module.exports = router;

