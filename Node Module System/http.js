    const { Socket } = require('dgram');
const http = require('http');


    const server = http.createServer();

    server.on('connection', (req,res) => {
       if (req.url === "/") {
            res.write("Hello world");
            res.end();
        }
    })

    server.listen(3000);

    console.log("listening on port 3000..." );