import { Game } from '../Game';
import { LogType } from '../managers/LogManager';
import { GameStates } from '../enums/GameStates';
import { Status } from './Status';

export class Character {
    private _name: string;
    private _kinship: string;
    private _dateOfBirth: string;
    private _imageURL: string;
    private _health: number = 100;
    private _stamina: number = 100;
    private _hungry: number = 100;
    private _status: Status[] = [];

    private _isDead: boolean = false;
    private _buried: boolean = false;
    private _sick: boolean = false;

    private readonly _game: Game;

    constructor(name: string, kinship: string, health: number = 100, stamina: number = 100, hungry: number = 100, dateOfBirth: string, isDead: boolean) {
        this._name = name;
        this._kinship = kinship;
        this._health = health;
        this._stamina = stamina;
        this._hungry = hungry;
        this._dateOfBirth = dateOfBirth;
        this._isDead = isDead;
        this._game = Game.getInstance();
    }

    get name() {
        return this._name;
    }

    get isDead() {
        return this._isDead;
    }

    get health() {
        return this._health;
    }

    get stamina() {
        return this._stamina;
    }

    get kinship() {
        return this._game.loc.l(this._kinship);
    }

    get hungry() {
        return this._hungry;
    }

    get buried() {
        return this._buried;
    }

    set buried(buried: boolean) {
        this._buried = buried;
    }

    get imageURL() {
        return this._imageURL;
    }

    set imageURL(imageURL: string) {
        this._imageURL = imageURL;
    }

    public walkOneHour(): void {
        for (let affliction of this._status) {
            this.looseHealth(affliction.healthPerHour);
            this._game.logManager.addTempLog(this._name + ' has ' + affliction.name, LogType.Result);
        }
    }

    public showHealthLostPerHourDueToAllStatus(): number {
        let totalHealth: number = 0;
        for (let status of this._status) {
            totalHealth += status.healthPerHour;
        }

        return totalHealth;
    }

    private checksIfAnStatusExists(statusName: string): boolean {
        let existingStatusIndex = this._status.findIndex(status => status.name == statusName);
        return existingStatusIndex  != -1 ? true : false;
    }

    public addStatus(affliction: Status) {
        if (!this.checksIfAnStatusExists(affliction.name)) {
            this._game.logManager.addTempLog(this._name + ' got: ' + affliction.name, LogType.Result);
            this._status.push(affliction);
        }
    }

    public removeStatus(statusToRemove: Status) {
        this._status = this._status.filter(status => status !== statusToRemove);
    }

    public showAfflictions(): string {
        if (this._status.length == 0) {
            return '';
        }

        let afflictions: string = '';
        for (let affliction of this._status) {
            if (affliction) {
                afflictions += ' -' + affliction.name;
            }
        }

        return afflictions;
    }

    increaseHungry() {
        if (this._hungry <= 0) {
            this.looseHealth(10);

            if (this._isDead) {
                this._game.log.addTempLog(this._name + ' starved to death at day ' + this._game.currentDay, LogType.StatusChange);
            }
        } else {
            this._hungry = this._hungry - 5;
        }
    }

    increaseStaminaToMax() {
        this._stamina = 100;
    }

    increaseStamina() {
        this._stamina = 20;
    }

    decreaseStamina(staminaToDecrease: number) {
        if (staminaToDecrease <= 0) {
            throw new Error('Stamina value must be greater than zero');
        }

        this._stamina = this._stamina - staminaToDecrease;

        if (this._stamina <= 0) {
            this._stamina = 0;

            this.looseHealth(20);

            if (this._isDead) {
                this._game.log.addTempLog(this._name + ' died of exhaustion at day ' + this._game.currentDay, LogType.StatusChange);
            } else {
                this._game.log.addTempLog(this._name + ' is dying of tiredness', LogType.Result);
            }
        }
    }

    decreaseHungry(hungryToDecrease: number) {
        if (hungryToDecrease < 0) {
            throw new Error('Hungry to decrease value must be greater than zero');
        }

        if (this._hungry < 100) {
            this._hungry = this._hungry + hungryToDecrease;
        }

        if (this._hungry > 100) {
            this._hungry = 100;
        }
    }

    getHungry(): string {
        return '🥫' + this._hungry + '%';
    }

    getHealth(): string {
        return '❤️' + this._health + '%';
    }

    getStamina(): string {
        return '⚡' + this._stamina + '%';
    }

    getSickness(): string {
        return this._sick ? 'Sick' : 'Not sick'
    }

    getDateOfBirth(): string {
        return this._dateOfBirth;
    }

    
    sicken(): void {
        this._sick = true;
    }

    looseHealth(healthToLoose: number): void {
        if (healthToLoose < 0 || healthToLoose > 100) {
            throw new Error('Invalid value for healthToLoose');
        }

        if (this._health > 0) {
            this._health -= healthToLoose;

            if (this._health <= 0) {
                this._health = 0;
                this._isDead = true;

                if (this._kinship == 'you') {
                    this._game.stateManager.goToState(GameStates.GAME_OVER);
                }
            }
        }
    }

    increaseHealth(healthToIncrease: number): void {
        this._health += healthToIncrease;

        if (this._health > 100) {
            this._health = 100;
        }
    }
}