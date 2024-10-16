import { Character } from '../entities/Character';
import { Game } from '../Game';
import { GameStates } from '../enums/GameStates';

export enum LogType {
    Result,
    StatusChange,
}

export class LogManager {
    private _logListResult: Element;
    private _tempResultLogs: string[] = [];
    private _tempoStatusChangeLogs: string[] = [];
    private _logs: string[] = [];
    private _bagBtn: HTMLButtonElement;
    private _yourFamily: HTMLButtonElement;
    private _charactersList: any;
    private _walkBtn: HTMLButtonElement;
    private _hoursSleeping: number = 0;
    private _sleepIntervalId: any;
    private _travelledDistanceField: Element;
    private _progressBarCanvasElement: HTMLCanvasElement;
    private _progressBarCanvasContext: CanvasRenderingContext2D;
    private readonly _game: Game;

    constructor() {
        this._game = Game.getInstance();
        this.initializeElements();
        this.addEventListeners();
        this.showTravelledDistance();
        this.getAtributesPageElements();
    }

    private initializeElements(): void {
        this._logListResult = document.querySelector("#log-list-result")!;
        this._bagBtn = document.querySelector('#bag-btn')!;
        this._walkBtn = document.querySelector("#walk-btn")!;
        this._yourFamily = document.querySelector("#your-family")!;
        this._travelledDistanceField = document.querySelector("#travelled-distance")!;
        this._progressBarCanvasElement = document.getElementById("progress-bar") as HTMLCanvasElement;
        this._charactersList = [];
    }

    private addEventListeners(): void {
        this._bagBtn.addEventListener('click', () => this.onClickBag());
        this._walkBtn.addEventListener('click', () => this.onClickWalkBtn());
    }

    start(): void {
        this.showLogs();
        this.updateBagButton();
        this.updateWalkButton();
        this.showCharacters();
        this.showProgressBarCanvas();
    }

    private updateBagButton(): void {
        if (this._game.bagManager.isEmpty()) {
            this._bagBtn.innerHTML = this._game.loc.l('bag-is-empty');
            this._bagBtn.disabled = true;
        } else {
            this._bagBtn.innerHTML = `Open bag (${this._game.bagManager.showQuantityOfItems()})`;
            this._bagBtn.disabled = false;
        }
    }

    private updateWalkButton(): void {
        this._walkBtn.innerHTML = this._game.loc.l('walk-one-hour');
    }

    showLogs(): void {
        this._logs = this._tempoStatusChangeLogs;
        this._tempoStatusChangeLogs = [];
        this._logListResult.innerHTML = '';
        this.showResultLogs();
    }

    private showResultLogs(): void {
        let result_logs = '';
        let count = 0;

        const stop = setInterval(() => {
            if (count < this._tempResultLogs.length) {
                this._game.audioManager.playWriteSound();
                result_logs += `<li>${this._tempResultLogs[count]}</li>`;
                this._logListResult.innerHTML = result_logs;
                count++;
            } else {
                clearInterval(stop);
                this._logs = this._tempResultLogs;
                this._tempResultLogs = [];
                this._game.characterManager.savePreviousCharacters();
            }
        }, 300);
    }

