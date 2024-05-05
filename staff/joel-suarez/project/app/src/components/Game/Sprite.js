class Sprite {
    constructor({ position, imageSrc, scale = 1, maxFrames = 1, holdFrames = 30, offsetFrame = { x: 0, y: 0 } }) {
        this.position = position;
        this.height = 150;
        this.width = 50;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.maxFrames = maxFrames;     
        this.currentFrame = 0;          
        this.elapsedFrames = 0;         
        this.holdFrames = holdFrames;
        this.offsetFrame = offsetFrame;
    }
    draw() {
        c.drawImage(this.image, this.currentFrame * (this.image.width / this.maxFrames), 0, this.image.width / this.maxFrames,
            this.image.height, this.position.x - this.offsetFrame.x, this.position.y - this.offsetFrame.y,
            (this.image.width / this.maxFrames) * this.scale, this.image.height * this.scale);
    }

    animateFrames() {
        this.elapsedFrames++;
        // Update the current frame only if we waited holdFrames.
        if (this.elapsedFrames % this.holdFrames === 0) {
            if (this.currentFrame < this.maxFrames - 1) {
                this.currentFrame++;    // Jump to the next frame.
            } else {
                if (this instanceof Fighter) { 
                    if (this.health > 0) {  // This avoids resetting death animation.
                        this.currentFrame = 0;  // Reset the current fighter frame to the beginning of the animation.
                    }
                } else {
                    this.currentFrame = 0;  // Reset the current sprite frame to the beginning of the animation.
                }
            }
        }
    }

    // update sprite each frame
    update() {
        this.draw();
        this.animateFrames();
    }
}

export default Sprite;