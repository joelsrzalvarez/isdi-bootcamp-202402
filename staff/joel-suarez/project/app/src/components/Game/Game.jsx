// Game.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Fighter, player } from './Fighter';
import {setupKeyboardControls } from './Keys';
import { useLayout } from '../../LayoutContext';
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
    }, []);

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
        canvas.height = 500;
    
        let animationFrameId;
    
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            context.clearRect(0, 0, canvas.width, canvas.height);
            player.update(context);
        };
    
        animate();
    
        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);
    
    useEffect(() => {
        setupKeyboardControls(player);
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
            data.players.forEach(p => {
                if (p === sessionStorage.getItem('hostId')) {
                    setHostId(p);
                } else {
                    setGuestId(p);
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
            <canvas ref={canvasRef}></canvas>
          </div>
        </div>
      );

}

export default Game;
