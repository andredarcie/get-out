import { Globals } from '../globals.js';

export class GameOver {
    
    constructor(game) {
        this.game = game;

        this.gameOverMessage = document.querySelector("#game-over-message");
    }

    start() {

        let livingCharacters = 0;

        for (var i = 0; i < Globals.characters.length; i++){
            const character = Globals.characters[i];

            if (character.health > 0) {
                livingCharacters++;
            }
        }

        this.setGameOverMessage(livingCharacters + " survived!");
    }

    setGameOverMessage(message) {
        this.gameOverMessage.innerHTML = message;
    }
}