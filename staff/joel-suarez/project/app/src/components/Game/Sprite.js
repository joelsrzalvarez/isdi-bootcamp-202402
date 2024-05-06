class Sprite {
    constructor({ position, imageSrc, scale = 1, maxFrames = 1 }) {
        this.position = position;
        this.scale = scale;
        this.maxFrames = maxFrames;
        this.currentFrame = 0;
        this.image = new Image();
        this.image.onload = () => {
            console.log(`Image loaded successfully: ${imageSrc}`);
            this.imageLoaded = true;
        };
        this.image.onerror = () => {
            console.error(`Failed to load image at ${imageSrc}`);
            this.imageLoaded = false;
        };
        this.image.src = imageSrc;
    }

    draw(c) {
        if (this.imageLoaded) {
            let frameWidth = this.image.width / this.maxFrames;
            let frameHeight = this.image.height;
            c.drawImage(
                this.image,
                this.currentFrame * frameWidth, 0, frameWidth, frameHeight,
                this.position.x, this.position.y,
                frameWidth * this.scale, frameHeight * this.scale
            );
        } else {
            console.log('Image not loaded');
        }
    }

    update(c) {
        this.draw(c);
        this.currentFrame = (this.currentFrame + 1) % this.maxFrames;
    }
}

export default Sprite;
