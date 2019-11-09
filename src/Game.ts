import { CampManager } from './managers/CampManager';
import { EventManager } from './managers/EventManager';
import { GameOverManager } from './managers/GameOverManager';
import { StatsManager } from './managers/StatsManager';
import { TravelManager } from './managers/TravelManager';
import { LogManager } from './managers/LogManager';
import { Character } from './entities/Character';
import { CharacterManager } from './managers/CharacterManager';

export enum GameStates {
    TRAVEL,
    CAMP,
    STATS,
    EVENT,
    GAME_OVER,
    LOG
}

export class Game {
    static states: GameStates;
    static currentState: number = 1;
    static currentDay:number = 0;
    static hours: number = 0;
    static characters: Character[] = [];
    static travelledDistance: number = 0;
    static distanceToGoal: number = 300;
    static tempLogs: string[] = [];
    static logs: string[] = [];
    static travelPage: HTMLElement;
    static campPage: HTMLElement;
    static statsPage: HTMLElement;
    static eventPage: HTMLElement;
    static gameOverPage: HTMLElement;
    static camp: CampManager;
    static events: EventManager;
    static gameOver: GameOverManager;
    static stats: StatsManager;
    static travel: TravelManager;
    static log: LogManager;
    static characterManager: CharacterManager;

    constructor() {
        Game.travelPage = document.getElementById("travel-page"),
        Game.campPage = document.getElementById("camp-page"),
        Game.statsPage = document.getElementById("stats-page"),
        Game.eventPage = document.getElementById("event-page"),
        Game.gameOverPage = document.getElementById("game-over-page")

        Game.camp = new CampManager();
        Game.events = new EventManager();
        Game.gameOver = new GameOverManager();
        Game.stats = new StatsManager();
        Game.travel = new TravelManager();
        Game.log = new LogManager();
        Game.characterManager = new CharacterManager();
    }

    start() {
        Game.createAllCharacters();
        Game.hideAllPages();
        Game.showPage(Game.campPage);
    }

    static createAllCharacters() {
        Game.characters.push(new Character('Ethan', 5, 'father', true, false, false));
        Game.characters.push(new Character('Olivia', 5, 'mother', false, true, true));
        Game.characters.push(new Character('Michael', 5, 'son', true, true, true));
        Game.characters.push(new Character('Sophia', 5, 'daughter', false, false, false));
        Game.characters.push(new Character('Emma', 5, 'grandmother', true, true, false));
    }

    static goToState(state: GameStates) {
        Game.currentState = state;
        this.setState();
    }

    static showPage(page) {
        page.style.display = "block";
    }

    static hidePage(page) {
        page.style.display = "none";
    }

    static hideAllPages() {
        this.hidePage(Game.travelPage);
        this.hidePage(Game.campPage);
        this.hidePage(Game.statsPage);
        this.hidePage(Game.eventPage);
        this.hidePage(Game.gameOverPage);
    }

    static setState() {
        this.hideAllPages();

        switch(Game.currentState) {
            case GameStates.TRAVEL: 
                this.showPage(Game.travelPage);
                Game.travel.start();
            break;
            case GameStates.CAMP: 
                this.showPage(Game.campPage);
                Game.camp.start();
            break;
            case GameStates.STATS: 
                this.showPage(Game.statsPage);
                Game.stats.start();
            break;
            case GameStates.EVENT: 
                this.showPage(Game.eventPage);
                Game.events.start();
            break;
            case GameStates.LOG:
                Game.log.start();
            break;
            case GameStates.GAME_OVER:
                this.showPage(Game.gameOverPage);
                Game.gameOver.start();
            break;
        }
    }
}