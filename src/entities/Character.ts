import { Game } from '../Game';

export class Character {
    name: string;
    health: number;
    kinship: string;
    isDead: boolean = false;
    sick: boolean = false;
    hungry: boolean = false;
    cold: boolean = false;
    maxHealth: number;

    constructor(name: string, health: number, kinship: string, sick: boolean, hungry: boolean, cold: boolean) {
        this.name = name;
        this.health = health;
        this.kinship = kinship;
        this.isDead = false;
        this.sick = sick;
        this.hungry = hungry;
        this.cold = cold;
        this.maxHealth = health;
    }

    looseHealth(healthToLoose: number): void {
        if (healthToLoose < 0 || healthToLoose > this.maxHealth) {
            throw new Error('Invalid value for healthToLoose');
        }

        if (this.health > 0) {
            this.health -= healthToLoose;

            if (this.health <= 0) {
                this.health = 0;
                Game.tempLogs.push(this.name + ' died at day ' + Game.currentDay);
                this.isDead = true;
            } else {
                Game.tempLogs.push(this.name + ' lost -' + healthToLoose + ' health');
            }
        }
    }
}