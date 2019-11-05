import { Globals } from '../Globals.js';

export class StatsManager {
    
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
        this.characters[0].healthField = document.querySelector("#first-character-health-field");
        this.characters[0].atributesField = document.querySelector("#first-character-atributes-field");

        this.characters[1] = {};
        this.characters[1].nameField = document.querySelector("#second-character-name-field");
        this.characters[1].healthField = document.querySelector("#second-character-health-field");
        this.characters[1].atributesField = document.querySelector("#second-character-atributes-field");

        this.characters[2] = {};
        this.characters[2].nameField = document.querySelector("#third-character-name-field");
        this.characters[2].healthField = document.querySelector("#third-character-health-field");
        this.characters[2].atributesField = document.querySelector("#third-character-atributes-field");

        this.characters[3] = {};
        this.characters[3].nameField = document.querySelector("#fourth-character-name-field");
        this.characters[3].healthField = document.querySelector("#fourth-character-health-field");
        this.characters[3].atributesField = document.querySelector("#fourth-character-atributes-field");

        this.characters[4] = {};
        this.characters[4].nameField = document.querySelector("#fifth-character-name-field");
        this.characters[4].healthField = document.querySelector("#fifth-character-health-field");
        this.characters[4].atributesField = document.querySelector("#fifth-character-atributes-field");

        this.backCharacterBtn = document.querySelector("#back-character-btn");

        this.backCharacterBtn.addEventListener('click', (e) => { this.onClickBackCharacter(e) });
    }

    showCharacters() {
        let characters = Globals.characters;

        for (let [index, character] of characters.entries()){
            this.characters[index].nameField.innerHTML = character.name + ' - ' + character.kinship;
            this.characters[index].healthField.innerHTML = character.isDead
                                                        ? 'Is Dead'
                                                        : 'Health: ' + character.health;
            this.characters[index].atributesField.innerHTML = (character.sick ? ' [SICK] ' : '') +
                                                              (character.hungry ? ' [HUNGRY] ' : '') +
                                                              (character.cold ? ' [COLD] ' : '');
        }
    }

    onClickBackCharacter() {
        this.game.goToState(Globals.gameStates.TRAVEL);
    }
}