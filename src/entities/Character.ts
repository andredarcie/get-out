import { Game, GameStates } from '../Game';

export class Character {
    private _name: string;
    private _kinship: string;

    private _health: number = 100;
    private _stamina: number = 100;
    private _hungry: number = 100;
    private _thirst: number = 100;

    private _isDead: boolean = false;
    private _sick: boolean = false;

    private readonly _game: Game;

    constructor(name: string, kinship: string) {
        this._name = name;
        this._kinship = kinship;

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

    get thirst() {
        return this._thirst;
    }

    increaseHungry() {
        if (this._hungry >= 100) {
            this.looseHealth(10);

            if (this._isDead) {
                this._game.log.addTempLog(this._name + ' starved to death at day ' + this._game.currentDay);
            } else {
                this._game.log.addTempLog(this._name + ' 🥫 -5%');
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

            this.looseHealth(1);

            if (this._isDead) {
                this._game.log.addTempLog(this._name + ' died of exhaustion at day ' + this._game.currentDay);
            } else {
                this._game.log.addTempLog(this._name + ' is dying of tiredness');
            }
        }
    }

    decreaseHungry(hungryToDecrease: number) {
        if (hungryToDecrease < 0) {
            throw new Error('Hungry to decrease value must be greater than zero');
        }

        if (this._hungry > 0) {
            this._hungry = this._hungry - hungryToDecrease;
        }
    }

    decreaseThirst(thirstToDecrease: number) {
        if (thirstToDecrease < 0) {
            throw new Error('Thirst to decrease value must be greater than zero');
        }

        if (this._thirst > 0) {
            this._thirst = this._thirst - thirstToDecrease;
        }
    }

    getThirst(): string {
        return '💧' + this._thirst + '%';
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
                    this._game.goToState(GameStates.GAME_OVER);
                }
            }
        }
    }

    increaseHealth(healthToIncrease: number): void {
        this._health += healthToIncrease;
    }
}