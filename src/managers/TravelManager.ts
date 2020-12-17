import { Game } from '../Game';
import { GameStates } from '../enums/GameStates';
import { Character } from '../entities/Character';
import { LogType } from '../managers/LogManager';

export class TravelManager {
    private _travelledDistanceField: Element;
    private _progressBar: HTMLElement;
    private _walkBtn: HTMLButtonElement;
    private _campBtn: HTMLButtonElement;
    private _yourFamily: HTMLButtonElement;
    private _game: Game;
    private _charactersList: any;
    private _bagBtn: HTMLButtonElement;

    constructor() {
        this._game = Game.getInstance();
        
        this._travelledDistanceField = document.querySelector("#travelled-distance");
        this._progressBar = document.getElementById("progress-bar");
        this._walkBtn = document.querySelector("#walk-btn");
        this._campBtn = document.querySelector("#camp-btn");
        this._yourFamily = document.querySelector('#your-family');

        this._walkBtn.addEventListener('click', () => { this.onClickWalkBtn() });
        this._campBtn.addEventListener('click', () => { this.onClickCampBtn() });

        this.showTravelledDistance();

        this._charactersList = [];

        this._bagBtn = document.querySelector('#bag-btn');
        this._bagBtn.addEventListener('click', () => { this.onClickBag() });
        this.getAtributesPageElements();
    }

    start(): void {
        this._walkBtn.innerHTML = this._game.loc.l('walk-one-hour');
        this._yourFamily.innerHTML = this._game.loc.l('your-family');
        this._campBtn.innerHTML = this._game.loc.l('camp-one-hour');
        /*
        if (this._game.characterManager.isInDanger()) {
            this._statsBtn.innerHTML = '⚠️Your Family';
        } else {
            this._statsBtn.innerHTML = 'Your Family';
        }*/

        if (this._game.bagManager.isEmpty()) {
            this._bagBtn.innerHTML = this._game.loc.l('bag-is-empty');
            this._bagBtn.disabled = true;
        } else {
            this._bagBtn.disabled = false;
            this._bagBtn.innerHTML = 'Open bag (' + this._game.bagManager.showQuantityOfItems() + ') ';
        }
        
        this.showCharacters();
    }

    onClickWalkBtn(): void {
        if (this._game.distanceToTheBorder == 300) {
            this._game.playRainSound();
        }
        
        this._game.playButtonSound();
        this._game.passOneHour();
        this.walkOneHour();
        let foundEvent = this.checkEvent();
        if (foundEvent) {
            this._game.stateManager.goToState(GameStates.EVENT);
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
            this._game.stateManager.goToState(GameStates.LOG);
        }
    }

    onClickBag() {
        this._game.playButtonSound();
        this._game.stateManager.goToState(GameStates.BAG);
    }

    onClickCampBtn(): void {
        this._game.playButtonSound();
        this._game.passOneHour();
        this._game.stateManager.goToState(GameStates.CAMP);
    }

    getAtributesPageElements(): void {
        this._charactersList[0] = {};
        this._charactersList[0].nameField = document.querySelector("#first-character-name-field");
        this._charactersList[0].atributesField = document.querySelector("#first-character-atributes-field");
        this._charactersList[0].afflictionsField = document.querySelector("#first-character-afflictions-field");

        this._charactersList[1] = {};
        this._charactersList[1].nameField = document.querySelector("#second-character-name-field");
        this._charactersList[1].atributesField = document.querySelector("#second-character-atributes-field");
        this._charactersList[1].afflictionsField = document.querySelector("#second-character-afflictions-field");

        this._charactersList[2] = {};
        this._charactersList[2].nameField = document.querySelector("#third-character-name-field");
        this._charactersList[2].atributesField = document.querySelector("#third-character-atributes-field");
        this._charactersList[2].afflictionsField = document.querySelector("#third-character-afflictions-field");

        this._charactersList[3] = {};
        this._charactersList[3].nameField = document.querySelector("#fourth-character-name-field");
        this._charactersList[3].atributesField = document.querySelector("#fourth-character-atributes-field");
        this._charactersList[3].afflictionsField = document.querySelector("#fourth-character-afflictions-field");
    }

    showCharacters(): void {
        let characters = this._game.characters;

        for (let i = 0; i < characters.length; i++){
            let character = characters[i];

            if (character.isDead) {
                this._charactersList[i].nameField.innerHTML = character.name + ' - ' + character.kinship + ' 💀';
                this._charactersList[i].atributesField.innerHTML = character.getDateOfBirth() + ' - 2020';
                this._charactersList[i].afflictionsField.innerHTML = '';
            } else {
                let healthPerHour: number = character.showHealthLostPerHourDueToAllAfflictions();
                this._charactersList[i].nameField.innerHTML = character.name + ' - ' + character.kinship;
                this._charactersList[i].nameField.innerHTML += character.getSickness() == 'Sick' ? ' [ Sick ]' : '';
                this._charactersList[i].atributesField.innerHTML = character.getHealth() + 
                                                                   (healthPerHour == 0 ? ' ' : (' -' + character.showHealthLostPerHourDueToAllAfflictions() + '% ')) + 
                                                                   character.getStamina() + ' ' 
                                                                 + character.getHungry();
                this._charactersList[i].afflictionsField.innerHTML = character.showAfflictions();
            }
        }
    }

    checkEvent() {
        return this.getRandomArbitrary(1, 100) <= 100;
    }

    getRandomArbitrary(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    walkOneHour() {
        this._game.characterManager.decreaseStaminaOfAllCharacters(5);
        this._game.characterManager.increaseHungryOfAllCharacters();

        const characters: Character[] = this._game.characterManager.getCharactersAlive();
        
        for (let character of characters) {
            character.walkOneHour();
        }

        this._game.decreaseTheDistanceToTheBorder(2);
        this.increaseProgressBar();

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
        this._travelledDistanceField.innerHTML = this._game.distanceToTheBorder + ' ' + this._game.loc.l('miles-to-the-border');
    }

    arrivedAtTheBorder() {
        this._game.stateManager.goToState(GameStates.GAME_OVER);
    }
}