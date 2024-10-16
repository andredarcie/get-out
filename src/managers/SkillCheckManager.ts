import { Dice } from '../entities/Dice';
import { Game } from '../Game';
import { GameStates } from '../enums/GameStates';
import { Choice } from '../entities/Event';
import { DiceManager } from './DiceManager';

export enum SkillCheckResults {
    Success,
    Failure
}

export class SkillCheckManager {
    private readonly _game: Game;
    private _travelBtn: HTMLButtonElement;
    private _skillCheckExpected: HTMLElement;
    public _resultLabel: HTMLElement;
    private _diceTimer: any; 
    private _diceManager: DiceManager;
    private _currentChoice: Choice;

    constructor() {
        this._game = Game.getInstance();

        this._resultLabel = document.querySelector("#skill-check-result-label")!;

        this._travelBtn = document.querySelector("#skill-check-back-btn")!;
        this._skillCheckExpected = document.querySelector("#skill-check-expected")!;

        this._travelBtn.addEventListener('click', () => { this.onClickTravel() });
        this._diceManager = new DiceManager("dice-canvas");
    }

    start(): void {
        this._currentChoice = this._game.eventManager.currentChoice;
        let expectedValue = this._currentChoice.skillCheckFields.difficult.value;
        this._skillCheckExpected.innerHTML = 'Mínimo Necessário: ' + expectedValue.toString();
        
        this._diceManager.animateDice();
        this._travelBtn.disabled = true;
        this._resultLabel.style.visibility = 'hidden';
        setTimeout(() => { this.startDiceRoll() }, 100);
    }

    startDiceRoll() {
        let dice = new Dice();
        this._game.audioManager.playDiceSound();
        setTimeout(() => { this.stopShakeDice(dice) }, 500);
    }

    onClickTravel() {
        this._game.audioManager.playButtonSound();
        if (this._game.skillCheckResult == SkillCheckResults.Success) {
            this._currentChoice.skillCheckFields.resultPath.success();

            if (this._currentChoice.skillCheckFields.canGiveItems) {
                this._game.stateManager.goToState(GameStates.ITEM_PICKER);
                return;
            }

        } else if (this._game.skillCheckResult == SkillCheckResults.Failure) {
            this._currentChoice.skillCheckFields.resultPath.failure();
        }

        this._game.stateManager.goToState(GameStates.LOG);
    }

    private stopShakeDice(dice: Dice): void {
        
        clearInterval(this._diceTimer);
        this._resultLabel.style.visibility = 'visible';

        let diceValue = dice.roll();
        this._diceManager.stopDice(diceValue);
        let expectedValue = this._currentChoice.skillCheckFields.difficult.value;

        this._skillCheckExpected.innerHTML = 'Mínimo Necessário: ' + expectedValue.toString();

        this._travelBtn.disabled = false;

        if (diceValue == 6) {
            this._game.audioManager.playSuccessSound();
            this.setCriticalSuccess();
            this._game.skillCheckResult = SkillCheckResults.Success;
            return;
        }

        if (diceValue == 1) {
            this._game.audioManager.playFailSound();
            this.setCriticalFailure();
            this._game.skillCheckResult = SkillCheckResults.Failure;
            return;
        }

        if (diceValue >= expectedValue) {
            this._game.audioManager.playSuccessSound();
            this.setSuccess();
            this._game.skillCheckResult = SkillCheckResults.Success;
            return;
        }

        if (diceValue < expectedValue) {
            this._game.audioManager.playFailSound();
            this.setFailure();
            this._game.skillCheckResult = SkillCheckResults.Failure;
            return;
        }
    }

    public setCriticalSuccess(): void {
        this._resultLabel.innerHTML = ' CRITICIAL SUCCESS ';
        this._resultLabel.style.fontSize = '1.3em';
        this._resultLabel.classList.remove('red-color');
        this._resultLabel.classList.add('green-color');
    }

    public setSuccess(): void {        
        this._resultLabel.innerHTML = ' SUCCESS ';
        this._resultLabel.style.fontSize = '2.5em';
        this._resultLabel.classList.remove('red-color');
        this._resultLabel.classList.add('green-color');
    }

    public setCriticalFailure(): void {
        this._resultLabel.innerHTML = ' CRITICIAL FAILURE ';
        this._resultLabel.style.fontSize = '1.3em';
        this._resultLabel.classList.add('red-color');
        this._resultLabel.classList.remove('green-color');
    }

    public setFailure(): void {
        this._resultLabel.innerHTML = ' FAILURE ';
        this._resultLabel.style.fontSize = '2.5em';
        this._resultLabel.classList.add('red-color');
        this._resultLabel.classList.remove('green-color');
    }
}