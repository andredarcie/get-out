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
        this.characters.push(new Character('Dmytro', 'you', 100, '1985', false));
        this.characters.push(new Character('Olena', 'wife', 100, '1988', false));
        this.characters.push(new Character('Mykola', 'son', 100, '2003', false));
        this.characters.push(new Character('Sofiia', 'daughter', 100, '2005', false));
    }

    public savePreviousCharacters() {
        this.previousCharacters = [];
        for (let character of this.characters) {
            this.previousCharacters.push(new Character(character.name, 
                                                       character.kinship, 
                                                       character.sanity, 
                                                       character.getDateOfBirth(), 
                                                       character.isDead))
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
            if (character.sanity <= 25)
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

    makeSomeoneInTheGroupGetStatus(status: string): Character {
        let character: Character = this.picksACharacterAtRandom();
        character.addStatus(StatusSeeds.getStatusByName(status));
        return character;
    }

    decreasesTheHealthOfSomeoneInTheGroup(): Character {
        let character: Character = this.picksACharacterAtRandom();
        character.looseSanity(30);
        return character;
    }

    public statusOfTheCharactersChange(): boolean {
        for (let i = 0; i < this.previousCharacters.length; i++) {
            if(!this.previousCharacters[i].isDead &&
                (this.previousCharacters[i].sanity != this.characters[i].sanity)) {
                this.previousCharacters = this.characters;
                return true;
            }
        }
        return false;
    }
}