import Sprite from './Sprite.js';

class Fighter extends Sprite {
    constructor({ name, position, offset, imageSrc, scale, maxFrames, holdFrames, offsetFrame = { x: 0, y: 0 }, sprites, keys, attackTime }) {
        super({ position, imageSrc, scale, maxFrames, holdFrames, offsetFrame });
        this.name = name;
        this.height = 150;
        this.width = 50;
        this.velocity = { x: 0, y: 0 }; 
        this.moveFactor = 6;    
        this.lastKey;           
        this.inTheAir = false;  
        this.isAttacking = false;
        this.health = 100;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offSet: offset, 
            width: 150,
            height: 150
        };  
        this.sprites = sprites;
        for (const sprite in this.sprites) {
            this.sprites[sprite].image = new Image();
            this.sprites[sprite].image.src = this.sprites[sprite].imageSrc;
        }
        this.keys = keys;
        this.attackTime = attackTime;
        this.attackCooldown = true;
        this.isTakingHit = false; 
        this.state = 'idle'; 
    }

    update(context) {
        this.draw(context);
        this.animateFrames();
        this.attackBox.position.x = this.position.x + this.attackBox.offSet.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offSet.y;
    }

    switchSprite(sprite) {
        if (this.state === sprite) return; 
        this.state = sprite;
        if (this.image === this.sprites[sprite].image) return;
        this.image = this.sprites[sprite].image;
        this.maxFrames = this.sprites[sprite].maxFrames;
        this.currentFrame = 0;
        this.elapsedFrames = 0;
        // console.log(`Switching to ${sprite} sprite`);
    }
    
    handleAction(action) {
        if (this.isAttacking && action !== 'attack') return;
        switch (action) {
            case 'move':
                this.switchSprite('run');
                break;
            case 'jump':
                this.switchSprite('jump');
                break;
            case 'attack':
                if (this.attackCooldown) {
                    this.switchSprite('attack1');
                    this.isAttacking = true;
                    this.attackCooldown = false;
                    setTimeout(() => {
                        this.isAttacking = false;
                        this.attackCooldown = true;
                        this.switchSprite('idle');
                    }, this.attackTime);
                }
                break;
            case 'hit':
                this.switchSprite('takeHit');
                this.isTakingHit = true;
                setTimeout(() => {
                    this.isTakingHit = false;
                    this.switchSprite('idle');
                }, this.attackTime);
                break;
            case 'idle':
                this.switchSprite('idle');
                break;
            default:
                this.switchSprite('idle');
        }
    }

    isHitting(enemyFighter) {
        return (
            this.attackBox.position.x + this.attackBox.width >= enemyFighter.position.x &&
            this.attackBox.position.x <= enemyFighter.position.x + enemyFighter.width &&
            this.attackBox.position.y + this.attackBox.height >= enemyFighter.position.y &&
            this.attackBox.position.y <= enemyFighter.position.y + enemyFighter.height
        );
    }
    
}

export default Fighter;
