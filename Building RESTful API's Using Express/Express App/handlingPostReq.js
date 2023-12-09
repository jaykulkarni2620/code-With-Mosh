const express = require("express");
const bodyParser = require("body-parser");
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

app.post('/api/courses/', (req,res) => {
    const newCourse = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(newCourse);
    res.send(newCourse);
  });

  const port = process.env.PORT || 3000 ;

app.listen(port, () => console.log(`listening on port ${port}...`));