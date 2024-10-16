import { Game } from '../Game';
import { Character } from '../entities/Character';
import { StatusSeeds } from '../seeds/AfflictionSeeds';

export class CharacterManager {
    public characters: Character[];
    public previousCharacters: Character[];
    public characterDmytro: Character;
    public characterOlena: Character;
    public characterMykola: Character;
    public characterSofiia: Character;
    public previousCharacterDmytro: Character;
    public previousCharacterOlena: Character;
    public previousCharacterMykola: Character;
    public previousCharacterSofiia: Character;
    private readonly _game: Game;

    constructor() {
        this._game = Game.getInstance();
        this.createAllCharacters();
        this.savePreviousCharacters();
        this.characters = [this.characterDmytro, this.characterOlena, this.characterMykola, this.characterSofiia];
        this.previousCharacters = [this.previousCharacterDmytro, this.previousCharacterOlena, this.previousCharacterMykola, this.previousCharacterSofiia];
    }

    start() {
        for (let i = 0; i < this.characters.length; i++) {
            const imgElement = document.getElementById("rip-page-image-" + (i + 1)) as HTMLImageElement;
            if (imgElement) {
                this.characters[i].imageURL = imgElement.src;
            }
        }
    }

    public getCharactersDead(): Character[] {
        return this.characters
        .filter(character => character.isDead);
    }

    private createAllCharacters(): void {
        this.characterDmytro = new Character('Dmytro', 'you', 100, '1985', false);
        this.characterOlena = new Character('Olena', 'wife', 100, '1988', false);
        this.characterMykola = new Character('Mykola', 'son', 100, '2003', false);
        this.characterSofiia = new Character('Sofiia', 'daughter', 100, '2005', false);
    }

    public savePreviousCharacters() {
        this.previousCharacterDmytro = this.cloneCharacter(this.characterDmytro);
        this.previousCharacterOlena = this.cloneCharacter(this.characterOlena);
        this.previousCharacterMykola = this.cloneCharacter(this.characterMykola);
        this.previousCharacterSofiia = this.cloneCharacter(this.characterSofiia);
    }

    private cloneCharacter(character: Character): Character {
        return new Character(
            character.name,
            character.kinship,
            character.sanity,
            character.getDateOfBirth(),
            character.isDead
        );
    }

    getNumberOfCharactersAlive(): number {
        return this.characters
            .filter(character => !character.isDead).length;
    }

    getCharactersAlive(): Character[] {
        return this.characters
            .filter(character => !character.isDead);
    }

    getFirstCharacterDeadAndNotBuried(): Character | undefined {
        return this.characters
            .find(character => character.isDead && !character.buried);
    }

    isInDanger(): boolean {
        return this.getCharactersAlive().some(character => character.sanity <= 25);
    }

    picksACharacterAtRandom(): Character {
        const characters = this.getCharactersAlive();
        const randomNumber = Math.floor(this._game.getRandomArbitrary(characters.length));
        return characters[randomNumber];
    }

    makeSomeoneInTheGroupGetStatus(characterName: string, status: string): Character {
        const character = this.getCharacterByName(characterName);
        character.setStatus(StatusSeeds.getStatusByName(status));
        return character;
    }

    getCharacterByName(characterName: string): Character {
        return this.characters.find(character => character.name === characterName)!;
    }

    decreasesTheHealthOfSomeoneInTheGroup(): Character {
        const character = this.picksACharacterAtRandom();
        character.looseSanity(30);
        return character;
    }

    public statusOfTheCharactersChange(): boolean {
        const currentCharacters = this.characters;
        const previousCharacters = this.previousCharacters;

        for (let i = 0; i < currentCharacters.length; i++) {
            if (!previousCharacters[i].isDead && previousCharacters[i].sanity !== currentCharacters[i].sanity) {
                this.savePreviousCharacters();
                return true;
            }
        }
        return false;
    }
}