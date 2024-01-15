const express = require('express');
const { Rental } = require('../models/rental');
const auth = require('../middleware/auth');
const router = express.Router();
const moment = require('moment');


router.post('/', auth, async (req, res) => {
    if(!req.body.customerId) return res.status(400).send('Customer id not exist');
    if(!req.body.movieId) return res.status(400).send('movie id not exist');

   const rental = await Rental.findOne({
      'customer._id': req.body.customerId,
      'movie._id': req.body.customerId,
    })

    if(!rental) return res.status(404).send('Rental not Found');
    if(rental.dateReturned) return res.status(400).send('Return Already process ');

    rental.dateReturned = new Date() ;

    const rentalDays =  moment().diff(rental.dateOut, 'days');

    rental.rentalFee = rentalDays * rental.movie.dailyRentalRate

    await rental.save();

    return res.status(200).send();

  });

  module.exports = router