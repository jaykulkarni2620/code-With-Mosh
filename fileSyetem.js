const fs = require('fs');

const file = fs.readdirSync('./');
console.log(file);

fs.readdir('./', (err,file) => {
    if (err) console.log("error", err);
    else console.log("result", file);
})