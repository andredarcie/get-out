import { Game } from '../Game';

export class DiceManager {
    private percentageTable: any;

    constructor() {
        this.percentageTable = {
            '2': 97,
            '3': 97,
            '4': 92,
            '5': 83,
            '6': 73,
            '7': 59,
            '8': 42,
            '9': 28,
            '10': 17,
            '11': 9,
            '12': 3
          };
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

    public getDifficultColor(difficultLevel: number): string {
        if (difficultLevel < 2) {
            return 'green-color-border';
        } else if (difficultLevel <= 4) {
            return 'green-color-border';
        } else if (difficultLevel <= 6) {
            return 'yellow-color-border';
        } else if (difficultLevel <= 8) {
            return 'yellow-color-border';
        } else if (difficultLevel <= 10) {
            return 'red-color-border';
        } else if (difficultLevel <= 12) {
            return 'red-color-border';
        }
    }

    public calculateProbabilityFrom(value: number) {
        if (value > 12) value = 12;
        return this.percentageTable[value] + '%';
      }
}