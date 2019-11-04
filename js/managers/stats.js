import { Globals } from '../globals.js';

export class Stats {
    
    constructor(game) {
        this.game = game;
        this.currentCharacterIndex = 0;
        this.characters = [];

        this.getPageElements();
    }

    start() {
        this.showCharacters();
    }

    getPageElements() {
        
        this.characters[0] = {};
        this.characters[0].nameField = document.querySelector("#first-character-name-field");
        this.characters[0].kinshipField = document.querySelector("#first-character-kinship-field");
        this.characters[0].healthField = document.querySelector("#first-character-health-field");

        this.characters[1] = {};
        this.characters[1].nameField = document.querySelector("#second-character-name-field");
        this.characters[1].kinshipField = document.querySelector("#second-character-kinship-field");
        this.characters[1].healthField = document.querySelector("#second-character-health-field");

        this.characters[2] = {};
        this.characters[2].nameField = document.querySelector("#third-character-name-field");
        this.characters[2].kinshipField = document.querySelector("#third-character-kinship-field");
        this.characters[2].healthField = document.querySelector("#third-character-health-field");

        this.characters[3] = {};
        this.characters[3].nameField = document.querySelector("#fourth-character-name-field");
        this.characters[3].kinshipField = document.querySelector("#fourth-character-kinship-field");
        this.characters[3].healthField = document.querySelector("#fourth-character-health-field");

        this.characters[4] = {};
        this.characters[4].nameField = document.querySelector("#fifth-character-name-field");
        this.characters[4].kinshipField = document.querySelector("#fifth-character-kinship-field");
        this.characters[4].healthField = document.querySelector("#fifth-character-health-field");

        this.backCharacterBtn = document.querySelector("#back-character-btn");

        this.backCharacterBtn.addEventListener('click', (e) => { this.onClickBackCharacter(e) });
    }

    showCharacters() {
        let characters = Globals.characters;

        for (let [index, character] of characters.entries()){
            this.characters[index].nameField.innerHTML = 'Name: ' + character.name;
            this.characters[index].kinshipField.innerHTML = 'Kinship: ' + character.kinship;
            this.characters[index].healthField.innerHTML = character.health 
                                                        ? 'Health: ' + character.health
                                                        : 'Is Dead';
        }
    }

    onClickBackCharacter() {
        this.game.goToState(Globals.gameStates.TRAVEL);
    }
}