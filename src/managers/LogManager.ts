import { Game } from '../Game';

export class LogManager {
    logList: Element;

    constructor() {
        this.logList = document.querySelector("#log-list");
    }

    start(): void {
        this.showLogs();
    }

    showLogs(): void {
        if(Game.tempLogs.length <= 0) return;

        let logs = "";

        for (var i = 0; i < Game.tempLogs.length; i++) {
            logs += "<li>" + Game.tempLogs[i] + "</li>";
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
}