const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');
const mongoose = require('mongoose');

const app = express();
const port = 3030;

app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect('mongodb://localhost:27017/user', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.log("Could not connect to MongoDB...", error));

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('user', userSchema);

// Joi validation schema
const joiUserSchema = Joi.object({
    name: Joi.string().min(3).required(),
    lname: Joi.string().min(3).required(),
});

// Create a new user
app.post('/users', async (req, res) => {
    try {
         // Validate request data using Joi
         const { error } = joiUserSchema.validate(req.body);
         if (error) {
             return res.status(400).json({ error: error.details[0].message });
         }

        const { name, lname } = req.body;
        const newUser = new User({ name, lname });
        const result = await newUser.save();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        if (!users) return res.status(400).send("there is no data in database");
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//read particular user
app.get('/users/:id', async (req,res) => {
    try{
        const user = await User.findById(req.params.id);
        if (!user) return res.status(400).send("the given user id is not exist in databas.");
        res.json(user);
        console.log("reqParams",req.params.id);
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a user by ID
app.put('/users/:id', async (req, res) => {
    try{
        const { error } = joiUserSchema.validate(req.body);
        if(error){
            return res.status(400).json({ error: error.details[0].message });
        };
        const { name, lname} = req.body;
        const updateUser = await User.findByIdAndUpdate(req.params.id,  { name, lname},  { new: true });
        if (!updateUser) return res.status(400).send("the given user id is not exist in databas.");
        res.send(updateUser);
    } catch (error) {
        res.status(500).json( {error: error.message });
    }
});

//delete user by id 

app.delete('/users/:id', async( req, res ) => {
    try{
        const delteUser = await User.findByIdAndDelete(req.params.id);
        if (!delteUser) return res.status(400).send("the given user id is not exist in databas.");
        res.send(delteUse);

    } catch (error) {
        res.status(500).json( {error: error.message});
        console.log("ERROR:",error);
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
