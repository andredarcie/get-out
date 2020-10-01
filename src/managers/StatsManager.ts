import { Game, GameStates } from '../Game';

export class StatsManager {
    private _currentCharacterIndex: number;
    private _charactersList: any;
    private _backCharacterBtn: Element;
    private _bagBtn: HTMLButtonElement;
    private readonly _game: Game;

    constructor() {
        this._game = Game.getInstance();

        this._bagBtn = document.querySelector('#bag-btn');
        this._bagBtn.addEventListener('click', () => { this.onClickBag() });
        this._currentCharacterIndex = 0;
        this._charactersList = [];

        this.getPageElements();
    }

    onClickBag() {
        this._game.goToState(GameStates.BAG);
    }

    start(): void {
        if (this._game.bagManager.isEmpty()) {
            this._bagBtn.innerHTML = 'Bag is empty';
            this._bagBtn.disabled = true;
        } else {
            this._bagBtn.disabled = false;
            this._bagBtn.innerHTML = 'Open bag';
        }
        
        this.showCharacters();
    }

    getPageElements(): void {
        
        this._charactersList[0] = {};
        this._charactersList[0].nameField = document.querySelector("#first-character-name-field");
        this._charactersList[0].healthField = document.querySelector("#first-character-health-field");
        this._charactersList[0].atributesField = document.querySelector("#first-character-atributes-field");

        this._charactersList[1] = {};
        this._charactersList[1].nameField = document.querySelector("#second-character-name-field");
        this._charactersList[1].healthField = document.querySelector("#second-character-health-field");
        this._charactersList[1].atributesField = document.querySelector("#second-character-atributes-field");

        this._charactersList[2] = {};
        this._charactersList[2].nameField = document.querySelector("#third-character-name-field");
        this._charactersList[2].healthField = document.querySelector("#third-character-health-field");
        this._charactersList[2].atributesField = document.querySelector("#third-character-atributes-field");

        this._charactersList[3] = {};
        this._charactersList[3].nameField = document.querySelector("#fourth-character-name-field");
        this._charactersList[3].healthField = document.querySelector("#fourth-character-health-field");
        this._charactersList[3].atributesField = document.querySelector("#fourth-character-atributes-field");

        this._backCharacterBtn = document.querySelector("#back-character-btn");
        this._backCharacterBtn.addEventListener('click', () => { this.onClickBackCharacter() });
    }

    showCharacters(): void {
        let characters = this._game.characters;

        for (let i = 0; i < characters.length; i++){
            let character = characters[i];
            this._charactersList[i].nameField.innerHTML = character.name + ' - ' + character.kinship;

            if (character.isDead) {
                this._charactersList[i].healthField.innerHTML = 'Is Dead';
                this._charactersList[i].atributesField.style.display = 'none';
            } else {
                this._charactersList[i].healthField.innerHTML = ' [ ' + character.getHealth() + ' ] [ ' + character.getThirst() + ' ] ';
                this._charactersList[i].atributesField.innerHTML = ' [ ' + character.getHungry() + ' ] [ ' + character.getStamina() + ' ] [ ' + character.getSickness() + ' ] ';
            }
        }
    }

    onClickBackCharacter(): void {
        this._game.goToState(GameStates.TRAVEL);
    }
}