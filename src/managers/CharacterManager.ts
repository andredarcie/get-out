import { Game } from '../Game';
import { Character } from '../entities/Character';
import { StatusSeeds } from '../seeds/AfflictionSeeds';

export class CharacterManager {
    public previousCharacters: Character[] = [];
    public characters: Character[] = [];
    private readonly _game: Game;

    constructor() {
        this._game = Game.getInstance();
        this.createAllCharacters();
        this.savePreviousCharacters();
    }

    start() {
        for (let i = 0; i < this._game.characters.length; i++) {
            this._game.characters[i].imageURL = (document.getElementById("rip-page-image-" + (i + 1)) as HTMLImageElement).src;
        }
    }

    private createAllCharacters(): void {
        this.characters.push(new Character('Ethan', 'you', 100, 100, 100, '1985', false));
        this.characters.push(new Character('Olivia', 'wife', 100, 100, 100, '1988', false));
        this.characters.push(new Character('Michael', 'son', 100, 100, 100, '2003', false));
        this.characters.push(new Character('Sophia', 'daughter', 100, 100, 100, '2005', false));
    }

    public savePreviousCharacters() {
        this.previousCharacters = [];
        for (let character of this.characters) {
            this.previousCharacters.push(new Character(character.name, 
                                                       character.kinship, 
                                                       character.health, 
                                                       character.stamina, 
                                                       character.hungry, 
                                                       character.getDateOfBirth(), character.isDead))
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

    makeSomeoneInTheGroupGetStatus(status?: string): Character {
        let character: Character = this.picksACharacterAtRandom();
        if (status != null) {
            character.addStatus(StatusSeeds.getStatusByName(status));
        } else {
            character.addStatus(StatusSeeds.getOneRandomStatus());
        }
        return character;
    }

    decreasesTheHealthOfSomeoneInTheGroup(): Character {
        let character: Character = this.picksACharacterAtRandom();
        character.looseHealth(30);
        return character;
    }

    public statusOfTheCharactersChange(): boolean {
        for (let i = 0; i < this.previousCharacters.length; i++) {
            if(!this.previousCharacters[i].isDead &&
                (this.previousCharacters[i].health != this.characters[i].health ||
                 this.previousCharacters[i].stamina != this.characters[i].stamina ||
                 this.previousCharacters[i].hungry != this.characters[i].hungry)) {
                this.previousCharacters = this.characters;
                return true;
            }
        }
        return false;
    }
}