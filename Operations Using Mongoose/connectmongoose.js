const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/playground')
.then(() => console.log("connected to mongoose"))
.catch(error => console.log("Could not connect to MongoDB...", error));


//schemas

const courseSchemas = new mongoose.Schema({

    name: String,
    author: String,
    tags: [String],
    date : { type: Date, default: Date.now },
    isPublished : Boolean


});