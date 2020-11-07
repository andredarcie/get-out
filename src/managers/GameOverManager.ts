import { Game } from '../Game';

export class GameOverManager {
    private _gameOverMessage: Element;
    private readonly _game: Game;
    private _tryAgainBtn: Element;

    constructor() {
        this._game = Game.getInstance();
        this._gameOverMessage = document.querySelector("#game-over-message");
        this._tryAgainBtn = document.querySelector('#try-again-btn');
    }

    start(): void {
        this._tryAgainBtn.addEventListener('click', () => { this.onClickTryAgainBtn() });
        this.setGameOverMessage('You died with ' + this._game.distanceToTheBorder + ' miles to the border');
    }

    private onClickTryAgainBtn() {
        location.reload();
    }

    setGameOverMessage(message: string): void {
        this._gameOverMessage.innerHTML = message;
    }
}