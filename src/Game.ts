import { CampManager } from './managers/CampManager';
import { EventManager } from './managers/EventManager';
import { GameOverManager } from './managers/GameOverManager';
import { StatsManager } from './managers/StatsManager';
import { TravelManager } from './managers/TravelManager';
import { LogManager } from './managers/LogManager';
import { BagManager } from './managers/BagManager';
import { Character } from './entities/Character';
import { CharacterManager } from './managers/CharacterManager';
import { Item } from './entities/Item';
import { Clock } from './entities/Clock';

export enum GameStates {
    TRAVEL,
    CAMP,
    STATS,
    EVENT,
    GAME_OVER,
    LOG,
    BAG,
}

export class Game {
    private static _states: GameStates;
    private static _currentState = 1;
    private static _currentDay = 1;
    private static _hours = 0;
    private static _clock: Clock; 
    private static _characters: Character[] = [];
    private static _travelledDistance = 0;
    private static _distanceToGoal = 300;
    private static _travelPage: HTMLElement;
    private static _logPage: HTMLElement;
    private static _campPage: HTMLElement;
    private static _statsPage: HTMLElement;
    private static _eventPage: HTMLElement;
    private static _gameOverPage: HTMLElement;
    private static _bagPage: HTMLElement;
    private static _camp: CampManager;
    private static _events: EventManager;
    private static _gameOver: GameOverManager;
    private static _stats: StatsManager;
    private static _travel: TravelManager;
    private static _log: LogManager;
    private static _bag: BagManager;
    private static _characterManager: CharacterManager;

    constructor() {
        Game._travelPage = document.getElementById("travel-page");
        Game._logPage = document.getElementById("log-page");
        Game._campPage = document.getElementById("camp-page");
        Game._statsPage = document.getElementById("stats-page");
        Game._eventPage = document.getElementById("event-page");
        Game._gameOverPage = document.getElementById("game-over-page");
        Game._bagPage = document.getElementById("bag-page");

        Game._camp = new CampManager();
        Game._events = new EventManager();
        Game._gameOver = new GameOverManager();
        Game._stats = new StatsManager();
        Game._travel = new TravelManager();
        Game._log = new LogManager();
        Game._bag = new BagManager();
        Game._characterManager = new CharacterManager();

        Game._clock = new Clock(8, true);
    }

    public start(): void {
        Game.createAllCharacters();
        Game.hideAllPages();
        Game.addItemsToBag();
        Game.showPage(Game._campPage);
    }

    static get log(): LogManager {
        return Game._log;
    }

    static get clock(): Clock {
        return Game._clock;
    }

    static get characterManager(): CharacterManager {
        return Game._characterManager;
    }

    static get bagManager(): BagManager {
        return Game._bag;
    }

    static get hours(): number {
        return this._hours;
    }

    static set hours(hours: number) {
        this._hours = hours;
    }

    static get currentDay(): number {
        return Game._currentDay;
    }

    static get distanceToGoal(): number {
        return this._distanceToGoal;
    }

    static get travelledDistance(): number {
        return this._travelledDistance;
    }

    static get characters(): Character[] {
        return this._characters;
    }

    public static addDistanceToTravelledDistance(distanceToAdd: number) {
        Game._travelledDistance += distanceToAdd;
    }

    public static addDaysToCurrentDay (daysToAdd: number): void {
        Game._currentDay += daysToAdd;
    }

    static createAllCharacters(): void {
        const initialHealth = 5;
        const initialHungry = 0;
        Game._characters.push(new Character('Ethan', initialHealth, 'father', true, initialHungry, false));
        Game._characters.push(new Character('Olivia', initialHealth, 'mother', false, initialHungry, true));
        Game._characters.push(new Character('Michael', initialHealth, 'son', true, initialHungry, true));
        Game._characters.push(new Character('Sophia', initialHealth, 'daughter', false, initialHungry, false));
        Game._characters.push(new Character('Emma', initialHealth, 'grandmother', true, initialHungry, false));
    }

    public static addItemsToBag(): void {
        Game._bag.putItem(new Item("Food", "", 2));
    }

    public static goToState(state: GameStates): void {
        Game._currentState = state;
        this.setState();
    }

    public static showPage(page: HTMLElement): void {
        page.style.display = "block";
    }

    public static hidePage(page: HTMLElement): void {
        page.style.display = "none";
    }

    static hideAllPages(): void {
        this.hidePage(Game._travelPage);
        this.hidePage(Game._logPage);
        this.hidePage(Game._campPage);
        this.hidePage(Game._statsPage);
        this.hidePage(Game._eventPage);
        this.hidePage(Game._gameOverPage);
        this.hidePage(Game._bagPage);
    }

    public static setState(): void {
        this.hideAllPages();

        switch(Game._currentState) {
            case GameStates.TRAVEL: 
                this.showPage(Game._travelPage);
                Game._travel.start();
            break;
            case GameStates.CAMP: 
                this.showPage(Game._campPage);
                Game._camp.start();
            break;
            case GameStates.STATS: 
                this.showPage(Game._statsPage);
                Game._stats.start();
            break;
            case GameStates.EVENT: 
                this.showPage(Game._eventPage);
                Game._events.start();
            break;
            case GameStates.LOG:
                this.showPage(Game._logPage);
                Game._log.start();
            break;
            case GameStates.GAME_OVER:
                this.showPage(Game._gameOverPage);
                Game._gameOver.start();
            break;
            case GameStates.BAG:
                this.showPage(Game._bagPage);
                Game._bag.start();
            break;
        }
    }
}
