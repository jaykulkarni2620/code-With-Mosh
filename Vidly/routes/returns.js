const express = require('express');
const { Rental } = require('../models/rental');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const router = express.Router();
const moment = require('moment');
const { Movie } = require('../models/movie');
const Joi = require('joi');




router.post('/', [ auth, validate ], async (req, res) => {
    // if(!req.body.customerId) return res.status(400).send('Customer id not exist');
    // if(!req.body.movieId) return res.status(400).send('movie id not exist');

   // Refactoring 
    // const { error } = validateReturn(req.body); 
    // if (error) return res.status(400).send(error.details[0].message);
  

   const rental = await Rental.findOne({
      'customer._id': req.body.customerId,
      'movie._id': req.body.customerId,
    })

    if(!rental) return res.status(404).send('Rental not Found');
    if(rental.dateReturned) return res.status(400).send('Return Already process ');

    rental.dateReturned = new Date() ;
    const rentalDays =  moment().diff(rental.dateOut, 'days');
    rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;
   


    await Movie.update({ id: rental.movie._id}, {
      $inc: { numberInStock: 1 }
    })

    await rental.save();

    return res.status(200).send(rental);

  });

  function validateReturn(genre) {
    const schema = {
      customerId: Joi.ObjectId().required(),
      movieId: Joi.ObjectId().required()
    };
  
    return Joi.validate(genre, schema);
  }

  module.exports = router