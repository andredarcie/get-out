import { CampManager } from './managers/CampManager';
import { EventManager } from './managers/EventManager';
import { GameOverManager } from './managers/GameOverManager';
import { TravelManager } from './managers/TravelManager';
import { LogManager } from './managers/LogManager';
import { BagManager } from './managers/BagManager';
import { Character } from './entities/Character';
import { CharacterManager } from './managers/CharacterManager';
import { Item, ItemType } from './entities/Item';
import { Clock } from './entities/Clock';
import * as firebase from 'firebase/app';
import { ItemSeeds, ItemsNames } from './seeds/ItemSeeds';
require("firebase/database");

export enum GameStates {
    TRAVEL,
    CAMP,
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
    private _distanceToTheBorder = 300;
    private _travelPage: HTMLElement;
    private _logPage: HTMLElement;
    private _campPage: HTMLElement;
    private _eventPage: HTMLElement;
    private _gameOverPage: HTMLElement;
    private _bagPage: HTMLElement;
    private _camp: CampManager;
    private _events: EventManager;
    private _gameOver: GameOverManager;
    private _travel: TravelManager;
    private _log: LogManager;
    private _bag: BagManager;
    private _characterManager: CharacterManager;
    private _currentTimeField: Element;
    private playerGuid: string;

    private constructor() {
        this._travelPage = document.getElementById("travel-page");
        this._logPage = document.getElementById("log-page");
        this._campPage = document.getElementById("camp-page");
        this._eventPage = document.getElementById("event-page");
        this._gameOverPage = document.getElementById("game-over-page");
        this._bagPage = document.getElementById("bag-page");
        this._currentTimeField = document.querySelector("#current-time-field");
        this.playerGuid = this.generateGuid();
    }

    static getInstance(): Game {
        if (!Game._instance) {
            Game._instance = new Game();
        }
        
        return Game._instance;
    }

    public start(): void {

        this._bag = new BagManager();
        //this.addItemsToBag();

        this._camp = new CampManager();
        this._events = new EventManager();
        this._gameOver = new GameOverManager();
        this._travel = new TravelManager();
        this._characterManager = new CharacterManager();
        this._clock = new Clock(8, true);
        this._log = new LogManager();

        this.showDataTime();
        this.createAllCharacters();
        this.goToState(GameStates.TRAVEL);
        this.startFirebase();
    }

    private startFirebase(): void {
        var firebaseConfig = {
            apiKey: "AIzaSyBgdfo0fzhb_Meli1pcIhUb-qimpce-_WA",
            authDomain: "getout-a2360.firebaseapp.com",
            databaseURL: "https://getout-a2360.firebaseio.com",
            projectId: "getout-a2360",
            storageBucket: "getout-a2360.appspot.com",
            messagingSenderId: "995739637479",
            appId: "1:995739637479:web:fc4723344bae88ff317442",
            measurementId: "G-D8S0K3NWFV"
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    }

    public addLogToFirebase(logToAdd: string): void {
        const logsRef = firebase.database().ref('logs/' + this.playerGuid);
        const newLogsRef = logsRef.push();
        newLogsRef.set(
            logToAdd
        )
        .then((docRef) => {
            console.log("Document written with log");
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
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

    get distanceToTheBorder(): number {
        return this._distanceToTheBorder;
    }

    get characters(): Character[] {
        return this._characters;
    }
    
    public decreaseTheDistanceToTheBorder(distanceToDecrease: number) {
        this._distanceToTheBorder -= distanceToDecrease;
    }

    public addDaysToCurrentDay (daysToAdd: number): void {
        this._currentDay += daysToAdd;
    }

    private createAllCharacters(): void {
        this._characters.push(new Character('Ethan', 'you'));
        this._characters.push(new Character('Olivia', 'wife'));
        this._characters.push(new Character('Michael', 'son'));
        this._characters.push(new Character('Sophia', 'daughter'));
    }

    public addItemsToBag(): void {
        for(let i = 0; i < 10; i++) {
            this._bag.putItem(ItemSeeds.getOneRandomItem());
        }
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

    showDataTime() {
        this._currentTimeField.innerHTML = this._clock.showTime() + ' - day ' + this._currentDay;

        if (this._clock.anteMeridiem) {
            if (this._clock.currentHour > 6 && this._clock.currentHour < 12) {
                this._currentTimeField.innerHTML += ' - daylight';
            } else {
                this._currentTimeField.innerHTML += ' - night';
            }
        } else {
            if (this._clock.currentHour > 6 && this._clock.currentHour < 12) {
                this._currentTimeField.innerHTML += ' - night';
            } else {
                this._currentTimeField.innerHTML += ' - daylight';
            }
        }
    }

    passOneHour(): void {
        if (this._clock.currentHour == 12 && this._clock.anteMeridiem) {
            this.addDaysToCurrentDay(1);
        }

        this._clock.nextHour();
        this.showDataTime();
    }

    generateGuid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
    }

    getRandomArbitrary(max: number): number {
        return Math.floor(Math.random() * max);
    }
}
