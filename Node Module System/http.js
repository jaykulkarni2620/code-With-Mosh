    const { Socket } = require('dgram');
const http = require('http');


    const server = http.createServer();

    server.on('connection', (Socket) => {
        console.log("trigged");
    })

    server.listen(3000);

    console.log("listening on port 3000..." );