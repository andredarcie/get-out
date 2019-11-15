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

    increaseHungryOfAllCharacters() {
        let characters = Game.characters;
        for (let character of characters) {
            character.increaseHungry();
        }
    }
}