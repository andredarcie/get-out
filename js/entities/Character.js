import { Globals } from "../Globals";

export class Character {
    
    constructor(name, health, kinship) {
        this.name = name;
        this.health = health;
        this.kinship = kinship;
    }

    looseHealth(healthToLoose) {

        if (this.health > 0) {
            
            this.health -= healthToLoose;

            if (this.health <= 0) {
                this.health = 0;
                Globals.tempLogs.push(this.name + ' died at day ' + Globals.currentDay);
            } else {
                Globals.tempLogs.push(this.name + ' lost -' + healthToLoose + ' health');
            }
        }
    }
}