// Using References (Normalisation)

let author = {
    name : "Jay"
}

let course = {
    author: "id"
}


//Using Embedded Documents (Denormalisation)

let course = {
    author: {
        name : "Jay"
    }
}

//Hybrid 

let author = {
    name : "Jay"
    //50 other properties
}

let course = {
    author: {
        id:'ref'
        name: "jay"
    }
}