import { Game } from '../Game';

export class DiceManager {
    constructor() {
    }

    start() {
    }

    public getDifficultLevel(difficultLevel: number): string {
        if (difficultLevel < 2) {
            return 'Trivial';
        } else if (difficultLevel <= 4) {
            return 'Easy';
        } else if (difficultLevel <= 6) {
            return 'Medium';
        } else if (difficultLevel <= 8) {
            return 'Challenging';
        } else if (difficultLevel <= 10) {
            return 'Very Hard';
        } else if (difficultLevel <= 12) {
            return 'Impossibile';
        }
    }
}