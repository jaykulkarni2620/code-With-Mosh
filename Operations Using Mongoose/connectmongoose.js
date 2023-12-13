const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/playground')
.then(() => console.log("connected to mongoose"))
.catch(error => console.log("Could not connect to MongoDB...", error));

<<<<<<< HEAD

//schemas

const courseSchemas = new mongoose.Schema({

    name: String,
    author: String,
    tags: [String],
    date : { type: Date, default: Date.now },
    isPublished : Boolean


});
=======
// Schemas 

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
});

//model
const Course = mongoose.model('Course',courseSchema);

//saving document 

async function createCourse() {

    const course = new Course({
        name: "Angular-js",
        author: "jay",
        tags: ["Angular-js","frontend"],
        isPublished:true,
    });

    const result = await course.save();
    console.log("result",result);

}

createCourse();
>>>>>>> be38faec4a3e304028a1a8671f995bbce1cea060
