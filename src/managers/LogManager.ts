import { Game, GameStates } from '../Game';

export class LogManager {
    logList: Element;
    travelBtn: Element;

    constructor() {
        this.logList = document.querySelector("#log-list");
        
        this.travelBtn = document.querySelector("#log-back-character-btn");
        this.travelBtn.addEventListener('click', () => { this.onClickTravel() });
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

        this.logList.innerHTML = logs;
    }

    clearLogs(): void {
        this.logList.innerHTML = '';
    }

    log(text: string): void {
        Game.tempLogs.push(text);
    }

    onClickTravel() {
        Game.goToState(GameStates.TRAVEL);
    }
}