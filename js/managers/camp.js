import { Globals } from '../globals.js';

export class Camp {

    constructor(game) {
        this.game = game;

        this.campImg = document.querySelector("#camp-img");
        this.travelBtn = document.querySelector("#travel-btn");
        this.statsBtn = document.querySelector("#stats-btn");
        this.sleepBtn = document.querySelector("#sleep-btn");
        this.huntBtn = document.querySelector("#hunt-btn");
        this.healBtn = document.querySelector("#heal-btn");

        this.travelBtn.addEventListener('click', (e) => { this.onClickTravel(e) });
        this.statsBtn.addEventListener('click', (e) => { this.onClickStats(e) });
        this.sleepBtn.addEventListener('click', (e) => { this.onClickSleep(e) });
        this.huntBtn.addEventListener('click', (e) => { this.onClickHunt(e) });
        this.healBtn.addEventListener('click', (e) => { this.onClickHeal(e) });
    }

    start() {
        
    } 

    onClickTravel() {
        this.game.goToState(Globals.gameStates.TRAVEL);
    }

    onClickStats() {
        this.game.goToState(Globals.gameStates.STATS);
    }

    onClickSleep() {
        this.game.goToState(Globals.gameStates.SLEEP);
    }

    onClickHunt() {
        this.game.goToState(Globals.gameStates.HUNT);
    }

    onClickHeal() {
        this.game.goToState(Globals.gameStates.HEAL);
    }
}