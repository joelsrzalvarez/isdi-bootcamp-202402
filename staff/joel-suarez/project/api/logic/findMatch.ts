import { Server, Socket } from "socket.io";

interface Room {
  id: string;
  players: string[];
}

const players: Room[] = [];
const searchingPlayers = new Set();
const maxPlayersPerRoom = 2;

export const handleMatchMaking = (io: Server, socket: Socket): void => {
    if (searchingPlayers.has(socket.id)) {
        console.log(`User ${socket.id} already searching for a match`);
        return;
    }

    searchingPlayers.add(socket.id);
    console.log(`User ${socket.id} is looking for a match`);
    
    const availableRoom = players.find(p => p.players.length < maxPlayersPerRoom);
    if (availableRoom) {
        availableRoom.players.push(socket.id);
        socket.join(availableRoom.id);
        if (availableRoom.players.length === maxPlayersPerRoom) {
            io.to(availableRoom.id).emit('matchFound', {
                message: `Match found in room ${availableRoom.id}`,
                roomId: availableRoom.id,
                players: availableRoom.players
            });
        }
    } else {
        const newRoomId = `room_${Math.floor(Math.random() * 100000) + 1}`;
        players.push({ id: newRoomId, players: [socket.id] });
        socket.join(newRoomId);
    }
};

export const removePlayer = (socketId: string): void => {
    let roomIndex = -1;
    players.forEach((room, index) => {
        const playerIndex = room.players.indexOf(socketId);
        if (playerIndex !== -1) {
            room.players.splice(playerIndex, 1);
            console.log(`Player ${socketId} removed from room ${room.id}`);
            if (room.players.length === 0) {
                roomIndex = index;
            }
        }
    });
    if (roomIndex !== -1) {
        players.splice(roomIndex, 1);
        console.log(`Room ${players[roomIndex].id} removed as it's now empty`);
    }
    if (searchingPlayers.has(socketId)) {
        searchingPlayers.delete(socketId);
        console.log(`Player ${socketId} removed from search list`);
    }
};
