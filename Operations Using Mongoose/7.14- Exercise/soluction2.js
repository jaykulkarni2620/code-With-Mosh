const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises');

const courseSchema = new mongoose.Schema({
  name: String,
  author: String, 
  tags: [ String ],
  date: Date, 
  isPublished: Boolean,
  price: Number
});

    //get all published frontend and backend courses,sort them by price in desecnding order , pick only their names and author and display them 

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
  return await Course
  .find({ isPublished: true, tags: ['backend', 'frontend'] })
  .sort({ price: -1 })
  .select('name', 'author' );
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
