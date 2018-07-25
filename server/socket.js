const io = require('socket.io');
const players = {};
let rooms = 0;
let turno = false;

module.exports.listen = (http) => {
    socketIo = io.listen(http);

    socketIo.on('connection', (socket) => {
        console.log('Utente connesso');
    
        socket.on('disconnect', function(){
            console.log('Utente disconnesso');
            
            delete players[socket.id];
            var room = socketIo.nsps['/'].adapter.rooms['room-1'];
            if(room) {
                socket.broadcast.to('room-1').emit('player left', room.length);
            }
            socket.leave('room-1');
        });
    
        socket.on('move', function(move) {
            socketIo.to('room-1').emit('new move', move);
        });

        socket.on('create new player', (player) => {
            socket.join('room-1');
            var room = socketIo.nsps['/'].adapter.rooms['room-1'];
            var playerName = "Player_" + socket.id;
            var symbol = 'X';
            if(room && room.length == 1){
                turno = getRandomInt(1) === 0;
            }
            if (room && room.length > 1) {
                symbol = 'O';
                turno = !turno;
            }
            var player = { id: socket.id, name: playerName, symbol: symbol, currentTurno: turno  };
            players[socket.id] = playerName;
            socket.emit('get player data', player);

            if (room && room.length <= 2) {
                console.log('Stanza', room);
                socketIo.in('room-1').emit('player joined', room.length);
                
            } else {
                socket.leave('room-1');
                socket.emit('err', 'Stanza Piena');
            }
        });

        socket.on('winner',(data) => {
            socketIo.to('room-1').emit('game over', data);
        });

        socket.on('tied game', () => {
            socketIo.to('room-1').emit('game over', null);
        });

        // nuovo da gestire
        socket.on('create new game', (data) => {
            let roomName = 'room-'+ ++rooms;
            socket.join(roomName);
            socket.emit('new game', { name: data.name, room: roomName});
        });
    
        socket.on('join game', (data) => {
            var room = io.nsps['/'].adapter.rooms[data.room];
            if (room && room.length === 1) {
                
            }
        });
    });

    return socketIo;
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}