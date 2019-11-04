import { Globals } from '../Globals.js';

export class LogManager {
    
    constructor(game) {
        this.game = game;
        this.logList = document.querySelector("#log-list");
    }

    start() {
        this.showLogs();
    }

    showLogs() {
        let logs = "";

        for (var i = 0; i < Globals.tempLogs.length; i++) {
            logs += "<li>" + Globals.tempLogs[i] + "</li>";
        }

        Globals.logs = Globals.tempLogs;
        Globals.tempLogs = [];

        this.logList.innerHTML = logs;
    }

    clearLogs() {
        this.logList.innerHTML = '';
    }
}