class Player1 {
    constructor(element) {
        this.$element = $(element);
        this.position = 0;
        this.speed = 10;
        this.movingUp = false;
        this.movingDown = false;

        this.gameContainerHeight = $('.game-container').height();
        $(document).on('keydown', (event) => this.handleKeyDown(event));
        $(document).on('keyup', (event) => this.handleKeyUp(event));
    }

    handleKeyDown(event) {
        switch (event.key) {
            case 'w':
                this.movingUp = true;
                break;
            case 's':
                this.movingDown = true;
                break;
        }
    }

    handleKeyUp(event) {
        switch (event.key) {
            case 'w':
                this.movingUp = false;
                break;
            case 's':
                this.movingDown = false;
                break;
        }
    }

    moveUp() {
        if (this.movingUp) {
            const newPosition = this.position - this.speed;
            if (newPosition >= 0) {
                this.position = newPosition;
                this.$element.css('top', this.position);
            }
        }
    }

    moveDown() {
        if (this.movingDown) {
            const newPosition = this.position + this.speed;
            if (newPosition + this.$element.height() <= this.gameContainerHeight) {
                this.position = newPosition;
                this.$element.css('top', this.position);
            }
        }
    }
}
// PLAYER 2
class Player2 {
    constructor(element) {
        this.$element = $(element);
        this.position = 0;
        this.speed = 10;
        this.movingUp = false;
        this.movingDown = false;

        this.gameContainerHeight = $('.game-container').height();
        $(document).on('keydown', (event) => this.handleKeyDown(event));
        $(document).on('keyup', (event) => this.handleKeyUp(event));
    }

    handleKeyDown(event) {
        switch (event.key) {
            case 'ArrowUp':
                this.movingUp = true;
                break;
            case 'ArrowDown':
                this.movingDown = true;
                break;
        }
    }

    handleKeyUp(event) {
        switch (event.key) {
            case 'ArrowUp':
                this.movingUp = false;
                break;
            case 'ArrowDown':
                this.movingDown = false;
                break;
        }
    }

    moveUp() {
        if (this.movingUp) {
            const newPosition = this.position - this.speed;
            if (newPosition >= 0) {
                this.position = newPosition;
                this.$element.css('top', this.position);
            }
        }
    }

    moveDown() {
        if (this.movingDown) {
            const newPosition = this.position + this.speed;
            if (newPosition + this.$element.height() <= this.gameContainerHeight) {
                this.position = newPosition;
                this.$element.css('top', this.position);
            }
        }
    }
}
// BALL
class Ball {
    constructor(element, player1, player2) {
        this.$element = $(element);
        this.positionX = 0;
        this.positionY = 0;
        this.speedX = 10;
        this.speedY = 5;

        this.gameContainerWidth = $('.game-container').width();
        this.gameContainerHeight = $('.game-container').height();

        this.player1 = player1;
        this.player2 = player2;
    }

    move() {
        this.positionX += this.speedX;
        if (this.positionX <= 0) {
            this.speedX = Math.abs(this.speedX);
        }
        if (this.positionX <= -this.$element.width()) {
            // re iniciar pos de la pelota
            this.positionX = this.gameContainerWidth;
        }
        // colisionar player1
        if (this.positionX <= this.player1.$element.width() &&
            this.positionY + this.$element.height() >= this.player1.position &&
            this.positionY <= this.player1.position + this.player1.$element.height()) {
            this.speedX = Math.abs(this.speedX); // rebotar hacia la derecha
        }

        // colisionar player2
        if (this.positionX + this.$element.width() >= this.gameContainerWidth - this.player2.$element.width() &&
            this.positionY + this.$element.height() >= this.player2.position &&
            this.positionY <= this.player2.position + this.player2.$element.height()) {
            this.speedX = -Math.abs(this.speedX); // rebotar hacia la izquierda
        }

        this.positionY += this.speedY;

        // si la pelota llega al borde superior o inferior, rebota cambiando la direccion
        if (this.positionY <= 0 || this.positionY + this.$element.height() >= this.gameContainerHeight) {
            this.speedY = -this.speedY; // invertir direccion
        }
        this.$element.css({
            left: this.positionX,
            top: this.positionY
        });
    }
}

$(document).ready(function () {
    const player1 = new Player1('.player1');
    const player2 = new Player2('.player2');
    const ball = new Ball('.ball', player1, player2);

    function animate() {
        player1.moveUp();
        player1.moveDown();
        player2.moveUp();
        player2.moveDown();
        ball.move();
        requestAnimationFrame(animate);
    }

    animate();
});
