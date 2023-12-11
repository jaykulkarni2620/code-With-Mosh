const p = new Promise( (resolve, reject ) => {
    //kick off some async work 
    //...
    
    setTimeout(()=> {
        reject(new Error("Message"))
        // resolve(1);
    },2000);
    
    //
});

p
    .then(result => console.log("result",result))
    .catch(err => console.log("error",  err.message));    