import { Game, GameStates } from '../Game';
import { Character } from '../entities/Character';
import { LogType } from '../managers/LogManager';

export class TravelManager {
    private _travelPage: Element;
    private _travelImage: Element;
    private _travelledDistanceField: Element;
    private _progressBar: HTMLElement;
    private _walkBtn: HTMLButtonElement;
    private _campBtn: HTMLButtonElement;
    private _statsBtn: HTMLButtonElement;
    private _game: Game;
    private _charactersList: any;
    private _currentCharacterIndex: number;
    private _bagBtn: HTMLButtonElement;

    constructor() {
        this._game = Game.getInstance();
        
        this._travelPage = document.querySelector("#travel-page");
        this._travelImage = document.querySelector("#travel-img");
        this._travelledDistanceField = document.querySelector("#travelled-distance");
        this._progressBar = document.getElementById("progress-bar");
        this._walkBtn = document.querySelector("#walk-btn");
        this._campBtn = document.querySelector("#camp-btn");

        this._walkBtn.addEventListener('click', () => { this.onClickWalkBtn() });
        this._campBtn.addEventListener('click', () => { this.onClickCampBtn() });

        this.showTravelledDistance();

        this._charactersList = [];

        this._bagBtn = document.querySelector('#bag-btn');
        this._bagBtn.addEventListener('click', () => { this.onClickBag() });
        this._currentCharacterIndex = 0;
        this.getAtributesPageElements();
    }

    start(): void {
        /*
        if (this._game.characterManager.isInDanger()) {
            this._statsBtn.innerHTML = '⚠️Your Family';
        } else {
            this._statsBtn.innerHTML = 'Your Family';
        }*/

        if (this._game.bagManager.isEmpty()) {
            this._bagBtn.innerHTML = 'Bag is empty';
            this._bagBtn.disabled = true;
        } else {
            this._bagBtn.disabled = false;
            this._bagBtn.innerHTML = 'Open bag (' + this._game.bagManager.showQuantityOfItems() + ') ';
        }
        
        this.showCharacters();
    }

    onClickWalkBtn(): void {
        this._game.passOneHour();
        this.walkOneHour();
        let foundEvent = this.checkEvent();
        if (foundEvent) {
            this._game.goToState(GameStates.EVENT);
        } else if (this._game.log.isThereAnyTemporaryLog()) {

            let randomCharacter = this._game.characterManager.picksACharacterAtRandom();
            let walkMessages = [
                randomCharacter.name + ' is feeling anxious...',
                randomCharacter.name + ' is thoughtful...',
                randomCharacter.name + ' feels a tightness in the heart...',
                'The family continued walking...',
                'The walk was smooth...',
                'Nothing different...'
            ];

            const message: string = walkMessages[this._game.getRandomArbitrary(walkMessages.length - 1)];

            this._game.log.addTempLog(message, LogType.Result);
            this._game.goToState(GameStates.LOG);
        }
    }

    onClickBag() {
        this._game.goToState(GameStates.BAG);
    }

    onClickCampBtn(): void {
        this._game.passOneHour();
        this._game.goToState(GameStates.CAMP);
    }

    getAtributesPageElements(): void {
        this._charactersList[0] = {};
        this._charactersList[0].nameField = document.querySelector("#first-character-name-field");
        this._charactersList[0].atributesField = document.querySelector("#first-character-atributes-field");

        this._charactersList[1] = {};
        this._charactersList[1].nameField = document.querySelector("#second-character-name-field");
        this._charactersList[1].atributesField = document.querySelector("#second-character-atributes-field");

        this._charactersList[2] = {};
        this._charactersList[2].nameField = document.querySelector("#third-character-name-field");
        this._charactersList[2].atributesField = document.querySelector("#third-character-atributes-field");

        this._charactersList[3] = {};
        this._charactersList[3].nameField = document.querySelector("#fourth-character-name-field");
        this._charactersList[3].atributesField = document.querySelector("#fourth-character-atributes-field");
    }

    showCharacters(): void {
        let characters = this._game.characters;

        for (let i = 0; i < characters.length; i++){
            let character = characters[i];

            if (character.isDead) {
                this._charactersList[i].nameField.innerHTML = character.name + ' - ' + character.kinship + '💀';
                this._charactersList[i].atributesField.style.display = 'none';
            } else {
                this._charactersList[i].nameField.innerHTML = character.name + ' - ' + character.kinship;
                this._charactersList[i].nameField.innerHTML += character.getSickness() == 'Sick' ? ' [ Sick ]' : '';
                this._charactersList[i].atributesField.innerHTML = character.getHealth() + ' ' + character.getStamina() + ' ' 
                                                                 + character.getHungry();
            }
        }
    }

    checkEvent() {
        return this.getRandomArbitrary(1, 100) <= 50;
    }

    getRandomArbitrary(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    walkOneHour() {
        this._game.characterManager.decreaseStaminaOfAllCharacters(5);
        this._game.characterManager.increaseHungryOfAllCharacters();
        this._game.characterManager.increaseThirstOfAllCharacters();

        const characters: Character[] = this._game.characterManager.getCharactersAlive();
        
        for (let character of characters) {
            this._game.log.addTempLog(character.name + ' 🥫 -5%  ⚡ -5% 💧 -10%', LogType.StatusChange);
        }

        this._game.decreaseTheDistanceToTheBorder(2);
        this.increaseProgressBar();
        this._game.addLogToFirebase('Walk one hour');

        this.showTravelledDistance();
        
        if(this._game.distanceToTheBorder <= 0) {
            this.arrivedAtTheBorder();
        }
    }

    increaseProgressBar() {
        let progressBarLevel = 300 - this._game.distanceToTheBorder;
        this._progressBar.style.width = progressBarLevel * 1 + 'px';
    }

    getRandomCharacter() {
        return Math.floor(Math.random() * (this._game.characters.length));
    }

    showTravelledDistance() {
        this._travelledDistanceField.innerHTML = this._game.distanceToTheBorder + ' miles to the border';
    }

    arrivedAtTheBorder() {
        this._game.goToState(GameStates.GAME_OVER);
    }
}