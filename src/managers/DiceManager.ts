import { Game } from '../Game';
import { Difficulties } from '../enums/Difficulties';

export interface Difficult {
    value: number,
    text: string,
    class: string
}

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

    public getDifficult(difficulty: Difficulties): Difficult {
        switch(difficulty) {
            case Difficulties.TRIVIAL:
                return { value: this.getRandomNumber(3, 5), text: 'Trivial',  class: 'green-color-border' };
            case Difficulties.EASY:
                return { value: this.getRandomNumber(6, 8), text: 'Easy',  class: 'green-color-border' };
            case Difficulties.MEDIUM:
                return { value: this.getRandomNumber(9, 11), text: 'Medium',  class: 'green-color-border' };
            case Difficulties.CHALLENGING:
                return { value: this.getRandomNumber(12, 14), text: 'Challenging',  class: 'yellow-color-border' };
            case Difficulties.VERY_HARD:
                return { value: this.getRandomNumber(15, 17), text: 'Very Hard',  class: 'red-color-border' };
            case Difficulties.IMPOSSIBILE:
                return { value: this.getRandomNumber(18, 20), text: 'Impossibile',  class: 'red-color-border' };
        }
    }

    public calculateProbabilityFrom(value: number) {
        if (value > 12) value = 12;
        if (value <= 1) value = 2;
        return this.percentageTable[value] + '%';
    }

    private getRandomNumber(start: number, end: number): number {
        let min = Math.ceil(start);
        let max = Math.floor(end);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }   
}