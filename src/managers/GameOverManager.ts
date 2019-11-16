import { Game } from '../Game';

export class GameOverManager {
    private _gameOverMessage: Element;

    constructor() {
        this._gameOverMessage = document.querySelector("#game-over-message");
    }

    start(): void {
        let livingCharacters = 0;

        for (var i = 0; i < Game.characters.length; i++){
            const character = Game.characters[i];

            if (character.health > 0) {
                livingCharacters++;
            }
        }

        this.setGameOverMessage(livingCharacters + " of " + Game.characters.length + " survived!");
    }

    setGameOverMessage(message: string): void {
        this._gameOverMessage.innerHTML = message;
    }
}