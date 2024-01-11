const express = require('express');
const { Rental } = require('../models/rental');
const router = express.Router();


router.post('/', async (req, res) => {
    if(req.body.customerId) return res.status(400).send('Customer id not exist');
    if(req.body.movieId) return res.status(400).send('movie id not exist');

    res.status(401).send('Unauthorised');
  });

  module.exports = router