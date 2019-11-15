import { Game, GameStates } from '../Game';

export class StatsManager {
    currentCharacterIndex: number;
    charactersList: any;
    backCharacterBtn: Element;

    constructor() {
        this.currentCharacterIndex = 0;
        this.charactersList = [];

        this.getPageElements();
    }

    start(): void {
        this.showCharacters();
    }

    getPageElements(): void {
        
        this.charactersList[0] = {};
        this.charactersList[0].nameField = document.querySelector("#first-character-name-field");
        this.charactersList[0].healthField = document.querySelector("#first-character-health-field");
        this.charactersList[0].atributesField = document.querySelector("#first-character-atributes-field");

        this.charactersList[1] = {};
        this.charactersList[1].nameField = document.querySelector("#second-character-name-field");
        this.charactersList[1].healthField = document.querySelector("#second-character-health-field");
        this.charactersList[1].atributesField = document.querySelector("#second-character-atributes-field");

        this.charactersList[2] = {};
        this.charactersList[2].nameField = document.querySelector("#third-character-name-field");
        this.charactersList[2].healthField = document.querySelector("#third-character-health-field");
        this.charactersList[2].atributesField = document.querySelector("#third-character-atributes-field");

        this.charactersList[3] = {};
        this.charactersList[3].nameField = document.querySelector("#fourth-character-name-field");
        this.charactersList[3].healthField = document.querySelector("#fourth-character-health-field");
        this.charactersList[3].atributesField = document.querySelector("#fourth-character-atributes-field");

        this.charactersList[4] = {};
        this.charactersList[4].nameField = document.querySelector("#fifth-character-name-field");
        this.charactersList[4].healthField = document.querySelector("#fifth-character-health-field");
        this.charactersList[4].atributesField = document.querySelector("#fifth-character-atributes-field");

        this.backCharacterBtn = document.querySelector("#back-character-btn");
        this.backCharacterBtn.addEventListener('click', () => { this.onClickBackCharacter() });
    }

    showCharacters(): void {
        let characters = Game.characters;

        for (let i = 0; i < characters.length; i++){
            let character = characters[i];
            this.charactersList[i].nameField.innerHTML = character.name + ' - ' + character.kinship;

            if (character.isDead) {
                this.charactersList[i].healthField.innerHTML = 'Is Dead';
                this.charactersList[i].atributesField.style.display = 'none';
            } else {
                this.charactersList[i].healthField.innerHTML = 'Health: ' + character.health;
                this.charactersList[i].atributesField.innerHTML = character.getHungry();
            }
        }
    }

    onClickBackCharacter(): void {
        Game.goToState(GameStates.TRAVEL);
    }
}