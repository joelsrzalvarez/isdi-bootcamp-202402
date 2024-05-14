import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import CreateCharacterForm from '../components/CreateCharacterForm';
import retrieveCharacter from '../logic/retrieveCharacter';
import deleteCharacter from '../logic/deleteCharacter';
import decryptToken from '../logic/decryptToken';
import Game from '../components/Game/Game';
import { useUser } from '../hooks/useUser';

function Home() {
    const [characters, setCharacters] = useState([]);
    const [characterIds, setCharacterIds] = useState(new Set()); 
    const [roomId, setRoomId] = useState();
    const [showCreateCharacter, setShowCreateCharacter] = useState(false);
    const [searching, setSearching] = useState(false);
    const [socket, setSocket] = useState(null);
    const [gameFound, setGameFound] = useState(false);
    const [players, setPlayers] = useState([]); 

    useEffect(() => {
        const newSocket = io('ws://localhost:9000');

        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to server');
        });

        newSocket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        newSocket.on('start', (data) => {
            console.log('Match found:', data);
            if (data.players.some(playerId => characterIds.has(playerId))) {
                setRoomId(data.roomId);
                setPlayers(data.players);
                setGameFound(true)
            }
        });

        return () => {
            newSocket.off('connect');
            newSocket.off('disconnect');
            newSocket.off('start');
            newSocket.close();
        };
    }, [characterIds]);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const userId = decryptToken(token).sub;
            retrieveCharacter(userId)
                .then(chars => {
                    setCharacters(chars);
                    const ids = new Set(chars.map(char => char._id));
                    console.log(ids);
                    setCharacterIds(ids);
                })
                .catch(err => {
                    console.error('Error retrieving characters:', err);
                });
        }
    }, []);

    const handleCreateCharacterClick = () => {
        setShowCreateCharacter(true);
    };

    const handlePlayClick = (id) => {
        if (socket && !searching) {
            socket.emit('findMatch', id);
            setSearching(true);
        }
    };

    const handleDeleteCharacterClick = (id) => {
        deleteCharacter(id)
            .then(() => {
                console.log('Deletion successful');
                loadCharacters();
            })
            .catch(err => {
                console.error('Error deleting character:', err);
            });
    };

    const handleCloseCreateCharacter = () => {
        setShowCreateCharacter(false);
    };

    // const handleCountdown = () => {
    //     const intervalId = setInterval(() => {
    //         setCountdown((prevCountdown) => {
    //             if (prevCountdown <= 1) {
    //                 clearInterval(intervalId);
    //                 if (gameFound && roomId) {
    //                     setGameStart(true);
    //                     console.log(`que empiece el juego ${gameStart}`);
    //                 }
    //                 return 0;
    //             }
    //             return prevCountdown - 1;
    //         });
    //     }, 1000);
    // };

    if (gameFound) {
        return <Game socket={socket} roomId={roomId} characterIds={characterIds} characters={characters} players={players}/>;
    }

    return (
        <div className="form-home">
            <div className="row">
                {characters.map(char => (
                    <div className="col-md-3" key={char._id}>
                        <div className="character-info bg-dark text-white p-3 mb-3">
                            <h3><span style={{ color: '#545b62' }}>Char name: </span>{char.name}</h3>
                            <h3><span style={{ color: '#545b62' }}>Class: </span>{char.clase}</h3>
                            <h3><span style={{ color: 'green' }}>Win streak: </span>{char.win_streak}</h3>
                            <h3><span style={{ color: 'gold' }}>Max win streak: </span>{char.max_win_streak}</h3>
                            <div className="d-flex justify-content-between">
                                <button className="btn btn-success" onClick={() => handlePlayClick(char._id)}>
                                    {searching ? <span><img src="https://i.gifer.com/ZKZg.gif" alt="Searching..." style={{ width: 20, marginRight: 5 }} />Searching game...</span> : gameFound ? "✔ Game found!" : 'Play'}
                                </button>
                                <button className="btn btn-danger" onClick={() => handleDeleteCharacterClick(char._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
                {characters.length < 4 && <div className="col-md-5 offset-md-5"><button className="btn btn-primary" onClick={handleCreateCharacterClick}>Crear Personaje</button></div>}
            </div>
            <CreateCharacterForm onClose={() => setShowCreateCharacter(false)} showModal={showCreateCharacter} />
        </div>
    );
}

export default Home;
