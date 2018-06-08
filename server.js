const io = require('socket.io')();

io.on('connection', (client) => {
    console.log('New client connected');

    client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
            client.emit('timer', new Date());
        }, interval);
    });

    // just like on the client side, we have a socket.on method that takes a callback function
    client.on('change color', (color) => {
        // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
        // we make use of the socket.emit method again with the argument given to use from the callback function above
        console.log('Color Changed to: ', color)
        io.sockets.emit('change color', color)
    })
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);