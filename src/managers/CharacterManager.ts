import { Game } from '../Game';
import { Character } from '../entities/Character';

export class CharacterManager {
    private readonly _game: Game;

    constructor() {
        this._game = Game.getInstance();
    }

    start() {

    }

    increaseHungryOfAllCharacters() {
        let characters = this.getCharactersAlive();
        for (let character of characters) {
            character.increaseHungry();
        }
    }

    decreaseStaminaOfAllCharacters(staminToDecrease: number) {
        let characters = this.getCharactersAlive();
        for (let character of characters) {
            character.decreaseStamina(staminToDecrease);
        }
    }

    increaseStaminaOfAllCharacters(staminToDecrease: number) {
        let characters = this.getCharactersAlive();
        for (let character of characters) {
            character.increaseStaminaToMax();
        }
    }

    getNumberOfCharactersAlive(): number {
        return this._game.characters.filter((character) => !character.isDead).length;
    }

    getCharactersAlive(): Character[] {
        return this._game.characters.filter((character) => !character.isDead);
    }

    isInDanger(): boolean {
        let characters = this.getCharactersAlive();
        for (let character of characters) {
            if (character.getHungry() == '[VERY HUNGRY]')
                return true;
        }

        return false;
    }
}