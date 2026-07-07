import { Dice } from '../entities/Dice';
import { Game } from '../Game';
import { GameStates } from '../enums/GameStates';
import { Choice } from '../entities/Event';
import { DiceManager } from './DiceManager';
import { SkillCheckResults } from '../enums/SkillCheckResults';
import { LogType } from './LogManager';

export { SkillCheckResults };

export class SkillCheckManager {
    private readonly _game: Game;
    private _travelBtn: HTMLButtonElement;
    private _skillCheckExpected: HTMLElement;
    private _flashElement: HTMLElement;
    public _resultLabel: HTMLElement;
    private _diceManager: DiceManager;
    private _currentChoice: Choice;
    private _lastRollWasCritical: boolean = false;

    constructor() {
        this._game = Game.getInstance();

        this._resultLabel = document.querySelector('#skill-check-result-label')!;
        this._travelBtn = document.querySelector('#skill-check-back-btn')!;
        this._skillCheckExpected = document.querySelector('#skill-check-expected')!;
        this._flashElement = document.querySelector('#skill-check-flash')!;

        this._travelBtn.addEventListener('click', () => { this.onClickTravel(); });
        this._diceManager = new DiceManager('dice-canvas');
    }

    private renderExpectedFace(value: number): void {
        this._skillCheckExpected.innerHTML = `
            <div class="expected-dice-wrap">
                <span class="expected-dice-label">Mínimo.</span>
                <div class="expected-dice expected-dice--${value}">
                    ${this.buildExpectedPips(value)}
                </div>
            </div>
        `;
    }

    private buildExpectedPips(value: number): string {
        const pipMap: Record<number, string[]> = {
            1: ['center'],
            2: ['top-left', 'bottom-right'],
            3: ['top-left', 'center', 'bottom-right'],
            4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
            5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
            6: ['top-left', 'mid-left', 'bottom-left', 'top-right', 'mid-right', 'bottom-right'],
        };

        return pipMap[value]
            .map((position) => `<span class="expected-pip expected-pip--${position}"></span>`)
            .join('');
    }

    private triggerFlash(type: 'success' | 'failure'): void {
        this._flashElement.classList.remove('flash-success', 'flash-failure');
        void this._flashElement.offsetWidth;
        this._flashElement.classList.add(type === 'success' ? 'flash-success' : 'flash-failure');
    }

    start(): void {
        this._currentChoice = this._game.eventManager.currentChoice;
        const expectedValue = this._currentChoice.skillCheckFields.difficult.value;
        this.renderExpectedFace(expectedValue);

        this._diceManager.animateDice();
        this._travelBtn.disabled = true;
        this._resultLabel.style.visibility = 'hidden';
        setTimeout(() => { this.startDiceRoll(); }, 100);
    }

    startDiceRoll() {
        const dice = new Dice();
        // Agenda o resultado antes de tocar o som: áudio nunca pode travar o dado.
        setTimeout(() => { this.stopShakeDice(dice); }, 500);
        this._game.audioManager.playDiceSound();
    }

    onClickTravel() {
        this._game.audioManager.playButtonSound();

        if (this._game.state.skillCheckResult == SkillCheckResults.Success) {
            this._currentChoice.skillCheckFields.resultPath.success();
            this.applyCriticalSuccessBonus();
        } else if (this._game.state.skillCheckResult == SkillCheckResults.Failure) {
            this._currentChoice.skillCheckFields.resultPath.failure();
            this.applyCriticalFailurePenalty();
        }

        if (this._game.stateManager.currentState === GameStates.GAME_OVER) {
            // O resultado custou a mente do jogador — a tela de fim já assumiu.
            return;
        }

        const nextState = this._game.eventManager.resolveNextState();

        if (nextState === GameStates.LOG
            && this._game.state.skillCheckResult == SkillCheckResults.Success
            && this._currentChoice.skillCheckFields.canGiveItems) {
            this._game.stateManager.goToState(GameStates.ITEM_PICKER);
            return;
        }

        this._game.stateManager.goToState(nextState);
    }

    private applyCriticalSuccessBonus(): void {
        if (!this._lastRollWasCritical) return;

        const character = this._game.eventManager.currentEvent.character;
        if (!character || character.isDead) return;

        if (character.hasAffliction()) {
            const affliction = character.showAfflictions();
            character.removeStatus();
            this._game.log.addTempLog(`Crítico. ${character.name}: ${affliction} some.`, LogType.Result);
        } else {
            character.increaseSanity(10);
            this._game.log.addTempLog(`Crítico. ${character.name}: +10`, LogType.Result);
        }
    }

    private applyCriticalFailurePenalty(): void {
        if (!this._lastRollWasCritical) return;

        const character = this._game.eventManager.currentEvent.character;
        if (!character || character.isDead) return;

        character.looseSanity(12);
        this._game.log.addTempLog(`Crítico. ${character.name}: −12`, LogType.Result);
    }

    private stopShakeDice(dice: Dice): void {
        this._resultLabel.style.visibility = 'visible';

        const diceValue = dice.roll();
        this._game.audioManager.playDiceSettleSound();
        this._diceManager.stopDice(diceValue);
        const expectedValue = this._currentChoice.skillCheckFields.difficult.value;

        this.renderExpectedFace(expectedValue);
        this._travelBtn.disabled = false;
        this._lastRollWasCritical = false;

        if (diceValue == 6) {
            this._game.audioManager.playSuccessSound();
            this.triggerFlash('success');
            this.setCriticalSuccess();
            this._lastRollWasCritical = true;
            this._game.state.skillCheckResult = SkillCheckResults.Success;
            return;
        }

        if (diceValue == 1) {
            this._game.audioManager.playFailSound();
            this.triggerFlash('failure');
            this.setCriticalFailure();
            this._lastRollWasCritical = true;
            this._game.state.skillCheckResult = SkillCheckResults.Failure;
            return;
        }

        if (diceValue >= expectedValue) {
            this._game.audioManager.playSuccessSound();
            this.triggerFlash('success');
            this.setSuccess();
            this._game.state.skillCheckResult = SkillCheckResults.Success;
            return;
        }

        this._game.audioManager.playFailSound();
        this.triggerFlash('failure');
        this.setFailure();
        this._game.state.skillCheckResult = SkillCheckResults.Failure;
    }

    public setCriticalSuccess(): void {
        this._resultLabel.innerHTML = ' SUCESSO CRÍTICO ';
        this._resultLabel.style.fontSize = '1.3em';
        this._resultLabel.classList.remove('red-color');
        this._resultLabel.classList.add('green-color');
    }

    public setSuccess(): void {
        this._resultLabel.innerHTML = ' SUCESSO ';
        this._resultLabel.style.fontSize = '2.5em';
        this._resultLabel.classList.remove('red-color');
        this._resultLabel.classList.add('green-color');
    }

    public setCriticalFailure(): void {
        this._resultLabel.innerHTML = ' FALHA CRÍTICA ';
        this._resultLabel.style.fontSize = '1.3em';
        this._resultLabel.classList.add('red-color');
        this._resultLabel.classList.remove('green-color');
    }

    public setFailure(): void {
        this._resultLabel.innerHTML = ' FALHA ';
        this._resultLabel.style.fontSize = '2.5em';
        this._resultLabel.classList.add('red-color');
        this._resultLabel.classList.remove('green-color');
    }
}
