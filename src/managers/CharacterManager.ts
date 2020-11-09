import { Game } from '../Game';
import { Character } from '../entities/Character';

export class CharacterManager {
    private readonly _game: Game;

    constructor() {
        this._game = Game.getInstance();
    }

    start() {
        for (let i = 0; i < this._game.characters.length; i++) {
            this._game.characters[i].imageURL = (document.getElementById("rip-page-image-" + (i + 1)) as HTMLImageElement).src;
        }
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

    getCharactersDead(): Character[] {
        return this._game.characters.filter((character) => character.isDead);
    }

    getFirstCharacterDeadAndNotBuried(): Character {
        return this._game.characters.find((character) => character.isDead && !character.buried);
    }


    isInDanger(): boolean {
        let characters = this.getCharactersAlive();
        for (let character of characters) {
            if (character.health <= 25 || character.stamina <= 25 ||
                character.hungry <= 25)
                return true;
        }

        return false;
    }

    picksACharacterAtRandom(): Character {
        let characters = this.getCharactersAlive();
        let randomNumber = this._game.getRandomArbitrary(characters.length - 1);
        let character: Character = characters[randomNumber];
        return character;
    }

    makeSomeoneInTheGroupSick(): Character {
        let character: Character = this.picksACharacterAtRandom();
        character.sicken();
        return character;
    }

    decreasesTheHealthOfSomeoneInTheGroup(): Character {
        let character: Character = this.picksACharacterAtRandom();
        character.looseHealth(1);
        return character;
    }
}