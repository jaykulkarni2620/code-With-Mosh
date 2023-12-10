const express = require("express");
const bodyParser = require("body-parser");
const Joi = require ("joi");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.json());

app.use(express.json());

//as easy 
// const port = 3000;

const courses = [
    { id: 1 , name:"courses1"},
    { id: 2 , name:"courses2"},
    { id: 3 , name:"courses3"},
];


app.get('/api/courses', (req,res) => {
    res.send(courses);
});
  
app.put('api/courses/:id', (req,res) => {

    //Look up the course , If not existing , return 400
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(400).send("The Course With Given Id does not found");
   
    
    const { error } = validateCourse(req.body);
    //validate , if invalid , return 400 - Bad Request
    console.log(result);
    if (error) return res.status(400).send(error.details[0].message);
    

    //update course, return updated course"
        course.name = req.body.name;
        res.send(course);
  });

   function validateCourse (course){
    const scheme = {
        name: Joi.string().min(3).required()
    };
      return Joi.validate(course, scheme);
   }

  const port = process.env.PORT || 3000 ;

app.listen(port, () => console.log(`listening on port ${port}...`));