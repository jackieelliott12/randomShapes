//Initialize the express 'app' object
let express = require('express');
let app = express();
app.use('/', express.static('public')); 

//Initialize the actual HTTP server
let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});

//Initialize socket.io
let io = require('socket.io');
io = new io.Server(server);

//Listen for individual clients/users to connect
io.sockets.on('connection', function(socket) {
    console.log("New client connected: " + socket.id);

    //Listen for a message named 'data' from this client
    socket.on('data', function(color) {
        //Data can be numbers, strings, objects
        console.log("Background color changed to:", color);

        //Send the data to all clients, including this one
        io.sockets.emit('data', color);
    });

    //Listen for this client to disconnect
    socket.on('disconnect', function() {
        console.log("Client disconnected: " + socket.id);
    });
});
