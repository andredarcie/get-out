import { Game } from '../Game';

export class Character {
    name: string;
    health: number;
    kinship: string;
    isDead: boolean = false;
    sick: boolean = false;
    private hungry: number;
    cold: boolean = false;
    maxHealth: number;
    private limitForHungry = 18;

    constructor(name: string, health: number, kinship: string, sick: boolean, hungry: number, cold: boolean) {
        this.name = name;
        this.health = health;
        this.kinship = kinship;
        this.isDead = false;
        this.sick = sick;
        this.hungry = hungry;
        this.cold = cold;
        this.maxHealth = health;
    }

    increaseHungry() {
        if (this.hungry >= this.limitForHungry) {
            if (!this.isDead) {
                Game.tempLogs.push(this.name + ' is starving to death');
            }
            this.looseHealth(1);
        } else {
            this.hungry++;
        }
    }

    decreaseHungry(hungryToDecrease: number) {
        if (hungryToDecrease < 0) {
            throw new Error('Invalid value for hungryToDecrease');
        }

        if (this.hungry > 0) {
            this.hungry = this.hungry - hungryToDecrease;
        }
    }

    getHungry(): string {
        if (this.hungry >= 6 && this.hungry < 12) {
            return '[HUNGRY]';
        } else if (this.hungry >= 12) {
            return '[VERY HUNGRY]'
        }

        return '';
    }

    looseHealth(healthToLoose: number): void {
        if (healthToLoose < 0 || healthToLoose > this.maxHealth) {
            throw new Error('Invalid value for healthToLoose');
        }

        if (this.health > 0) {
            this.health -= healthToLoose;

            if (this.health <= 0) {
                this.health = 0;

                if (this.hungry >= this.limitForHungry) {
                    Game.tempLogs.push(this.name + ' starved to death at day ' + Game.currentDay);
                } else {
                    Game.tempLogs.push(this.name + ' died at day ' + Game.currentDay);
                }
                
                this.isDead = true;
            } else {
                Game.tempLogs.push(this.name + ' lost -' + healthToLoose + ' health');
            }
        }
    }
}