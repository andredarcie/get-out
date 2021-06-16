import { EventManager } from './managers/EventManager';
import { GameOverManager } from './managers/GameOverManager';
import { RipManager } from './managers/RipManager';
import { TravelManager } from './managers/TravelManager';
import { LogManager } from './managers/LogManager';
import { BagManager } from './managers/BagManager';
import { StateManager } from './managers/StateManager';
import { GameStates } from './enums/GameStates';
import { Character } from './entities/Character';
import { CharacterManager } from './managers/CharacterManager';
import { Language, LocalizationManager } from './managers/LocalizationManager';
import { DialogManager } from './managers/DialogManager';
import { MapManager } from './managers/MapManager';
import { SkillUpManager } from './managers/SkillUpManager';
import { Clock } from './entities/Clock';
import * as firebase from 'firebase/app';
import { ItemSeeds, ItemsNames } from './seeds/ItemSeeds';
import { DiceManager } from './managers/DiceManager';
import { SkillCheckManager, SkillCheckResults } from './managers/SkillCheckManager';
import { ItemPickerManager } from './managers/ItemPickerManager';
import { AudioManager } from './managers/AudioManager';
require("firebase/database");

export class Game {
    private static _instance: Game;
    private _currentDay = 1;
    private _hours = 0;
    private _clock: Clock; 
    private _distanceToTheBorder = 300;

    public travelPage: HTMLElement;
    public logPage: HTMLElement;
    public eventPage: HTMLElement;
    public skillCheckPage: HTMLElement;
    public gameOverPage: HTMLElement;
    public ripPage: HTMLElement;
    public bagPage: HTMLElement;
    public itemPickerPage: HTMLElement;
    public dialogPage: HTMLElement;
    public mapPage: HTMLElement;
    public skillUpPage: HTMLElement;

    public eventManager: EventManager;
    public skillCheckManager: SkillCheckManager;
    public gameOverManager: GameOverManager;
    public ripManager: RipManager;
    public travelManager: TravelManager;
    public logManager: LogManager;
    public bagManager: BagManager;
    public characterManager: CharacterManager;
    public stateManager: StateManager;
    public itemPickerManager: ItemPickerManager;
    public loc: LocalizationManager;
    public dialogManager: DialogManager;
    public mapManager: MapManager;
    public skillUpManager: SkillUpManager;
    public audioManager: AudioManager;

    private _currentTimeField: Element;
    private playerGuid: string;

    public skillCheckResult: SkillCheckResults;

    private constructor() {
        this.travelPage = document.getElementById("travel-page");
        this.logPage = document.getElementById("log-page");
        this.eventPage = document.getElementById("event-page");
        this.skillCheckPage = document.getElementById("skill-check-page");
        this.gameOverPage = document.getElementById("game-over-page");
        this.ripPage = document.getElementById("rip-page");
        this.bagPage = document.getElementById("bag-page");
        this.itemPickerPage = document.getElementById("item-picker-page");
        this.dialogPage = document.querySelector("#dialog-page");
        this.mapPage = document.querySelector("#map-page");
        this.skillUpPage = document.querySelector("#skill-up-page");

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
        this.loc = new LocalizationManager(Language.EnUs);
        let dice = new DiceManager();
        dice.start();
        
        this.bagManager = new BagManager();
        //this.addItemsToBag();
        this.characterManager = new CharacterManager();
        this.characterManager.start();
        this.eventManager = new EventManager();
        this.gameOverManager = new GameOverManager();
        this.skillCheckManager = new SkillCheckManager();
        this.ripManager = new RipManager();
        this.travelManager = new TravelManager();
        this._clock = new Clock(8, true);
        this.logManager = new LogManager();
        this.stateManager = new StateManager();
        this.itemPickerManager = new ItemPickerManager();
        this.dialogManager = new DialogManager();
        this.mapManager = new MapManager();
        this.skillUpManager = new SkillUpManager();
        this.audioManager = new AudioManager();

        this.showDataTime();
        this.stateManager.goToState(GameStates.TRAVEL);
        this.startFirebase();
    }

    get events() {
        return this.eventManager;
    }

    public startFirebase(): void {
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
    }

    get log(): LogManager {
        return this.logManager;
    }

    get clock(): Clock {
        return this._clock;
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
        return this.characterManager.characters;
    }
    
    public decreaseTheDistanceToTheBorder(distanceToDecrease: number) {
        this._distanceToTheBorder -= distanceToDecrease;
    }

    public addDaysToCurrentDay (daysToAdd: number): void {
        this._currentDay += daysToAdd;
    }

    public addItemsToBag(): void {
        for(let i = 0; i < 10; i++) {
            this.bagManager.putItem(ItemSeeds.getOneRandomItem());
        }
    }

    public showPage(page: HTMLElement): void {
        page.style.display = 'flex';
    }

    public hidePage(page: HTMLElement): void {
        page.style.display = "none";
    }

    public hideAllPages(): void {
        this.hidePage(this.travelPage);
        this.hidePage(this.logPage);
        this.hidePage(this.eventPage);
        this.hidePage(this.skillCheckPage);
        this.hidePage(this.gameOverPage);
        this.hidePage(this.bagPage);
        this.hidePage(this.ripPage);
        this.hidePage(this.itemPickerPage);
        this.hidePage(this.skillUpPage);
        this.hidePage(this.dialogPage);
        this.hidePage(this.mapPage);
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
