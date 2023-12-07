const express = require("express");
const app = express();

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

app.get('/api/courses', (req,res) => {
    res.send(courses);
});


app.get('/api/courses/:id', (req,res) => {
  const course = courses.find( c => c.id === parseInt(req.params.id));
  if(!course)res.status(404).send("The course with given id doesn't found");
  res.send(course);
  console.log(req.params.id);
   
});





//port 

const port = process.env.PORT || 3000 ;

app.listen(port, () => console.log(`listening on port ${port}...`));
