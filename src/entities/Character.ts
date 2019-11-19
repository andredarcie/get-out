import { Game } from '../Game';

export class Character {
    private _name: string;
    private _health: number;
    private _kinship: string;
    private _isDead: boolean = false;
    private _sick: boolean = false;
    private _hungry: number;
    private _cold: boolean = false;
    private _maxHealth: number;
    private readonly _limitForHungry = 18;

    constructor(name: string, health: number, kinship: string, sick: boolean, hungry: number, cold: boolean) {
        this._name = name;
        this._health = health;
        this._kinship = kinship;
        this._isDead = false;
        this._sick = sick;
        this._hungry = hungry;
        this._cold = cold;
        this._maxHealth = health;
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

    get kinship() {
        return this._kinship;
    }

    increaseHungry() {
        if (this._hungry >= this._limitForHungry) {
            if (!this._isDead) {
                Game.log.addTempLog(this._name + ' is starving to death');
            }
            this.looseHealth(1);
        } else {
            this._hungry++;
        }
    }

    decreaseHungry(hungryToDecrease: number) {
        if (hungryToDecrease < 0) {
            throw new Error('Invalid value for hungryToDecrease');
        }

        if (this._hungry > 0) {
            this._hungry = this._hungry - hungryToDecrease;
        }
    }

    getHungry(): string {
        if (this._hungry >= 6 && this._hungry < 12) {
            return '[HUNGRY]';
        } else if (this._hungry >= 12) {
            return '[VERY HUNGRY]'
        }

        return '';
    }

    looseHealth(healthToLoose: number): void {
        if (healthToLoose < 0 || healthToLoose > this._maxHealth) {
            throw new Error('Invalid value for healthToLoose');
        }

        if (this._health > 0) {
            this._health -= healthToLoose;

            if (this._health <= 0) {
                this._health = 0;

                if (this._hungry >= this._limitForHungry) {
                    Game.log.addTempLog(this._name + ' starved to death at day ' + Game.currentDay);
                } else {
                    Game.log.addTempLog(this._name + ' died at day ' + Game.currentDay);
                }
                
                this._isDead = true;
            } else {
                Game.log.addTempLog(this._name + ' lost -' + healthToLoose + ' health');
            }
        }
    }
}