class KeyboardHandler {
    constructor(socket, currentPlayerId, idHost, idGuest, setPosXHost, setPosXGuest) {
        this.socket = socket;
        this.currentPlayerId = currentPlayerId;
        this.idHost = idHost;
        this.idGuest = idGuest;
        this.setPosXHost = setPosXHost;
        this.setPosXGuest = setPosXGuest;

        this.handleKeyDown = this.handleKeyDown.bind(this);
        window.addEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(event) {
        let newPosition;
        if (this.currentPlayerId === this.idHost) {
            if (event.key === 'a') {
                newPosition = Math.max(0, this.posXHost - 10);
                this.setPosXHost(newPosition);
            } else if (event.key === 'd') {
                newPosition = this.posXHost + 10;
                this.setPosXHost(newPosition);
            }
            this.socket.emit('moveBox', { playerId: this.idHost, direction: event.key === 'a' ? 'left' : 'right', positionX: newPosition });
        } else if (this.currentPlayerId === this.idGuest) {
            if (event.key === 'ArrowLeft') {
                newPosition = Math.max(0, this.posXGuest - 10);
                this.setPosXGuest(newPosition);
            } else if (event.key === 'ArrowRight') {
                newPosition = this.posXGuest + 10;
                this.setPosXGuest(newPosition);
            }
            this.socket.emit('moveBox', { playerId: this.idGuest, direction: event.key === 'ArrowLeft' ? 'left' : 'right', positionX: newPosition });
        }
    }

    cleanup() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }
}

export default KeyboardHandler;
