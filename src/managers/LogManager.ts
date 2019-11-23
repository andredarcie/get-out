import { Game, GameStates } from '../Game';

export class LogManager {
    private _logList: Element;
    private _travelBtn: Element;
    private _tempLogs: string[] = [];
    private _logs: string[] = [];
    private readonly _game: Game;

    constructor() {
        this._logList = document.querySelector("#log-list");
        
        this._travelBtn = document.querySelector("#log-back-character-btn");
        this._travelBtn.addEventListener('click', () => { this.onClickTravel() });
        this._game = Game.getInstance();
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
        this._game.goToState(GameStates.TRAVEL);
    }

    isThereAnyTemporaryLog(): boolean {
        return this._tempLogs.length > 0;
    }

    addTempLog(log: string) {
        this._tempLogs.push(log);
    }
}