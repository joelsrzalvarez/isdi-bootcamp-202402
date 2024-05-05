import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import CreateCharacterForm from '../components/CreateCharacterForm';
import retrieveCharacter from '../logic/retrieveCharacter';
import deleteCharacter from '../logic/deleteCharacter';
import Game from '../components/Game/Game';
import decryptToken from '../logic/decryptToken';

function Home() {
    const [characters, setCharacters] = useState([]);
    const [showCreateCharacter, setShowCreateCharacter] = useState(false);
    const [searching, setSearching] = useState(false);
    const [socket, setSocket] = useState(null);
    const [gameFound, setGameFound] = useState(false);
    const [showCountdown, setShowCountdown] = useState(false);
    const [gameStart, setGameStart] = useState(false);
    const [countdown, setCountdown] = useState(5);


    const tokenDecrypted = decryptToken(sessionStorage.getItem('token')).sub;
    
    const userId = tokenDecrypted;

    useEffect(() => {
        const newSocket = io('http://localhost:9000', {
            transports: ['websocket'],
        });

        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to server');
            console.log(newSocket.connected); 
        });

        newSocket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        return () => {
            newSocket.off('connect');
            newSocket.off('disconnect');
            newSocket.close();
        };
    }, []);

    const loadCharacters = () => {
        retrieveCharacter(userId)
            .then(chars => setCharacters(chars))
            .catch(err => console.error(err)); 
    };

    useEffect(() => {
        loadCharacters();
    }, [userId]);

    useEffect(() => {
        if (socket) {
            socket.on('matchFound', (data) => {
                console.log('Match found:', data);
                setGameFound(true);
                setSearching(false);
                setShowCountdown(true);
                setCountdown(5);
                handleCountdown();
            });
            socket.on('gameStart', (data) => {
                console.log('Game starting:', data);
            });
        }
    }, [socket]);

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

    const handleCountdown = () => {
        const intervalId = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown <= 1) {
                    clearInterval(intervalId);
                    setGameStart(true)
                    return 0;
                }
                if(prevCountdown === 0) {
                    <Game/>
                }
                return prevCountdown - 1;
            });
        }, 1000);
    };

    if(gameStart) {
        return <Game/>
    }
    
    return (
        <div className="form-home">
            <div className="row">
                {characters.map(char => (
                    <div className="col-md-3" key={char._id}>
                        <div className="character-info bg-dark text-white p-3 mb-3">
                            <h3>
                                <span style={{ color: '#545b62' }}>Char name: </span> {char.name}
                            </h3>
                            <h3>
                                <span style={{ color: '#545b62' }}>Class: </span> {char.clase}
                            </h3>
                            <h3>
                                <span style={{ color: 'green' }}>Win streak: </span> {char.win_streak}
                            </h3>
                            <h3>
                                <span style={{ color: 'gold' }}>Max win streak: </span> {char.max_win_streak}
                            </h3>
                            <div className="d-flex justify-content-between">
                                <button className="btn btn-success" onClick={() => handlePlayClick(char._id)}>
                                    {searching ? (
                                        <span>
                                            <img src="https://i.gifer.com/ZKZg.gif" alt="Searching..." style={{ width: 20, marginRight: 5 }} />
                                            Searching game...
                                        </span>
                                    ) : gameFound ? "✔ Game found!" : 'Play'}
                                </button>
                                <button className="btn btn-danger" onClick={() => handleDeleteCharacterClick(char._id)}>Delete</button>
                            </div>
                            {showCountdown && (
                                <div className="col-md-5 offset-md-5">
                                    <p>Redirigiendo al combate en {countdown}...</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {characters.length < 4 && (
                    <div className="col-md-5 offset-md-5">
                        <button className="btn btn-primary" onClick={handleCreateCharacterClick}>Crear Personaje</button>
                    </div>
                )}
            </div>
            <CreateCharacterForm onClose={() => setShowCreateCharacter(false)} showModal={showCreateCharacter} />
        </div>
    );    
}

export default Home;
