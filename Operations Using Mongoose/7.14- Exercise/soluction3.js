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

  //  Get all the published courses that are $15 or more , or have the word 'by'in their title


const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
  return await Course
  .find({ isPublished: true })
  .or([{ price: {$gte : 15 }},
       { name: /^by/}
])
  .sort({ price: -1 })
  .select('name', 'author' );
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
