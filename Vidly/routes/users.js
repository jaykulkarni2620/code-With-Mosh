const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    //checking that user passing correct data or not in ody
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.message);

    // the user already exist in dataase or notusing findoOne cz we cannot find y "id"
    let user = await User.findOne({ email: req.body.email});
    if(user) return res.status(400).send("user is already resgister");  

    // if user is not register
    user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    await user.save();
    res.send({
        name: User.name,
        email: User.email
    }
   );
});

module.exports = router; 