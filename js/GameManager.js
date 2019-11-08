import { Globals } from './Globals.js';
import { CampManager } from './managers/CampManager.js';
import { EventManager } from './managers/EventManager.js';
import { GameOverManager } from './managers/GameOverManager.js';
import { StatsManager } from './managers/StatsManager.js';
import { TravelManager } from './managers/TravelManager.js';
import { LogManager } from './managers/LogManager.js';
import { Character } from './entities/Character.js';
export class GameManager {

    constructor() {
        this.states = Globals.gameStates;
        this.pages = Globals.gamePages;

        this.camp = new CampManager(this);
        this.events = new EventManager(this);
        this.gameOver = new GameOverManager(this);
        this.stats = new StatsManager(this);
        this.travel = new TravelManager(this);
        this.log = new LogManager(this);
    }

    start() {
        var gamePages = Globals.gamePages;
        this.createAllCharacters();
        this.hideAllPages();
        this.showPage(gamePages.campPage);
    }

    createAllCharacters() {
        Globals.characters.push(new Character('Ethan', 5, 'father', true, false, false));
        Globals.characters.push(new Character('Olivia', 5, 'mother', false, true, true));
        Globals.characters.push(new Character('Michael', 5, 'son', true, true, true));
        Globals.characters.push(new Character('Sophia', 5, 'daughter', false, false, false));
        Globals.characters.push(new Character('Emma', 5, 'grandmother', true, true, false));
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
        this.hidePage(gamePages.statsPage);
        this.hidePage(gamePages.eventPage);
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
            case gameStates.STATS: 
                this.showPage(gamePages.statsPage);
                this.stats.start();
            break;
            case gameStates.EVENT: 
                this.showPage(gamePages.eventPage);
                this.events.start();
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