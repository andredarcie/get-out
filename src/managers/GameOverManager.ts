export class GameOverManager {
    private _gameOverMessage: Element;

    constructor() {
        this._gameOverMessage = document.querySelector("#game-over-message");
    }

    start(): void {
        this.setGameOverMessage('You died nothing made sense');
    }

    setGameOverMessage(message: string): void {
        this._gameOverMessage.innerHTML = message;
    }
}