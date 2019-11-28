import { CampManager } from './managers/CampManager';
import { EventManager } from './managers/EventManager';
import { GameOverManager } from './managers/GameOverManager';
import { StatsManager } from './managers/StatsManager';
import { TravelManager } from './managers/TravelManager';
import { LogManager } from './managers/LogManager';
import { BagManager } from './managers/BagManager';
import { Character } from './entities/Character';
import { CharacterManager } from './managers/CharacterManager';
import { Item, ItemType } from './entities/Item';
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
    private static _instance: Game;
    private _states: GameStates;
    private _currentState = 1;
    private _currentDay = 1;
    private _hours = 0;
    private _clock: Clock; 
    private _characters: Character[] = [];
    private _travelledDistance = 0;
    private _distanceToGoal = 300;
    private _travelPage: HTMLElement;
    private _logPage: HTMLElement;
    private _campPage: HTMLElement;
    private _statsPage: HTMLElement;
    private _eventPage: HTMLElement;
    private _gameOverPage: HTMLElement;
    private _bagPage: HTMLElement;
    private _camp: CampManager;
    private _events: EventManager;
    private _gameOver: GameOverManager;
    private _stats: StatsManager;
    private _travel: TravelManager;
    private _log: LogManager;
    private _bag: BagManager;
    private _characterManager: CharacterManager;

    private constructor() {
        this._travelPage = document.getElementById("travel-page");
        this._logPage = document.getElementById("log-page");
        this._campPage = document.getElementById("camp-page");
        this._statsPage = document.getElementById("stats-page");
        this._eventPage = document.getElementById("event-page");
        this._gameOverPage = document.getElementById("game-over-page");
        this._bagPage = document.getElementById("bag-page");
    }

    static getInstance(): Game {
        if (!Game._instance) {
            Game._instance = new Game();
        }
        
        return Game._instance;
    }

    public start(): void {

        this._bag = new BagManager();
        this._camp = new CampManager();
        this._events = new EventManager();
        this._gameOver = new GameOverManager();
        this._stats = new StatsManager();
        this._travel = new TravelManager();
        this._characterManager = new CharacterManager();
        this._clock = new Clock(8, true);
        this._log = new LogManager();

        this.createAllCharacters();
        this.hideAllPages();
        this.addItemsToBag();
        this.showPage(this._campPage);
    }

    get log(): LogManager {
        return this._log;
    }

    get clock(): Clock {
        return this._clock;
    }

    get characterManager(): CharacterManager {
        return this._characterManager;
    }

    get bagManager(): BagManager {
        return this._bag;
    }

    get hours(): number {
        return this._hours;
    }

    set hours(hours: number) {
        this._hours = hours;
    }

    get currentDay(): number {
        return this._currentDay;
    }

    get distanceToGoal(): number {
        return this._distanceToGoal;
    }

    get travelledDistance(): number {
        return this._travelledDistance;
    }

    get characters(): Character[] {
        return this._characters;
    }

    public addDistanceToTravelledDistance(distanceToAdd: number) {
        this._travelledDistance += distanceToAdd;
    }

    public addDaysToCurrentDay (daysToAdd: number): void {
        this._currentDay += daysToAdd;
    }

    private createAllCharacters(): void {
        const initialHungry = 0;
        this._characters.push(new Character('Ethan', 5, 'you', true, initialHungry, 0, false, 5, 18));
        this._characters.push(new Character('Olivia', 5, 'wife', false, initialHungry, 0, true, 5, 18));
        this._characters.push(new Character('Michael', 3, 'son', true, initialHungry, 0, true, 3, 12));
        this._characters.push(new Character('Sophia', 3, 'daughter', false, initialHungry, 0, false, 3, 12));
        this._characters.push(new Character('Emma', 3, 'mother', true, initialHungry, 0, false, 3, 12));
    }

    public addItemsToBag(): void {
        this._bag.putItem(new Item("Food", "", 3, ItemType.Food));
    }

    public goToState(state: GameStates): void {
        if (this._currentState == GameStates.GAME_OVER) return;
        
        this._currentState = state;
        this.setState();
    }

    public showPage(page: HTMLElement): void {
        page.style.display = 'flex';
    }

    public hidePage(page: HTMLElement): void {
        page.style.display = "none";
    }

    private hideAllPages(): void {
        this.hidePage(this._travelPage);
        this.hidePage(this._logPage);
        this.hidePage(this._campPage);
        this.hidePage(this._statsPage);
        this.hidePage(this._eventPage);
        this.hidePage(this._gameOverPage);
        this.hidePage(this._bagPage);
    }

    public setState(): void {
        this.hideAllPages();

        switch(this._currentState) {
            case GameStates.TRAVEL: 
                this.showPage(this._travelPage);
                this._travel.start();
            break;
            case GameStates.CAMP: 
                this.showPage(this._campPage);
                this._camp.start();
            break;
            case GameStates.STATS: 
                this.showPage(this._statsPage);
                this._stats.start();
            break;
            case GameStates.EVENT: 
                this.showPage(this._eventPage);
                this._events.start();
            break;
            case GameStates.LOG:
                this.showPage(this._logPage);
                this._log.start();
            break;
            case GameStates.GAME_OVER:
                this.showPage(this._gameOverPage);
                this._gameOver.start();
            break;
            case GameStates.BAG:
                this.showPage(this._bagPage);
                this._bag.start();
            break;
        }
    }
}
