import { Server, Socket } from "socket.io";

interface Room {
  id: string;
  players: { id: string, socket: Socket} [];
}

const rooms: Room[] = [];
const maxPlayersPerRoom = 2;
//const roomsTimers = {};

export const handleMatchMaking = (io: Server, socket: Socket, idPlayer: string): void => {
    console.log(`User ${idPlayer} is looking for a match`);

    let availableRoom = rooms.find(p => p.players.length < maxPlayersPerRoom);
    if (availableRoom) {
        availableRoom.players.push({id:idPlayer, socket: socket});
       // socket.join(availableRoom.id);

        if (availableRoom.players.length === maxPlayersPerRoom) {
            io.emit('start', {
                roomId: availableRoom.id,
                players: availableRoom.players.map(player => player.id),
                message: `Match found in room ${availableRoom.id}`
            });

            // let countdown = 6;
            // roomsTimers[availableRoom.id] = setInterval(() => {
            //     countdown--;
            //     //console.log(`Room ${availableRoom.id} - Time left: ${countdown} seconds`);
            //     //io.to(availableRoom.id).emit('timer', { countdown });
            //     // if (countdown <= 0) {
            //     //     clearInterval(roomsTimers[availableRoom.id]);
            //     //     delete roomsTimers[availableRoom.id];
            //     //     io.to(availableRoom.id).emit('endGame', { message: 'Game finished!' });
            //     //     delete availableRoom.id;
            //     //     console.log(`Game in room ${availableRoom.id} has ended.`);
            //     // }
            // }, 1000);
            
            availableRoom.players.forEach(player => {
                player.socket.on('moveBox', (data) => {
                    const { roomId, playerId, direction, positionX } = data;
                    console.log(`Player ${playerId} in room ${roomId} is moving ${direction} to ${positionX}`);
    
                    //const room  = rooms.find(room => room.players.some(player => player.id === playerId))
                    //const player = room.players.find(player => player.id !== playerId)
                    //console.log(player.socket, { playerId, direction, positionX })
    
                    player.socket.broadcast.emit('boxMoved', { playerId, direction, positionX })
                });
            })
        }
    } else {
        const newRoomId = `room_${Math.floor(Math.random() * 100000) + 1}`;
        rooms.push({ id: newRoomId, players: [{id: idPlayer, socket: socket}] });
        //socket.join(newRoomId);
    }
};