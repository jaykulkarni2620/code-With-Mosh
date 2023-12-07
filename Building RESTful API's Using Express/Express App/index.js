const express = require("express");
const app = express();

//as easy 
// const port = 3000;

app.get('/', (req,res) => {
    res.send("Hello World");
});

app.get('/api/courses', (req,res) => {
    res.send([ 1, 2, 3 ]);
});


app.get('/api/courses/:id', (req,res) => {
    res.send(req.params.id);
});


//port 

const port = process.env.PORT || 3000 ;

app.listen(port, () => console.log(`listening on port ${port}...`));
