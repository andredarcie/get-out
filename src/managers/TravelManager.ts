import { Game } from '../Game';
import { GameStates } from '../enums/GameStates';
import { Character } from '../entities/Character';
import { LogType } from '../managers/LogManager';

export class TravelManager {
    private _travelledDistanceField: Element;
    private _progressBarCanvasElement: HTMLCanvasElement;
    private _progressBarCanvasContext: CanvasRenderingContext2D;
    private _walkBtn: HTMLButtonElement;
    private _campBtn: HTMLButtonElement;
    private _yourFamily: HTMLButtonElement;
    private _game: Game;
    private _charactersList: any;
    private _bagBtn: HTMLButtonElement;
    private _hoursSleeping: number;
    private _sleepIntervalId: any;

    constructor() {
        this._game = Game.getInstance();
        
        this._travelledDistanceField = document.querySelector("#travelled-distance");
        this._progressBarCanvasElement = document.getElementById("progress-bar") as HTMLCanvasElement;
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
        this.showProgressBarCanvas();
        this._walkBtn.innerHTML = this._game.loc.l('walk-one-hour');
        this._yourFamily.innerHTML = this._game.loc.l('your-family');
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
        this.checkCampBtn();
    }

    private showProgressBarCanvas(): void {
        this._progressBarCanvasElement.width = 300;
        this._progressBarCanvasElement.height = 8;
        this._progressBarCanvasContext = this._progressBarCanvasElement.getContext("2d");
        this.drawBackground();
        console.log(this._game.distanceToTheBorder);
        this.drawPlayerPositionOnProgressBarCanvas(300 - this._game.distanceToTheBorder);
    }

    private drawBackground(): void {
        this._progressBarCanvasContext.clearRect(0, 0, this._progressBarCanvasElement.width, this._progressBarCanvasElement.height);
        this._progressBarCanvasContext.beginPath();
        
        this._progressBarCanvasContext.fillStyle = 'black';
        this._progressBarCanvasContext.fillRect(0,0, this._progressBarCanvasElement.width, this._progressBarCanvasElement.height);
      
        this._progressBarCanvasContext.strokeStyle = "#2c3e50";
        this._progressBarCanvasContext.lineWidth = 1;
      
        this._progressBarCanvasContext.moveTo(10, this._progressBarCanvasElement.height / 2);
        this._progressBarCanvasContext.lineTo(300 - 10, this._progressBarCanvasElement.height / 2);
        this._progressBarCanvasContext.stroke();
      
        this._progressBarCanvasContext.moveTo(10, (this._progressBarCanvasElement.height / 2) - 5);
        this._progressBarCanvasContext.lineTo(10, (this._progressBarCanvasElement.height / 2) + 5);
        this._progressBarCanvasContext.stroke();
      
        this._progressBarCanvasContext.moveTo(this._progressBarCanvasElement.width / 2, (this._progressBarCanvasElement.height / 2) - 5);
        this._progressBarCanvasContext.lineTo(this._progressBarCanvasElement.width / 2, (this._progressBarCanvasElement.height / 2) + 5);
        this._progressBarCanvasContext.stroke();

        this._progressBarCanvasContext.moveTo(this._progressBarCanvasElement.width / 4, (this._progressBarCanvasElement.height / 2) - 5);
        this._progressBarCanvasContext.lineTo(this._progressBarCanvasElement.width / 4, (this._progressBarCanvasElement.height / 2) + 5);
        this._progressBarCanvasContext.stroke();
        
        this._progressBarCanvasContext.moveTo((this._progressBarCanvasElement.width / 4) * 3, (this._progressBarCanvasElement.height / 2) - 5);
        this._progressBarCanvasContext.lineTo((this._progressBarCanvasElement.width / 4) * 3, (this._progressBarCanvasElement.height / 2) + 5);
        this._progressBarCanvasContext.stroke();
      
        this._progressBarCanvasContext.moveTo(this._progressBarCanvasElement.width - 10, (this._progressBarCanvasElement.height / 2) - 5);
        this._progressBarCanvasContext.lineTo(this._progressBarCanvasElement.width - 10, (this._progressBarCanvasElement.height / 2) + 5);
        this._progressBarCanvasContext.stroke();
      
        this._progressBarCanvasContext.beginPath();
        this._progressBarCanvasContext.moveTo(this._progressBarCanvasElement.width - 10, (this._progressBarCanvasElement.height / 2) - 5);
        this._progressBarCanvasContext.lineTo(this._progressBarCanvasElement.width - 10, (this._progressBarCanvasElement.height / 2) + 5);
        this._progressBarCanvasContext.stroke();
        this._progressBarCanvasContext.closePath();
    }

