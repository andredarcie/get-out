import { Game } from '../Game';

export class CharacterManager {
    constructor() {
    }

    start() {

    }

    checkIfAllCharactersAreDead(): boolean {
        let characters = Game.characters;

        return characters.every((character) => character.isDead);
    }
}