import { Game, GameStates } from '../Game';

export class LogManager {
    private _logList: Element;
    private _travelBtn: Element;
    private _tempLogs: string[] = [];
    private _logs: string[] = [];

    constructor() {
        this._logList = document.querySelector("#log-list");
        
        this._travelBtn = document.querySelector("#log-back-character-btn");
        this._travelBtn.addEventListener('click', () => { this.onClickTravel() });
    }

    start(): void {
        this.showLogs();
    }

    showLogs(): void {
        if(this._tempLogs.length <= 0) 
            throw new Error('No logs found');

        let logs = '';

        for (let i = 0; i < this._tempLogs.length; i++) {
            logs += '<li>' + this._tempLogs[i] + '</li>';
        }

        this._logs = this._tempLogs;
        this._tempLogs = [];

        this._logList.innerHTML = logs;
    }

    clearLogs(): void {
        this._logList.innerHTML = '';
    }

    log(text: string): void {
        this._tempLogs.push(text);
    }

    onClickTravel() {
        Game.goToState(GameStates.TRAVEL);
    }

    isThereAnyTemporaryLog(): boolean {
        return this._tempLogs.length > 0;
    }

    addTempLog(log: string) {
        this._tempLogs.push(log);
    }
}