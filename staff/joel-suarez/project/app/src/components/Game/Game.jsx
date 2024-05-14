import React, { useEffect, useState } from 'react';
import { useLayout } from '../../LayoutContext';
import styles from './Game.module.css';
import { useNavigate } from 'react-router-dom';

function Game({ socket, roomId, characterIds, characters, players }) {
    const characterName = characters.map(char => char.name).join(', ');
    const currentPlayerId = characterIds.values().next().value;

    const idHost = players[0].toString();
    const idGuest = players[1].toString();
    const [posXHost, setPosXHost] = useState(500);
    const [posXGuest, setPosXGuest] = useState(1250);
    const [timer, setTimer] = useState(60);
    const { setShowLayout } = useLayout();
    const navigate = useNavigate();

    useEffect(() => {
        setShowLayout(false);

        const handleKeyDown = (event) => {
            let newPosition;
            if (currentPlayerId === idHost) {
                if (event.key === 'a') {
                    newPosition = Math.max(0, posXHost - 10);
                    setPosXHost(newPosition);
                } 
                else if (event.key === 'd') {
                    newPosition = posXHost + 10;
                    setPosXHost(newPosition);
                }
                console.log(`La id del host es ${idHost}`);
                socket.emit('moveBox', { playerId: idHost, direction: event.key === 'a' ? 'left' : 'right', positionX: newPosition });
            } 
            else if (currentPlayerId === idGuest) {
                if (event.key === 'ArrowLeft') {
                    newPosition = Math.max(0, posXGuest - 10);
                    setPosXGuest(newPosition);
                } 
                else if (event.key === 'ArrowRight') {
                    newPosition = posXGuest + 10;
                    setPosXGuest(newPosition);
                }
                console.log(`La id del guest es ${idGuest}`);
                socket.emit('moveBox', { playerId: idGuest, direction: event.key === 'ArrowLeft' ? 'left' : 'right', positionX: newPosition });
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        socket.on('boxMoved', data => {
            const { playerId, positionX } = data;
            if (playerId === idHost) {
                console.log(playerId)
                setPosXHost(positionX);
            } else if (playerId === idGuest) {
                setPosXGuest(positionX);
            }
        });

        socket.on('timer', data => {
            const { countdown } = data;
            setTimer(countdown);
        });

        socket.on('endGame', data => {
            const { message } = data;
            console.log(message);
            navigate('/'); 
        });

        return () => {
            setShowLayout(true);
            window.removeEventListener('keydown', handleKeyDown);
            socket.off('boxMoved');
            socket.off('timer');
            socket.off('endGame');
        };
    }, [socket, posXHost, posXGuest, roomId, idHost, idGuest, setShowLayout, characterIds, navigate]);

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
          <canvas id="gameCanvas" width="800" height="600"></canvas>
          <div className={styles.game}>
              <div id={idHost} style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: 'red',
                  position: 'absolute',
                  top: '500px',
                  left: `${posXHost}px`
              }}></div>
              <div id={idGuest} style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: 'blue',
                  position: 'absolute',
                  top: '500px',
                  left: `${posXGuest}px`
              }}></div>
          </div>
      </div>
  );
}

export default Game;
