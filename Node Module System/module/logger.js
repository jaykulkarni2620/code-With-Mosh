
function store (message) {
    console.log(message);
};


module.exports.store = store

//insted of exporting an Object, we can export a single function. so reset exports so now its just a function 


function log (message) {
    console.log(message);
};


module.exports = log