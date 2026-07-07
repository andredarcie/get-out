import { Character } from '../entities/Character';
import { Game } from '../Game';
import { GameStates } from '../enums/GameStates';
import { STORY_YEAR } from '../GameState';

export enum LogType {
    Result,
    StatusChange,
}

export class LogManager {
    private _logListResult: Element;
    private _tempResultLogs: string[] = [];
    private _logs: string[] = [];
    private _bagBtn: HTMLButtonElement;
    private _walkBtn: HTMLButtonElement;
    private _dayField: HTMLElement;
    private _charactersList: any;
    private _journeyNum: HTMLElement;
    private _journeyFill: HTMLElement;
    private _journeyMarker: HTMLElement;
    private _journeyUnit: HTMLElement;
    private readonly _game: Game;

    constructor() {
        this._game = Game.getInstance();
        this.initializeElements();
        this.addEventListeners();
        this.getAtributesPageElements();
    }

    private initializeElements(): void {
        this._logListResult = document.querySelector("#log-list-result")!;
        this._bagBtn = document.querySelector('#bag-btn')!;
        this._walkBtn = document.querySelector("#walk-btn")!;
        this._dayField = document.getElementById("log-day-field")!;
        this._journeyNum = document.getElementById("journey-num")!;
        this._journeyFill = document.getElementById("journey-fill")!;
        this._journeyMarker = document.getElementById("journey-marker")!;
        this._journeyUnit = document.getElementById("journey-unit")!;
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
        this.showDayAndTime();
        this.showCharacters();
        this.showJourneyProgress();
    }

    private updateBagButton(): void {
        if (this._game.bagManager.isEmpty()) {
            this._bagBtn.innerHTML = this._game.loc.l('bag-is-empty');
            this._bagBtn.disabled = true;
        } else {
            this._bagBtn.innerHTML = `Bolsa (${this._game.bagManager.showQuantityOfItems()})`;
            this._bagBtn.disabled = false;
        }
    }

    private updateWalkButton(): void {
        this._walkBtn.innerHTML = this._game.loc.l('walk-one-hour');
        this._walkBtn.disabled = false;
    }

    private showDayAndTime(): void {
        this._dayField.textContent = `Dia ${this._game.state.currentDay} · ${this._game.state.clock.showTime()}`;
    }

    showLogs(): void {
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

    clearLogs(): void {
        this._logListResult.innerHTML = '';
    }

    isThereAnyTemporaryLog(): boolean {
        return this._tempResultLogs.length > 0;
    }

    addTempLog(log: string, logType: LogType): void {
        if (logType === LogType.Result) {
            this._tempResultLogs.push(log);
        }
    }

    onClickBag(): void {
        this._game.audioManager.playButtonSound();
        this._game.stateManager.goToState(GameStates.BAG);
    }

    onClickWalkBtn(): void {
        this._game.audioManager.playButtonSound();
        this._game.stateManager.goToState(GameStates.MAP);
    }

    public travelToSelectedLocation(): void {
        this._game.audioManager.playWalkSound();
        this._game.state.passOneHour();
        this.addTempLog(`A estrada cobra. −${Character.FATIGUE_PER_HOUR}`, LogType.Result);
        this.walkOneHour();

        if (this._game.stateManager.currentState === GameStates.GAME_OVER) {
            // A caminhada custou a mente do jogador.
            return;
        }

        if (this._game.characterManager.getFirstCharacterDeadAndNotBuried()) {
            this._game.stateManager.goToState(GameStates.RIP);
            return;
        }

        this._game.stateManager.goToState(GameStates.EVENT);
    }

    private walkOneHour(): void {
        this._game.characterManager.getCharactersAlive().forEach((character) => {
            character.walkOneHour();
        });
    }

    showJourneyProgress(): void {
        const depth = this._game.mapManager.getCurrentDepth();
        const total = this._game.mapManager.totalSteps;
        const pct = total > 0 ? (depth / total) * 100 : 0;

        this._journeyNum.textContent = `Etapa ${depth}/${total}`;
        this._journeyNum.className = 'journey-num';
        this._journeyUnit.textContent = this.getActName(depth);
        this._journeyFill.style.width = pct + '%';
        this._journeyMarker.style.left = pct + '%';
        this._journeyMarker.className = 'journey-marker';
    }

    private getActName(depth: number): string {
        if (depth <= 2) return 'Ato I. A Cidade Morta.';
        if (depth <= 5) return 'Ato II. A Descida.';
        if (depth <= 7) return 'Ato III. A Última Milha.';
        return 'Fronteira.';
    }

    getAtributesPageElements(): void {
        const characterIds = ['first', 'second', 'third', 'fourth'];
        characterIds.forEach((id, index) => {
            this._charactersList[index] = {
                nameField: document.querySelector(`#${id}-character-name-field`),
                atributesField: document.querySelector(`#${id}-character-atributes-field`),
                afflictionsField: document.querySelector(`#${id}-character-afflictions-field`),
                sanityFill: document.getElementById(`${id}-character-sanity-fill`),
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
        const { nameField, atributesField, afflictionsField, sanityFill } = this._charactersList[index];
        if (character.isDead) {
            nameField.innerHTML = `${character.name} - ${character.kinship} 💀`;
            atributesField.innerHTML = `${character.getDateOfBirth()} — ${STORY_YEAR}`;
            afflictionsField.innerHTML = '';
            if (sanityFill) {
                sanityFill.style.width = '0%';
                sanityFill.className = 'character-sanity-fill';
            }
        } else {
            nameField.innerHTML = `${character.name} - ${character.kinship}`;
            nameField.className = 'character-name-field' + (character.sanity <= 25 ? ' critical' : '');
            atributesField.innerHTML = character.getSanity();
            afflictionsField.innerHTML = character.showAfflictions();
            if (sanityFill) {
                sanityFill.style.width = character.sanity + '%';
                sanityFill.className = 'character-sanity-fill ' +
                    (character.sanity > 50 ? 'sanity-ok' : character.sanity > 25 ? 'sanity-warn' : 'sanity-critical');
            }
        }
    }

}
