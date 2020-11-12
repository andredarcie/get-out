import { Character } from '../entities/Character';
import { Game, GameStates } from '../Game';

export enum LogType {
    Result,
    StatusChange
}

export class LogManager {
    private _logListResult: Element;
    private _logListStatusChange: Element;
    public _successResult: HTMLButtonElement;
    public _failureResult: HTMLButtonElement;
    private _travelBtn: Element;
    private _tempResultLogs: string[] = [];
    private _tempoStatusChangeLogs: string[] = []; 
    private _logs: string[] = [];
    private readonly _game: Game;

    constructor() {
        this._game = Game.getInstance();

        this._logListResult = document.querySelector("#log-list-result");
        this._logListStatusChange = document.querySelector("#log-list-status-change");

        this._successResult = document.querySelector("#success-result");
        this._successResult.style.display = 'none';
        this._failureResult = document.querySelector("#failure-result");
        this._failureResult.style.display = 'none';

        this._travelBtn = document.querySelector("#log-back-character-btn");
        this._travelBtn.addEventListener('click', () => { this.onClickTravel() });
        
    }

    start(): void {
        this.showLogs();
    }

    showLogs(): void {
        let result_logs = '';
        for (let i = 0; i < this._tempResultLogs.length; i++) {
            result_logs += '<li>' + this._tempResultLogs[i] + '</li>';
        }

        this._logs = this._tempResultLogs;
        this._tempResultLogs = [];
        this._logListResult.innerHTML = result_logs;

        let status_change_logs = '';
        for (let i = 0; i < this._tempoStatusChangeLogs.length; i++) {
            status_change_logs += '<li>' + this._tempoStatusChangeLogs[i] + '</li>';
        }

        this._logs = this._tempoStatusChangeLogs;
        this._tempoStatusChangeLogs = [];
        this._logListStatusChange.innerHTML = status_change_logs;
    }

    clearLogs(): void {
        this._logListResult.innerHTML = '';
        this._logListStatusChange.innerHTML = '';
    }

    onClickTravel() {
        let characters: Character[] = this._game.characterManager.getCharactersDead();
        console.log(characters);

        for (let character of characters) {
            if (character.isDead && !character.buried) {
                this._game.goToState(GameStates.RIP);
                return;
            }
        }

        this._successResult.style.display = 'none';
        this._failureResult.style.display = 'none';
        this._game.goToState(GameStates.TRAVEL);
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

        this._game.addLogToFirebase(log);
    }

    public setCriticalSuccess(): void {
        this._game.log._successResult.style.display = 'inline';
        this._successResult.innerHTML = ' [ CRITICAL SUCCESS ] ';
        this._failureResult.style.display = 'none';
    }

    public setSuccess(): void {
        this._game.log._successResult.style.display = 'inline';
        this._successResult.innerHTML = ' [ SUCCESS ] ';
        this._failureResult.style.display = 'none';
    }

    public setCriticalFailure(): void {
        this._game.log._failureResult.style.display = 'inline';
        this._failureResult.innerHTML = '  [ CRITICIAL FAILURE ] ';
        this._successResult.style.display = 'none';
    }

    public setFailure(): void {
        this._game.log._failureResult.style.display = 'inline';
        this._failureResult.innerHTML = '  [ FAILURE ] ';
        this._successResult.style.display = 'none';
    }
}