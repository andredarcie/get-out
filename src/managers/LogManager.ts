import { Game, GameStates } from '../Game';

export class LogManager {
    private _logList: Element;
    private _travelBtn: Element;

    constructor() {
        this._logList = document.querySelector("#log-list");
        
        this._travelBtn = document.querySelector("#log-back-character-btn");
        this._travelBtn.addEventListener('click', () => { this.onClickTravel() });
    }

    start(): void {
        this.showLogs();
    }

    showLogs(): void {
        if(Game.tempLogs.length <= 0) 
            throw new Error('No logs found');

        let logs = '';

        for (let i = 0; i < Game.tempLogs.length; i++) {
            logs += '<li>' + Game.tempLogs[i] + '</li>';
        }

        Game.logs = Game.tempLogs;
        Game.tempLogs = [];

        this._logList.innerHTML = logs;
    }

    clearLogs(): void {
        this._logList.innerHTML = '';
    }

    log(text: string): void {
        Game.tempLogs.push(text);
    }

    onClickTravel() {
        Game.goToState(GameStates.TRAVEL);
    }
}