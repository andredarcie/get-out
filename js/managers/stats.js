import { Globals } from '../globals.js';

export class Stats {
    
    constructor(game) {
        this.game = game;
        this.currentCharacterIndex = 0;

        this.getPageElements();
    }

    start() {
        this.showCurrentCharacter();
    }

    getPageElements() {

        this.nameField = document.querySelector("#name-field");
        this.kinshipField = document.querySelector("#kinship-field");
        this.thinkingField = document.querySelector("#thinking-field");
        this.healthField = document.querySelector("#health-field");
        this.woundsField = document.querySelector("#wounds-field");
        this.hungerField = document.querySelector("#hunger-field");
        this.fatigueField = document.querySelector("#fatigue-field");
        this.feelingField = document.querySelector("#feeling-field");
        this.itemField = document.querySelector("#item-field");
        this.previousCharacterBtn = document.querySelector("#previous-character-btn");
        this.nextCharacterBtn = document.querySelector("#next-character-btn");
        this.backCharacterBtn = document.querySelector("#back-character-btn");

        this.previousCharacterBtn.addEventListener('click', (e) => { this.onClickPreviousCharacter(e) });
        this.nextCharacterBtn.addEventListener('click', (e) => { this.onClickNextCharacter(e) });
        this.backCharacterBtn.addEventListener('click', (e) => { this.onClickBackCharacter(e) });
    }

    onClickPreviousCharacter() {

        if (this.currentCharacterIndex > 0) {
            this.currentCharacterIndex--;
        }

        this.showCurrentCharacter();
    }

    onClickNextCharacter() {

        if (this.currentCharacterIndex < (Globals.characters.length - 1)) {
            this.currentCharacterIndex++;
        }

        this.showCurrentCharacter();
    }

    showCurrentCharacter() {
        let currentCharacter = Globals.characters[this.currentCharacterIndex];
        this.nameField.innerHTML = 'Name: ' + currentCharacter.name;
        this.healthField.innerHTML = 'Health: ' + currentCharacter.health;
        this.kinshipField.innerHTML = 'Kinship: ' + currentCharacter.kinship;
    }

    onClickBackCharacter() {
        this.game.goToState(Globals.gameStates.CAMP);
    }
}