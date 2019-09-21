import { Globals } from './globals.js';
import { Camp } from './managers/Camp.js';
import { Events } from './managers/Events.js';
import { GameOver } from './managers/GameOver.js';
import { Heal } from './managers/Heal.js';
import { Hunt } from './managers/Hunt.js';
import { Report } from './managers/Report.js';
import { Sleep } from './managers/Sleep.js';
import { Stats } from './managers/Stats.js';
import { Travel } from './managers/Travel.js';
import { Walk } from './managers/Walk.js';
import { Log } from './managers/Log.js';

export class Game {

    constructor() {
        this.states = Globals.gameStates;
        this.pages = Globals.gamePages;

        this.camp = new Camp(this);
        this.events = new Events(this);
        this.gameOver = new GameOver(this);
        this.heal = new Heal(this);
        this.hunt = new Hunt(this);
        this.report = new Report(this);
        this.sleep = new Sleep(this);
        this.stats = new Stats(this);
        this.travel = new Travel(this);
        this.walk = new Walk(this);
        this.log = new Log(this);
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
                this.camp.start();
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
                this.stats.start();
            break;
            case gameStates.EVENT: 
                this.showPage(gamePages.eventPage);
                this.events.start();
            break;
            case gameStates.WALK:
                this.showPage(gamePages.walkingPage);
                // startWalk();
            break;
            case gameStates.REPORT:
                this.showPage(gamePages.reportPage);
                // startReport();
            break;
            case gameStates.LOG:
                this.log.start();
            break;
            case gameStates.GAME_OVER:
                this.showPage(gamePages.gameOverPage);
                this.gameOver.start();
            break;
        }
    }
}