    private drawPlayerPositionOnProgressBarCanvas(mile: number): void {
        const lineSize = this._progressBarCanvasElement.width - 20;
        const unit = lineSize / 300;
        const unitsToWalk = mile * unit;
        
        this._progressBarCanvasContext.beginPath();
        this._progressBarCanvasContext.arc(unitsToWalk + 10, this._progressBarCanvasElement.height / 2, 3.5, 0, 2 * Math.PI);
        this._progressBarCanvasContext.lineWidth = 0;
        this._progressBarCanvasContext.fillStyle = "#27ae60";
        this._progressBarCanvasContext.fill();
    }

    onClickCampBtn(): void {
        this._bagBtn.disabled = true;
        this._campBtn.disabled = true;
        this._walkBtn.disabled = true;
        this._yourFamily.innerHTML = 'Camping...';
        this._hoursSleeping = 0;
        this._sleepIntervalId = window.setInterval(() => this.sleeping(), 500);
    }

    sleeping(): void {
        if (this._hoursSleeping <= 6) {
            let characters = this._game.characters;

            for (let i = 0; i < characters.length; i++){
                let character = characters[i];
    
                if (!character.isDead) {
                    const randomNumber = this._game.getRandomArbitrary(3);
                    this._charactersList[i].atributesField.innerHTML = randomNumber == 0 ? "Zzz" : randomNumber == 1 ? "zZz" : "zzZ";
                }
            }

            this._game.passOneHour();
            this._hoursSleeping++;
        } else {
            this._game.characterManager.increaseStaminaOfAllCharactersToMax();
            this.showCharacters();
            this._bagBtn.disabled = false;
            this._campBtn.disabled = false;
            this._walkBtn.disabled = false;
            this._yourFamily.innerHTML = this._game.loc.l('your-family');
            clearInterval(this._sleepIntervalId);
        }
    }

    onClickWalkBtn(): void {
        if (this._game.distanceToTheBorder == 300) {
            this._game.audioManager.playRainSound();
        }
        
        this._game.audioManager.playButtonSound();
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

        this.checkCampBtn();
    }

    checkCampBtn(): void {
        if (this._game.isDayLight()) {
            this._campBtn.disabled = true;
            this._campBtn.innerHTML = "It's not safe to camp";
        } else {
            this._campBtn.disabled = false;
            this._campBtn.innerHTML = 'Camp (+6 hour)';
        }
    }

    onClickBag() {
        this._game.audioManager.playButtonSound();
        this._game.stateManager.goToState(GameStates.BAG);
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
                let healthPerHour: number = character.showHealthLostPerHourDueToAllStatus();
                this._charactersList[i].nameField.innerHTML = character.name + ' - ' + character.kinship;
                this._charactersList[i].nameField.innerHTML += character.getSickness() == 'Sick' ? ' [ Sick ]' : '';
                this._charactersList[i].atributesField.innerHTML = character.getHealth() + 
                                                                   (healthPerHour == 0 ? ' ' : (' <span class="character-afflictions-field">(-' + character.showHealthLostPerHourDueToAllStatus() + '%) </span>')) + 
                                                                   character.getStamina() + ' ' 
                                                                 + character.getHungry();
                this._charactersList[i].afflictionsField.innerHTML = character.showAfflictions();
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

        const characters: Character[] = this._game.characterManager.getCharactersAlive();
        
        for (let character of characters) {
            character.walkOneHour();
        }

        this._game.decreaseTheDistanceToTheBorder(2);

        this.showTravelledDistance();
        
        if(this._game.distanceToTheBorder <= 0) {
            this.arrivedAtTheBorder();
        }
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