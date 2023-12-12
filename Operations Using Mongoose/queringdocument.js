const { AsyncLocalStorage } = require('async_hooks');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/playground')
.then(() => console.log("connected to mongoose"))
.catch(error => console.log("Could not connect to MongoDB...", error));

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
        name: "React-js",
        author: "jay",
        tags: ["react-js","frontend"],
        isPublished:true,
    });

    const result = await course.save();
    // console.log("result",result);

}

createCourse()

// async function getCourses(){
//    const courses = Course.find();
//    console.log(courses);
// }

//with filter 

async function getCourses(){
    const courses = Course.find({ author:"jay", isPublished:true })
    // limits 
    .limit(10)
    //sort ascending order(1) and decending order(-1)
    .sort({name: 1 })
    // select 
    .select({ name: 1, tags: 1 });
    console.log(courses);
 };

getCourses();