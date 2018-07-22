const express = require("express");
const router = express.Router();
const Reservation = require("../controllers/reservation");
const Auth = require("../controllers/auth");

router.post('/', Auth.authMiddleware, Reservation.createReservation)

router.get('/arrange', Auth.authMiddleware, Reservation.getUserReservations);

module.exports = router;
