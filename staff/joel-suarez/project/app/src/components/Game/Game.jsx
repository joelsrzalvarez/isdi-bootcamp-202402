import { useEffect, useState, useRef } from 'react';
import { useLayout } from '../../LayoutContext';
import Box from './Box';
import styles from './Game.module.css';
import io from 'socket.io-client';

const socket = io('http://localhost:9000');

function Game() {
  const canvasRef = useRef(null);
  const { showLayout, setShowLayout } = useLayout();
  const [hostId, setHostId] = useState('');
  const [guestId, setGuestId] = useState('');
  

  useEffect(() => {
    setShowLayout(false);
    return () => setShowLayout(true);
  }, [setShowLayout]);

  useEffect(() => {
    const originalBackground = document.body.style.background;
    document.body.style.background = "url('./src/images/background-arena.jpg') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
    
    return () => {
      document.body.style.background = originalBackground;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const host = new Box({
        position: { x: 400, y: 700 },
        color: 'red',
        name: 'Player',
        width: 50,
        height: 150,
        health: 100,
        context: context
    });

    const guest = new Box({
        position: { x: 1500, y: 700 },
        color: 'blue',
        name: 'Enemy',
        width: 50,
        height: 150,
        health: 100,
        context: context
    });

    let animationFrameId;

    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        context.clearRect(0, 0, canvas.width, canvas.height);
        host.update();
        guest.update();
    };

    animate();

    return () => {
        cancelAnimationFrame(animationFrameId);
    };
}, []);

  useEffect(() => {
    socket.emit('findMatch');

    socket.on('roleAssigned', data => {
        if (data.role === 'host') {
            sessionStorage.setItem('hostId', socket.id);
            setHostId(socket.id);
        } else {
            sessionStorage.setItem('guestId', socket.id);
            setGuestId(socket.id);
        }
    });

    socket.on('matchFound', data => {
        console.log('Match found:', data);
        data.players.forEach(player => {
            if (player === sessionStorage.getItem('hostId')) {
                setHostId(player);
            } 
            else {
                setGuestId(player);
            }
        });
    });

    return () => {
        socket.off('roleAssigned');
        socket.off('matchFound');
    };
  }, []);

  return (
    <div className={styles.container}>
        <div id="hud" className={styles.hud}>
            <div className={styles.healthSection}>
                <div className={styles.healthLayout}>
                    <div className={styles.remainingHealthbar}></div>
                    <div id="hostId" className={styles.playerInfo}>Host: {hostId}</div>
                    <div id="playerHealth" className={styles.totalHealthBar}></div>
                </div>
            </div>
            <div id="timer" className={styles.timer}> -- </div>
            <div className={styles.healthSection}>
                <div className={styles.healthLayout}>
                    <div className={styles.remainingHealthbar}></div>
                    <div id="guestId" className={styles.playerInfo}>Guest: {guestId}</div>
                    <div id="enemyHealth" className={styles.totalHealthBar}></div>
                </div>
            </div>
        </div>
        <div id="result" className={styles.result}> result </div>
        <div className={styles.game}>
            <canvas ref={canvasRef} width={1000} height={1000}></canvas>
        </div>
    </div>
  );
}

export default Game;
