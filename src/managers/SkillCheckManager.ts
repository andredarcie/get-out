import { Dice } from '../entities/Dice';
import { Game, GameStates } from '../Game';

export class SkillCheckManager {
    private readonly _game: Game;
    private _travelBtn: HTMLButtonElement;
    private _firstDice: HTMLButtonElement;
    private _secondDice: HTMLButtonElement;
    private _skillCheckExpected: HTMLButtonElement;
    private _skillCheckResultValue: HTMLButtonElement;
    public _resultLabel: HTMLButtonElement;
    private _diceTimer: any; 

    constructor() {
        this._game = Game.getInstance();

        this._resultLabel = document.querySelector("#skill-check-result-label");
        this._skillCheckResultValue = document.querySelector("#skill-check-result-value");

        this._travelBtn = document.querySelector("#skill-check-back-btn");
        this._firstDice = document.querySelector("#first-dice");
        this._secondDice = document.querySelector("#second-dice");
        this._skillCheckExpected = document.querySelector("#skill-check-expected");

        this._travelBtn.addEventListener('click', () => { this.onClickTravel() });
        
    }

    start(): void {
        let dice = new Dice();

        this._resultLabel.style.visibility = 'hidden';
        this._diceTimer = setInterval(() => { this.shakeDice(dice) }, 50);
        setTimeout(() => { this.stopShakeDice(dice) }, 500);
    }

    onClickTravel() {
        this._game.goToState(GameStates.TRAVEL);
    }

    private shakeDice(dice: Dice): void {
        let firstDiceValue = dice.roll();
        let secondDiceValue = dice.roll();
        this.showDiceValues(firstDiceValue, secondDiceValue);
    }

    private stopShakeDice(dice: Dice): void {
        clearInterval(this._diceTimer);
        this._resultLabel.style.visibility = 'visible';

        let firstDiceValue = dice.roll();
        let secondDiceValue = dice.roll();
        let characterStrength = 3;
        let expectedValue = 10;
        let finalValue = firstDiceValue + secondDiceValue + characterStrength;
        this.showDiceValues(firstDiceValue, secondDiceValue);

        this._skillCheckResultValue.style.textAlign = 'center';
        this._skillCheckResultValue.innerHTML = 'Result: ' + finalValue.toString();
        this._skillCheckExpected.innerHTML = 'Expected: ' + expectedValue.toString();

        if (firstDiceValue + secondDiceValue == 12) {
            this.setCriticalSuccess();
            return;
        }

        if (firstDiceValue + secondDiceValue == 2) {
            this.setCriticalFailure();
            return;
        }

        if (finalValue >= expectedValue) {
            this.setSuccess();
            return;
        }

        if (finalValue < expectedValue) {
            this.setFailure();
            return;
        }
    }

    private showDiceValues(firstDiceValue: number, secondDiceValue: number): void {
        this._firstDice.innerHTML = firstDiceValue.toString();
        this._secondDice.innerHTML = secondDiceValue.toString();
    }

    public setCriticalSuccess(): void {
        this._skillCheckResultValue.style.visibility = 'hidden';
        this._skillCheckResultValue.classList.remove('red-color');
        this._skillCheckResultValue.classList.add('green-color');

        this._resultLabel.innerHTML = '[ CRITICIAL SUCCESS ]';
        this._resultLabel.style.fontSize = '1.3em';
        this._resultLabel.classList.remove('red-color');
        this._resultLabel.classList.add('green-color');
    }

    public setSuccess(): void {
        this._skillCheckResultValue.style.visibility = 'visible';
        this._skillCheckResultValue.classList.remove('red-color');
        this._skillCheckResultValue.classList.add('green-color');
        
        this._resultLabel.innerHTML = '[ SUCCESS ]';
        this._resultLabel.style.fontSize = '2.5em';
        this._resultLabel.classList.remove('red-color');
        this._resultLabel.classList.add('green-color');
    }

    public setCriticalFailure(): void {
        this._skillCheckResultValue.style.visibility = 'hidden';
        this._skillCheckResultValue.classList.add('red-color');
        this._skillCheckResultValue.classList.remove('green-color');

        this._resultLabel.innerHTML = '[ CRITICIAL FAILURE ]';
        this._resultLabel.style.fontSize = '1.3em';
        this._resultLabel.classList.add('red-color');
        this._resultLabel.classList.remove('green-color');
    }

    public setFailure(): void {
        this._skillCheckResultValue.style.visibility = 'visible';
        this._skillCheckResultValue.classList.add('red-color');
        this._skillCheckResultValue.classList.remove('green-color');

        this._resultLabel.innerHTML = '[ FAILURE ]';
        this._resultLabel.style.fontSize = '2.5em';
        this._resultLabel.classList.add('red-color');
        this._resultLabel.classList.remove('green-color');
    }
}