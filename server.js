const io = require('socket.io')();
const express = require('express')
const app = express()


const cors_proxy = require('cors-anywhere');
let roomHighlights = {};

io.on('connection', (client) => {
    console.log('New client connected');

    client.on('create', function (room) {
        console.log("room: ", room);
        client.join(room);

        // client.emit({room:room}) //send back the name of the room they're in
        if (roomHighlights.hasOwnProperty(room) 
            && roomHighlights[room].length > 0) {
                client.emit('syncup', roomHighlights[room])
            }
    });

    // just like on the client side, we have a socket.on method that takes a callback function
    client.on('change color', (color) => {
        // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
        // we make use of the socket.emit method again with the argument given to use from the callback function above
        console.log('Color Changed to: ', color)
        io.sockets.emit('change color', color)
    })
    client.on('add highlight', (data) => {
        console.log(data);
        if (!roomHighlights.hasOwnProperty(data.room)) {
            roomHighlights[data.room] = []
        }
        roomHighlights[data.room].push(data.highlight)
        //client.broadcast.to(data.room).emit('add highlight', data.highlight);
        console.log("Sending highlight message to ",io.sockets.adapter.rooms[data.room].length, " room numbers")
        client.to(data.room).emit('add highlight', data.highlight)
    })
    client.on('remove highlights', () => {
        client.to(data.room).emit('remove highlights')
    })

});

// let proxy = corsAnywhere.createServer({
//     originWhitelist: [], // Allow all origins
//     requireHeaders: [], // Do not require any headers.
//     removeHeaders: [] // Do not remove any headers.
// });

// /* Attach our cors proxy to the existing API on the /proxy endpoint. */
// api.get('/proxy/:proxyUrl*', (req, res) => {
//     req.url = req.url.replace('/proxy/', '/'); // Strip '/proxy' from the front of the URL, else the proxy won't work.
//     proxy.emit('request', req, res);
// });

let proxy = cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeaders: [], // Do not require any headers.
    removeHeaders: [] // Do not remove any headers.
});

/* Attach our cors proxy to the existing API on the /proxy endpoint. */

app.get('/proxy/:proxyUrl*', (req, res) => {
    console.log(req.url)
    req.url = req.url.replace('/proxy/', '/'); // Strip '/proxy' from the front of the URL, else the proxy won't work.
    console.log(req.url)
    proxy.emit('request', req, res);
});

app.use(express.static('build'))

const HTTP_PORT = 3000
app.listen(HTTP_PORT, () => console.log('Example app listening on port', HTTP_PORT))

const port = 8000;
io.listen(port);
console.log('listening on port ', port);