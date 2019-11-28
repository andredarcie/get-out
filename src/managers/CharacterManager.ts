import { Game } from '../Game';

export class CharacterManager {
    private readonly _game: Game;

    constructor() {
        this._game = Game.getInstance();
    }

    start() {

    }

    increaseHungryOfAllCharacters() {
        let characters = this._game.characters;
        for (let character of characters) {
            if (!character.isDead) {
                character.increaseHungry();
            }
        }
    }

    getNumberOfCharactersAlive(): number {
        return this._game.characters.filter((character) => !character.isDead).length;
    }
}