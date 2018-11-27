import { Globals } from './globals.js';
import { Travel } from './managers/travel.js';

export class Game {

    constructor() {
        this.states = Globals.gameStates;
        this.pages = Globals.gamePages;

        this.travel = new Travel(this);
        
        Globals.pages.travelPage.travelBtn.addEventListener('click', (e) => { this.onClick(e) });
    }

    start() {
        var gamePages = Globals.gamePages;
    
        this.hideAllPages();
        this.showPage(gamePages.campPage);
    }

    onClick(evt) {
        this.goToState(this.states.TRAVEL);
    }

    goToState(state) {

        if (!state) throw "Invalid state!";

        Globals.currentState = state;
        this.setState();
    }

    showPage(page) {
        page.style.display = "block";
    }

    hidePage(page) {
        page.style.display = "none";
    }

    hideAllPages() {

        var gamePages = Globals.gamePages;
    
        this.hidePage(gamePages.travelPage);
        this.hidePage(gamePages.campPage);
        this.hidePage(gamePages.sleepPage);
        this.hidePage(gamePages.huntPage);
        this.hidePage(gamePages.healPage);
        this.hidePage(gamePages.statsPage);
        this.hidePage(gamePages.eventPage);
        this.hidePage(gamePages.reportPage);
        this.hidePage(gamePages.walkingPage);
        this.hidePage(gamePages.gameOverPage);
    }

    setState() {

        const gamePages = Globals.gamePages;
        const gameStates = Globals.gameStates;

        this.hideAllPages();

        switch(Globals.currentState) {
            case gameStates.TRAVEL: 
                this.showPage(gamePages.travelPage);
                this.travel.start();
            break;
            case gameStates.CAMP: 
                this.showPage(gamePages.campPage);
                // startCamp();
            break;
            case gameStates.SLEEP: 
                this.showPage(gamePages.sleepPage);
                // startSleep();
            break;
            case gameStates.HUNT: 
                this.showPage(gamePages.huntPage);
                // startHunt();
            break;
            case gameStates.HEAL: 
                this.showPage(gamePages.healPage);
                // startHeal();
            break;
            case gameStates.STATS: 
                this.showPage(gamePages.statsPage);
                // startStats();
            break;
            case gameStates.EVENT: 
                this.showPage(gamePages.eventPage);
                // startEvent();
            break;
            case gameStates.WALK:
                this.showPage(gamePages.walkingPage);
                // startWalk();
            break;
            case gameStates.REPORT:
                this.showPage(gamePages.reportPage);
                // startReport();
            break;
            case gameStates.GAME_OVER:
                this.showPage(gamePages.gameOverPage);
                // startGameOver();
            break;
        }
    }
}