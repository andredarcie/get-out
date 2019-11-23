import { Game } from '../Game';

export class GameOverManager {
    private _gameOverMessage: Element;
    private readonly _game: Game;

    constructor() {
        this._gameOverMessage = document.querySelector("#game-over-message");
        this._game = Game.getInstance();
    }

    start(): void {
        let livingCharacters = 0;

        for (var i = 0; i < this._game.characters.length; i++){
            const character = this._game.characters[i];

            if (character.health > 0) {
                livingCharacters++;
            }
        }

        this.setGameOverMessage(livingCharacters + " of " + this._game.characters.length + " survived!");
    }

    setGameOverMessage(message: string): void {
        this._gameOverMessage.innerHTML = message;
    }
}