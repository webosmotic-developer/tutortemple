import UserSocket from './api/user/user.socket';

export default function fnSetSocket(socketIo) {

    const userSocket = new UserSocket();

    // When the user connects.. perform this
    socketIo.on('connection', function (socket) {
        socket.address = socket.handshake.address !== null ?
            socket.handshake.address.address + ':' + socket.handshake.address.port :
            process.env.DOMAIN;

        socket.connectedAt = new Date();

        // Call onDisconnect.
        socket.on('disconnect', function () {
            console.log('[%s] DISCONNECTED', socket.address);
        });

        // When the client emits 'info', this listens and executes
        socket.on('info', function (data) {
            console.log('[%s] %s', socket.address, JSON.stringify(data, null, 2));
        });

        console.log('[%s] CONNECTED', socket.address);

        // Insert sockets below
        userSocket.fnSetSocket(socket);
    });
}
