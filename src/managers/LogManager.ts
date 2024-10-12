import { Character } from '../entities/Character';
import { Game } from '../Game';
import { GameStates } from '../enums/GameStates';

export enum LogType {
    Result,
    StatusChange
}

export class LogManager {
    private _logListResult: Element;
    private _tempResultLogs: string[] = [];
    private _tempoStatusChangeLogs: string[] = []; 
    private _logs: string[] = [];
    private _bagBtn: HTMLButtonElement;
    private _campBtn: HTMLButtonElement;
    private _yourFamily: HTMLButtonElement;
    private _charactersList: any;
    private _walkBtn: HTMLButtonElement;
    private _hoursSleeping: number;
    private _sleepIntervalId: any;
    private _travelledDistanceField: Element;
    private _progressBarCanvasElement: HTMLCanvasElement;
    private _progressBarCanvasContext: CanvasRenderingContext2D;

    private readonly _game: Game;

    constructor() {
        this._game = Game.getInstance();

        this._logListResult = document.querySelector("#log-list-result")!;

        this._bagBtn = document.querySelector('#bag-btn')!;
        this._bagBtn.addEventListener('click', () => { this.onClickBag() });

        this._campBtn = document.querySelector("#camp-btn")!;

        this._campBtn.addEventListener('click', () => { this.onClickCampBtn() });

        this._charactersList = [];

        this._walkBtn = document.querySelector("#walk-btn")!;
        this._walkBtn.addEventListener('click', () => { this.onClickWalkBtn() });

        this._travelledDistanceField = document.querySelector("#travelled-distance")!;
        this._progressBarCanvasElement = document.getElementById("progress-bar") as HTMLCanvasElement;

        this.showTravelledDistance();

        this.getAtributesPageElements();
    }

    start(): void {
        this.showLogs();

        if (this._game.bagManager.isEmpty()) {
            this._bagBtn.innerHTML = this._game.loc.l('bag-is-empty');
            this._bagBtn.disabled = true;
        } else {
            this._bagBtn.disabled = false;
            this._bagBtn.innerHTML = 'Open bag (' + this._game.bagManager.showQuantityOfItems() + ') ';
        }

        this._walkBtn.innerHTML = this._game.loc.l('walk-one-hour');

        this.showCharacters();
        this.checkCampBtn();
        this.showProgressBarCanvas();
    }

    showLogs(): void {
        this._logs = this._tempoStatusChangeLogs;
        this._tempoStatusChangeLogs = [];
        this._logListResult.innerHTML = '';
        this.showResultLogs();
    }

    private showResultLogs(): void {
        let count: number = 0;
        let result_logs = '';

        let stop = setInterval(() => {
            if (count < this._tempResultLogs.length) {
                this._game.audioManager.playWriteSound();
                result_logs += '<li>' + this._tempResultLogs[count] + '</li>';
                this._logListResult.innerHTML = result_logs;
                count++;
            } else {
                this._game.audioManager.playDingSound();
                clearInterval(stop);
                this._logs = this._tempResultLogs;
                this._tempResultLogs = [];
                this._game.characterManager.savePreviousCharacters();
            }
        }, 300);
    }

    createLogsForStatusChange(): string {
        let previousCharacters = this._game.characterManager.previousCharacters;
        let currentCharacters = this._game.characterManager.characters;

        let status_change_logs = '';
        
        for (let i = 0; i < previousCharacters.length; i++) {
            let previousCharacter = previousCharacters[i];
            let currentCharacter = currentCharacters[i];

            if (!currentCharacter.isDead) {
                if (previousCharacter.sanity != currentCharacter.sanity) {
                    status_change_logs += '<li> ' + currentCharacter.name + ' ';

                    status_change_logs += 'Sanity: '

                    if (previousCharacter.sanity != currentCharacter.sanity) {
                        if (previousCharacter.sanity > currentCharacter.sanity) {
                            status_change_logs += ' -' + (previousCharacter.sanity - currentCharacter.sanity) + '% ';
                        } else {
                            status_change_logs += ' +' + (currentCharacter.sanity - previousCharacter.sanity) + '% ';
                        }
                    }

                    status_change_logs += '</li>';
                }
            }
        }

        return status_change_logs;
    }

    clearLogs(): void {
        this._logListResult.innerHTML = '';
    }

    isThereAnyTemporaryLog(): boolean {
        return this._tempResultLogs.length > 0 || this._tempoStatusChangeLogs.length > 0;
    }

    addTempLog(log: string, logType: LogType) {
        if (logType == LogType.Result) {
            this._tempResultLogs.push(log);
        } else if (logType == LogType.StatusChange) {
            this._tempoStatusChangeLogs.push(log);
        }
    }

    onClickBag() {
        this._game.audioManager.playButtonSound();
        this._game.stateManager.goToState(GameStates.BAG);
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
            // this._game.characterManager.increaseStaminaOfAllCharactersToMax();
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

        let characters: Character[] = this._game.characterManager.getCharactersDead();

        for (let character of characters) {
            if (character.isDead && !character.buried) {
                this._game.stateManager.goToState(GameStates.RIP);
                return;
            }
        }

        this._game.stateManager.goToState(GameStates.EVENT);
    }

    getRandomArbitrary(min: number, max: number): number {
        return Math.random() * (max - min) + min;
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
                this._charactersList[i].nameField.innerHTML = character.name + ' - ' + character.kinship;
                this._charactersList[i].nameField.innerHTML += character.getSickness() == 'Sick' ? ' [ Sick ]' : '';
                this._charactersList[i].atributesField.innerHTML = character.getSanity();
                this._charactersList[i].afflictionsField.innerHTML = character.showAfflictions();
            }
        }
    }

    private showProgressBarCanvas(): void {
        this._progressBarCanvasElement.width = 300;
        this._progressBarCanvasElement.height = 8;
        this._progressBarCanvasContext = this._progressBarCanvasElement.getContext("2d")!;
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

    walkOneHour() {
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