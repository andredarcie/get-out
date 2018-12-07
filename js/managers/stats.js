import { Globals } from '../globals.js';

export class Stats {
    
    constructor(game) {
        this.game = game;

        this.nameField = document.querySelector("#name-field");
        this.relationshipField = document.querySelector("#relationship-field");
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

    start() {

    }

    onClickPreviousCharacter() {

    }

    onClickNextCharacter() {

    }

    onClickBackCharacter() {
        
    }
}