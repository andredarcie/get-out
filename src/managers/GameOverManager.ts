import { Game } from '../Game';

export class GameOverManager {
    private _gameOverMessage: Element;
    private _gameOverTitle: HTMLElement;
    private readonly _game: Game;
    private _tryAgainBtn: Element;

    constructor() {
        this._game = Game.getInstance();
        this._gameOverMessage = document.querySelector("#game-over-message")!;
        this._gameOverTitle = document.querySelector("#game-over-page h1")!;
        this._tryAgainBtn = document.querySelector('#try-again-btn')!;
    }

    start(): void {
        this._tryAgainBtn.addEventListener('click', () => { this.onClickTryAgainBtn() });
        const message = this._game.state.gameOverMessage || 'A família não conseguiu sobreviver à travessia.';
        this._gameOverTitle.textContent = this._game.state.isVictoryEnding ? 'Vitória' : 'Game over';
        this._gameOverTitle.style.color = this._game.state.isVictoryEnding ? 'var(--c-ok)' : 'var(--c-accent)';
        this.setGameOverMessage(message);
    }

    private onClickTryAgainBtn() {
        this._game.audioManager.playButtonSound();
        location.reload();
    }

    setGameOverMessage(message: string): void {
        this._gameOverMessage.innerHTML = message;
    }
}
