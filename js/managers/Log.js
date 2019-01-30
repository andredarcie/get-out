import { Globals } from '../globals.js';

export class Log {
    
    constructor(game) {
        this.game = game;
        this.logList = document.querySelector("#log-list");
    }

    start() {
        setTimeout(() => { this.backToTravel() }, 2000);
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

    backToTravel() {
        this.game.goToState(Globals.gameStates.TRAVEL);
    }
}