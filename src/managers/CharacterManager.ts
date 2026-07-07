import { Game } from '../Game';
import { Character } from '../entities/Character';
import { StatusSeeds } from '../seeds/AfflictionSeeds';
import { LogType } from './LogManager';

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

    picksACharacterAtRandom(): Character {
        const characters = this.getCharactersAlive();
        const randomNumber = Math.floor(this._game.state.getRandomArbitrary(characters.length));
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

    /**
     * Chamado quando um familiar (não o jogador) morre.
     * O luto atinge todos os sobreviventes — nunca mata, mas marca.
     */
    public onCharacterDied(dead: Character): void {
        this._game.log.addTempLog(`${dead.name} se foi.`, LogType.Result);

        const survivors = this.getCharactersAlive();
        survivors.forEach(survivor => survivor.sufferGrief(25));

        if (survivors.length > 0) {
            this._game.log.addTempLog('Luto. −25 nos vivos.', LogType.Result);
        }
    }

    /**
     * Evitar tem preço: −10 em quem se cala e −4 em quem assiste.
     * Uma família que só foge afunda inteira.
     */
    public applyAvoidCost(character: Character): void {
        character.looseSanity(10);
        this.getCharactersAlive()
            .filter(other => other !== character)
            .forEach(other => other.looseSanity(4));
    }

    /**
     * Falha em teste: dano base, agravado em 50% se o personagem
     * já rolou com a mente rachada (aflição ativa). Aplica a nova
     * aflição e devolve o dano real para o log.
     */
    public applyCheckFailure(character: Character, baseDamage: number, afflictionName: string): number {
        const aggravated = character.hasAffliction();
        const damage = Math.round(baseDamage * (aggravated ? 1.5 : 1));

        character.looseSanity(damage);

        if (!character.isDead) {
            this.makeSomeoneInTheGroupGetStatus(character.name, afflictionName);
        }

        if (aggravated) {
            this._game.log.addTempLog('Mente rachada. A queda é pior.', LogType.Result);
        }

        return damage;
    }
}
