import { Globals } from '../Globals.js';

export class CharacterManager {

    constructor() {

    }

    start() {

    }

    checkIfAllCharactersAreDead() {
        let characters = Globals.characters;

        return characters.every((character) => character.isDead);
    }
}