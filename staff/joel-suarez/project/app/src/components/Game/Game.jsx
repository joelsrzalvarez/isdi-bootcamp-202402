import React, { useEffect, useState, useRef } from 'react';
import { useLayout } from '../../LayoutContext';
import styles from './Game.module.css';
import { useNavigate } from 'react-router-dom';
import Fighter from './Fighter';

function Game({ socket, roomId, characterIds, characters, players }) {
    const characterName = characters.map(char => char.name).join(', ');
    const currentPlayerId = characterIds.values().next().value;

    const idHost = players[0].toString();
    const idGuest = players[1].toString();
    const [posXHost, setPosXHost] = useState(80);
    const [posXGuest, setPosXGuest] = useState(1700);
    const [timer, setTimer] = useState(60);
    const [hostHealth, setHostHealth] = useState(100);
    const [guestHealth, setGuestHealth] = useState(100);
    const { setShowLayout } = useLayout();
    const navigate = useNavigate();

    const posXHostRef = useRef(posXHost);
    const posXGuestRef = useRef(posXGuest);

    const hostRef = useRef(null);
    const guestRef = useRef(null);

    const keysPressed = useRef({});

    useEffect(() => {
        setShowLayout(false);

        const handleKeyDown = (event) => {
            keysPressed.current[event.key] = true;
            let newPosition;
            const isHost = currentPlayerId === idHost;
            const playerRef = isHost ? hostRef : guestRef;
            const setPosX = isHost ? setPosXHost : setPosXGuest;
            const posXRef = isHost ? posXHostRef : posXGuestRef;
            const targetId = isHost ? idGuest : idHost;
            const targetRef = isHost ? guestRef : hostRef;

            if (event.key === 'a') {
                newPosition = Math.max(0, posXRef.current - 10);
                setPosX(newPosition);
                playerRef.current.handleAction('move');
                socket.emit('moveBox', { playerId: currentPlayerId, direction: 'left', positionX: newPosition });
            } else if (event.key === 'd') {
                newPosition = posXRef.current + 10;
                setPosX(newPosition);
                playerRef.current.handleAction('move');
                socket.emit('moveBox', { playerId: currentPlayerId, direction: 'right', positionX: newPosition });
            } else if (event.key === ' ' || event.key === 'SPACE') {
                playerRef.current.handleAction('attack');
                socket.emit('sendAttack', {playerId: currentPlayerId});
                if (playerRef.current.isHitting(targetRef.current)) {
                    socket.emit('attack', { playerId: currentPlayerId, roomId, targetId });
                    socket.emit('sendHit', {playerId: currentPlayerId});
                    targetRef.current.handleAction('hit');
                }
            }
        };

        const handleKeyUp = (event) => {
            keysPressed.current[event.key] = false;
            const playerRef = currentPlayerId === idHost ? hostRef : guestRef;
            if (!keysPressed.current['a'] && !keysPressed.current['d']) {
                playerRef.current.handleAction('idle');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        socket.on('boxMoved', data => {
            const { playerId, positionX } = data;
            if (playerId === idHost) {
                setPosXHost(positionX);
                hostRef.current.handleAction('move');
            } else if (playerId === idGuest) {
                setPosXGuest(positionX);
                guestRef.current.handleAction('move');
            }
        });

        socket.on('timer', data => {
            const { countdown } = data;
            setTimer(countdown);
        });

        socket.on('playerAttacked', data => {
            const { playerId, targetId, health } = data;
            if (targetId === idHost) {
                setHostHealth(health);
                hostRef.current.handleAction('hit');
                setTimeout(() => {
                    hostRef.current.handleAction('idle');
                }, hostRef.current.sprites.takeHit.maxFrames * hostRef.current.holdFrames * 1000 / 60);
            } else if (targetId === idGuest) {
                setGuestHealth(health);
                guestRef.current.handleAction('hit');
                setTimeout(() => {
                    guestRef.current.handleAction('idle');
                }, guestRef.current.sprites.takeHit.maxFrames * guestRef.current.holdFrames * 1000 / 60);
            }
        });

        socket.on('playerAttack', data => {
            const {playerId} = data;
            console.log(playerId);
            if (playerId === idHost) {
                hostRef.current.handleAction('attack');
            } else if (playerId === idGuest) {
                guestRef.current.handleAction('attack');
            }
        });

        socket.on('playerHit', data => {
            const {playerId} = data;
            console.log(playerId);
            if (playerId === idHost) {
                guestRef.current.handleAction('hit');
            } else if (playerId === idGuest) {
                hostRef.current.handleAction('hit');
            }
        });

        socket.on('endGame', data => {
            const { message } = data;
            navigate('/');
        });

        return () => {
            setShowLayout(true);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            socket.off('boxMoved');
            socket.off('timer');
            socket.off('playerAttacked');
            socket.off('endGame');
        };
    }, [socket, roomId, idHost, idGuest, setShowLayout, characterIds, navigate, currentPlayerId]);

    useEffect(() => {
        posXHostRef.current = posXHost;
    }, [posXHost]);

    useEffect(() => {
        posXGuestRef.current = posXGuest;
    }, [posXGuest]);

    useEffect(() => {
        const canvas = document.getElementById('gameCanvas');
        const c = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const background = new Image();
        background.src = new URL('/assets/img/background.jpeg', import.meta.url).href;

        const host = new Fighter({
            name: "host",
            position: {
                x: 0,
                y: window.innerHeight - 200
            },
            offset: {
                x: 75,
                y: 0
            },
            imageSrc: '/assets/img/samuraiMack/Idle.png',
            scale: 2.5,
            maxFrames: 8,
            holdFrames: 4,
            offsetFrame: { x: 215, y: 154 },
            sprites: { 
                idle: {
                    imageSrc: '/assets/img/samuraiMack/Idle.png',
                    maxFrames: 8,
                },
                run: {
                    imageSrc: '/assets/img/samuraiMack/Run.png',
                    maxFrames: 8,
                },
                jump: {
                    imageSrc: '/assets/img/samuraiMack/Jump.png',
                    maxFrames: 2,
                },
                fall: {
                    imageSrc: '/assets/img/samuraiMack/Fall.png',
                    maxFrames: 2,
                },
                death: {
                    imageSrc: '/assets/img/samuraiMack/Death.png',
                    maxFrames: 6,
                },
                attack1: {
                    imageSrc: '/assets/img/samuraiMack/Attack1.png',
                    maxFrames: 6,
                },
                takeHit: {
                    imageSrc: '/assets/img/samuraiMack/Takehit.png',
                    maxFrames: 4,
                }
            },
            keys: {
                'a': {
                    pressed: false
                },
                'd': {
                    pressed: false
                },
                'w': {
                    pressed: false
                },
                ' ': {
                    pressed: false
                }
            },
            attackTime: 400
        });

        const guest = new Fighter({
            name: "guest",
            position: {
                x: 950,
                y: window.innerHeight - 200
            },
            offset: {
                x: -160,
                y: 0
            },
            imageSrc: '/assets/img/kenji/Idle.png',
            scale: 2.5,
            maxFrames: 4,
            holdFrames: 6,
            offsetFrame: { x: 215, y: 172 },
            sprites: {
                idle: {
                    imageSrc: '/assets/img/kenji/Idle.png',
                    maxFrames: 4,
                },
                run: {
                    imageSrc: '/assets/img/kenji/Run.png',
                    maxFrames: 8,
                },
                jump: {
                    imageSrc: '/assets/img/kenji/Jump.png',
                    maxFrames: 2,
                },
                fall: {
                    imageSrc: '/assets/img/kenji/Fall.png',
                    maxFrames: 2,
                },
                death: {
                    imageSrc: '/assets/img/kenji/Death.png',
                    maxFrames: 7,
                },
                attack1: {
                    imageSrc: '/assets/img/kenji/Attack1.png',
                    maxFrames: 4,
                },
                takeHit: {
                    imageSrc: '/assets/img/kenji/Takehit.png',
                    maxFrames: 3,
                }
            },
            keys: {
                'ArrowLeft': {
                    pressed: false
                },
                'ArrowRight': {
                    pressed: false
                },
                'ArrowUp': {
                    pressed: false
                },
                'Control': {
                    pressed: false
                }
            },
            attackTime: 350
        });

        hostRef.current = host;
        guestRef.current = guest;

        function animate() {
            c.clearRect(0, 0, canvas.width, canvas.height);
            if (background.complete) {
                c.drawImage(background, 0, 0, canvas.width, canvas.height);
            }
            host.position.x = posXHost;
            guest.position.x = posXGuest;
            host.update(c);
            guest.update(c);
            requestAnimationFrame(animate);
        }
        background.onload = () => {
            animate();
        };
    }, [posXHost, posXGuest]);

    document.title = `${characterName} playing in ${roomId}`;

    return (
        <div className={styles.container}>
            <div id="hud" className={styles.hud}>
                <div className={styles.healthLayout}>
                    <div className={styles.remainingHealthbar}></div>
                    <div id="playerHealth" className={styles.totalHealthBar}></div>
                    <div>{idHost}</div>
                </div>
                <div id="timer" className={styles.timer}>{timer}</div>
                <div className={styles.healthLayout}>
                    <div className={styles.remainingHealthbar}></div>
                    <div id="enemyHealth" className={styles.totalHealthBar}></div>
                    <div style={{ marginLeft: '50%' }}>{idGuest}</div>
                </div>
            </div>
            <div id="result" className={styles.result}> result </div>
            <canvas id="gameCanvas"></canvas>
        </div>
    );
}

export default Game;
