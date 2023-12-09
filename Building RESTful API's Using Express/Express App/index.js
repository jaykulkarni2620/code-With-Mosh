const express = require("express");
const bodyParser = require("body-parser");
const Joi = require ("joi");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.json());


//as easy 
// const port = 3000;

const courses = [
    { id: 1 , name:"courses1"},
    { id: 2 , name:"courses2"},
    { id: 3 , name:"courses3"},
];

app.get('/', (req,res) => {
    res.send("Hello World");
});


//x-x-x-x-x-x-x-x-x-x-x-x-x-x-x  Validation logic x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x
app.post('/api/courses/', (req,res) => {
    
    //Using joi 

    const scheme = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, scheme);
    console.log(result);
    if (result.error) {
       res.status(400).send(result.error.details[0].message);
    }

    // if (!req.body.name || req.body.name.length < 3 ) {
    //      res.status(400).send("Name is required and should be minimum 3 character");
    //         return;
    //     };
    
    
    const newCourse = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(newCourse);
    res.send(newCourse);
  });

  const port = process.env.PORT || 3000 ;

app.listen(port, () => console.log(`listening on port ${port}...`));