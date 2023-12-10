const express = require('express');
const logger = require('./logger');
const app = express();

//Middlewear its like function
app.use(express.json());

//creating custom middleware call it on another
app.use (logger);

//creating custom middleware
app.use (function (req,res,next){
    console.log("Authenticating...");
    next();
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Listening on port ${port}...`));