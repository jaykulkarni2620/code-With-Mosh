const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3030;

app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect('mongodb://localhost:27017/user', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.log("Could not connect to MongoDB...", error));

const userSchema = new mongoose.Schema({
    name: String,
    lname: String,
});

const User = mongoose.model('user', userSchema);

// Create a new user
app.post('/users', async (req, res) => {
    try {
        const { name, lname } = req.body;
        const newUser = new User({ name, lname });
        console.log("name", name);
        console.log("lname", lname);
        const result = await newUser.save();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
