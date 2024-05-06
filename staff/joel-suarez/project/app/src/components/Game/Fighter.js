import Sprite from './Sprite.js'
import keys from './Keys.js';

export class Fighter extends Sprite {
    constructor({ position, imageSrc, scale, maxFrames }) {
        super({ position, imageSrc, scale, maxFrames });
    }

    movement(){
        if (keys['d'].pressed) this.position.x += 5;
        if (keys['a'].pressed) this.position.x -= 5; 
    }    
}

export const player = new Fighter({
    position: {
        x: 100, 
        y: 100 
    },
    imageSrc: '/assets/img/samuraiMack/Idle.png',
    scale: 2.5, 
    maxFrames: 8 
});

export default Fighter;
