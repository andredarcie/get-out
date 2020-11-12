export class Dice {
    constructor() {

    }

    public roll(): number {
        return Math.floor(Math.random() * (6 - 1)) + 1;
    }    
}