    createLogsForStatusChange(): string {
        const previousCharacters = this._game.characterManager.previousCharacters;
        const currentCharacters = this._game.characterManager.characters;
        let status_change_logs = '';

        for (let i = 0; i < previousCharacters.length; i++) {
            const prev = previousCharacters[i];
            const curr = currentCharacters[i];

            if (!curr.isDead && prev.sanity !== curr.sanity) {
                status_change_logs += `<li> ${curr.name} Sanity: `;
                const sanityDifference = curr.sanity - prev.sanity;
                status_change_logs += sanityDifference > 0
                    ? `+${sanityDifference}%`
                    : `-${-sanityDifference}%`;
                status_change_logs += '</li>';
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

    addTempLog(log: string, logType: LogType): void {
        if (logType === LogType.Result) {
            this._tempResultLogs.push(log);
        } else {
            this._tempoStatusChangeLogs.push(log);
        }
    }

    onClickBag(): void {
        this._game.audioManager.playButtonSound();
        this._game.stateManager.goToState(GameStates.BAG);
    }

    onClickCampBtn(): void {
        this.disableButtons();
        this._yourFamily.innerHTML = 'Camping...';
        this._sleepIntervalId = window.setInterval(() => this.sleeping(), 500);
    }

    private disableButtons(): void {
        this._bagBtn.disabled = true;
        this._walkBtn.disabled = true;
    }

    private enableButtons(): void {
        this._bagBtn.disabled = false;
        this._walkBtn.disabled = false;
    }

    sleeping(): void {
        if (this._hoursSleeping <= 6) {
            this.updateCharacterSleepingStatus();
            this._game.passOneHour();
            this._hoursSleeping++;
        } else {
            this.onWakeUp();
        }
    }

    private updateCharacterSleepingStatus(): void {
        this._game.characters.forEach((character, index) => {
            if (!character.isDead) {
                const randomNumber = this.getRandomCharacterStatus();
                this._charactersList[index].atributesField.innerHTML = randomNumber;
            }
        });
    }

    private onWakeUp(): void {
        this.showCharacters();
        this.enableButtons();
        this._yourFamily.innerHTML = this._game.loc.l('your-family');
        clearInterval(this._sleepIntervalId);
    }

    private getRandomCharacterStatus(): string {
        const statusOptions = ["Zzz", "zZz", "zzZ"];
        return statusOptions[this._game.getRandomArbitrary(0, statusOptions.length)];
    }

    onClickWalkBtn(): void {
        if (this._game.distanceToTheBorder === 300) {
            this._game.audioManager.playRainSound();
        }

        this._game.audioManager.playButtonSound();
        this._game.passOneHour();
        this.walkOneHour();

        const deadCharacters = this._game.characterManager.getCharactersDead();

        for (const character of deadCharacters) {
            if (!character.buried) {
                this._game.stateManager.goToState(GameStates.RIP);
                return;
            }
        }

        this._game.stateManager.goToState(GameStates.EVENT);
    }

    private walkOneHour(): void {
        this._game.characterManager.getCharactersAlive().forEach((character) => {
            character.walkOneHour();
        });

        this._game.decreaseTheDistanceToTheBorder(2);
        this.showTravelledDistance();

        if (this._game.distanceToTheBorder <= 0) {
            this.arrivedAtTheBorder();
        }
    }

    showTravelledDistance(): void {
        this._travelledDistanceField.innerHTML = `${this._game.distanceToTheBorder} ${this._game.loc.l('miles-to-the-border')}`;
    }

    private arrivedAtTheBorder(): void {
        this._game.stateManager.goToState(GameStates.GAME_OVER);
    }

    getAtributesPageElements(): void {
        const characterIds = ['first', 'second', 'third', 'fourth'];
        characterIds.forEach((id, index) => {
            this._charactersList[index] = {
                nameField: document.querySelector(`#${id}-character-name-field`),
                atributesField: document.querySelector(`#${id}-character-atributes-field`),
                afflictionsField: document.querySelector(`#${id}-character-afflictions-field`),
            };
        });
    }

    showCharacters(): void {
        const characters = [
            this._game.characterManager.characterDmytro,
            this._game.characterManager.characterOlena,
            this._game.characterManager.characterMykola,
            this._game.characterManager.characterSofiia,
        ];

        characters.forEach((character, index) => {
            this.showCharacter(character, index);
        });
    }

    private showCharacter(character: Character, index: number): void {
        const { nameField, atributesField, afflictionsField } = this._charactersList[index];
        if (character.isDead) {
            nameField.innerHTML = `${character.name} - ${character.kinship} 💀`;
            atributesField.innerHTML = `${character.getDateOfBirth()} - 2020`;
            afflictionsField.innerHTML = '';
        } else {
            nameField.innerHTML = `${character.name} - ${character.kinship}`;
            nameField.innerHTML += character.getSickness() === 'Sick' ? ' [ Sick ]' : '';
            atributesField.innerHTML = character.getSanity();
            afflictionsField.innerHTML = character.showAfflictions();
        }
    }

    private showProgressBarCanvas(): void {
        this._progressBarCanvasElement.width = 300;
        this._progressBarCanvasElement.height = 8;
        this._progressBarCanvasContext = this._progressBarCanvasElement.getContext("2d")!;
        this.drawProgressBarBackground();
        this.drawPlayerPositionOnProgressBarCanvas(300 - this._game.distanceToTheBorder);
    }

    private drawProgressBarBackground(): void {
        const ctx = this._progressBarCanvasContext;
        ctx.clearRect(0, 0, this._progressBarCanvasElement.width, this._progressBarCanvasElement.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, this._progressBarCanvasElement.width, this._progressBarCanvasElement.height);

        ctx.strokeStyle = "#2c3e50";
        ctx.lineWidth = 1;
        const positions = [10, 75, 150, 225, 290];
        positions.forEach(pos => {
            ctx.beginPath();
            ctx.moveTo(pos, 0);
            ctx.lineTo(pos, 8);
            ctx.stroke();
            ctx.closePath();
        });
    }

    private drawPlayerPositionOnProgressBarCanvas(mile: number): void {
        const lineSize = this._progressBarCanvasElement.width - 20;
        const unit = lineSize / 300;
        const unitsToWalk = mile * unit;
        
        this._progressBarCanvasContext.beginPath();
        this._progressBarCanvasContext.arc(unitsToWalk + 10, 4, 3.5, 0, 2 * Math.PI);
        this._progressBarCanvasContext.fillStyle = "#27ae60";
        this._progressBarCanvasContext.fill();
    }
}