//Creating settled promises
const p = Promise.reject(new Error("reason for rejection"));

p.catch(err => console.log(err.message));

//running promises in parallel

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Asyn operation 1...");
        // reject(new Error("because something failed."));
        resolve(1)
    },2000);
});

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log("Asyn operation 2...");
        resolve(2);
    },2000);
});

//  Promise.all([p1,p2])
//  .then(result => console.log("result", result))
//  .catch(err => console.log("ERROR:",err.message));

 //Promise.rase = Want to do something as soon as the first operation completes.Insted of promise.all use Promise.race as soon as first promise is fullfilled, will be consider this aaray full fill.

 Promise.race([p1,p2])
 .then(result => console.log("result", result))
 .catch(err => console.log("ERROR:",err.message));