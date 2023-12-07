const EventEmitter = require("events");
const emitter = new EventEmitter();

// A listener is a function that will be called when that event is raised.
emitter.on("messageLogged", (arg) => {
    console.log("The event is trigged", arg );
})



// emit means making a noice or produce something, signalling event has happend
emitter.emit("messageLogged", { id: 1 , url: "http://"});