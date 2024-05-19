import { Server, Socket } from "socket.io";

interface Room {
  id: string;
  players: { id: string, socket: Socket, health: number }[];
}

const rooms: Room[] = [];
const maxPlayersPerRoom = 2;

export const handleMatchMaking = (io: Server, socket: Socket, idPlayer: string): void => {
    console.log(`User ${idPlayer} is looking for a match`);

    let availableRoom = rooms.find(p => p.players.length < maxPlayersPerRoom);
    if (availableRoom) {
        availableRoom.players.push({ id: idPlayer, socket: socket, health: 100 });

        if (availableRoom.players.length === maxPlayersPerRoom) {
            io.emit('start', {
                roomId: availableRoom.id,
                players: availableRoom.players.map(player => player.id),
                message: `Match found in room ${availableRoom.id}`
            });

            availableRoom.players.forEach(player => {
                player.socket.on('moveBox', (data) => {
                    const { playerId, direction, positionX } = data;
                    player.socket.broadcast.emit('boxMoved', { playerId, direction, positionX });
                });

                player.socket.on('attack', ({ playerId, roomId, targetId }) => {
                    const room = rooms.find(r => r.id === roomId);
                    if (room) {
                        const target = room.players.find(p => p.id === targetId);
                        if (target) {
                            target.health -= 10;
                            player.socket.broadcast.emit('playerAttacked', { playerId: targetId, health: target.health });

                            const host = room.players.find(p => p.id === availableRoom.players[0].id);
                            const guest = room.players.find(p => p.id === availableRoom.players[1].id);
                            console.log(`Host health: ${host.health}, Guest health: ${guest.health}`);

                            player.socket.broadcast.emit('attack', { playerId });
                        }
                    }
                });

                player.socket.on('sendAttack', ({playerId}) => {
                    player.socket.broadcast.emit('playerAttack', { playerId});
                });

                player.socket.on('sendHit', ({playerId}) => {
                    player.socket.broadcast.emit('playerHit', { playerId});
                });
            });
        }
    } else {
        const newRoomId = `room_${Math.floor(Math.random() * 100000) + 1}`;
        rooms.push({ id: newRoomId, players: [{ id: idPlayer, socket: socket, health: 100 }] });
    }
};
