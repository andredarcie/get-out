import { Game } from '../Game';
import { LogType } from '../managers/LogManager';
import { GameStates } from '../enums/GameStates';
import { Afflictions } from '../enums/Afflictions';

export class Character {
    private _name: string;
    private _kinship: string;
    private _dateOfBirth: string;
    private _imageURL: string;
    private _health: number = 100;
    private _stamina: number = 100;
    private _hungry: number = 100;
    private _afflictions: Afflictions[] = [];

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
        return this._kinship;
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

    public addAffliction(affliction: Afflictions) {
        this._game.logManager.addTempLog(this._name + ' got: ' + this.getAfflictionText(affliction), LogType.Result);
        this._afflictions.push(affliction);
    }

    public removeAffliction(afflictionToRemove: Afflictions) {
        this._afflictions = this._afflictions.filter(affliction => affliction !== afflictionToRemove);
    }

    public showAfflictions(): string {
        if (this._afflictions.length == 0) {
            return '';
        }

        let afflictions: string = '';
        for (let affliction of this._afflictions) {
            afflictions += this.getAfflictionText(affliction);
        }

        return afflictions;
    }

    private getAfflictionText(affliction: Afflictions): string {
        switch(affliction) {
            case Afflictions.Anxiety:
                return ' [ Anxiety ] ';
            case Afflictions.BloodLoss:
                return ' [ Blood Loss ] ';
            case Afflictions.BrokenRibs:
                return ' [ Broken Ribs ] ';
            case Afflictions.Depressed:
                return ' [ Depressed ] ';
            case Afflictions.Dysentery:
                return ' [ Dysentery ] ';
            case Afflictions.Fear:
                return ' [ Fear ]';
            case Afflictions.FoodPoisoning:
                return ' [ Food Poisoning ] ';
            case Afflictions.Infection:
                return ' [ Infection ] ';
            case Afflictions.Pain:
                return ' [ Pain ] ';    
            case Afflictions.Wounds:
                return ' [ Wounds ] ';
        }
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