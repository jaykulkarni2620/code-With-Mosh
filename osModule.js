const os = require('os');
var totalMemory = os.totalmem();
console.log("Total memory",totalMemory);
var freeMemory = os.freemem();
console.log("free memory",freeMemory);