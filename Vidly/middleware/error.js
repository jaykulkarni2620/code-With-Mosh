//using winston
const winston = require('winston');



module.exports = function (err,req,res,next){
    
    winston.error(err.message, err);

    //error
    //warn
    //info



    res.status(500).send("Something failed");
    // log the exception 


  };

