import { Difficulties } from '../enums/Difficulties';

export interface Difficult {
    value: number,
    text: string,
    class: string
}

export class DiceManager {
    private percentageTable: Record<string, number>;
    private readonly diceElement: HTMLElement;

    constructor(canvasId: string) {
        this.percentageTable = {
            '1': 16.67, '2': 16.67, '3': 16.67,
            '4': 16.67, '5': 16.67, '6': 16.67
        };

        this.diceElement = document.getElementById(canvasId) as HTMLElement;
    }

    start() {}

    public getDifficult(difficulty: Difficulties): Difficult {
        switch (difficulty) {
            case Difficulties.TRIVIAL:     return { value: 1, text: 'Trivial',      class: 'green-color-border' };
            case Difficulties.EASY:        return { value: 2, text: 'Easy',         class: 'green-color-border' };
            case Difficulties.MEDIUM:      return { value: 3, text: 'Medium',       class: 'green-color-border' };
            case Difficulties.CHALLENGING: return { value: 4, text: 'Challenging',  class: 'yellow-color-border' };
            case Difficulties.VERY_HARD:   return { value: 5, text: 'Very Hard',    class: 'red-color-border' };
            case Difficulties.IMPOSSIBILE: return { value: 6, text: 'Impossibile',  class: 'red-color-border' };
        }
    }

    public calculateProbabilityFrom(value: number): string {
        if (value > 12) value = 12;
        if (value <= 1) value = 2;
        return this.percentageTable[value] + '%';
    }

    private setFace(value: number): void {
        for (let face = 1; face <= 6; face++) {
            this.diceElement.classList.remove(`dice--${face}`);
        }

        this.diceElement.classList.add(`dice--${value}`);
    }

    public animateDice(): void {
        this.diceElement.style.setProperty('--roll-x-start', `${-35 + Math.random() * 22}deg`);
        this.diceElement.style.setProperty('--roll-y-start', `${20 + Math.random() * 60}deg`);
        this.diceElement.style.setProperty('--roll-z-start', `${Math.random() * 120}deg`);
        this.diceElement.classList.remove('is-settled');
        this.diceElement.classList.add('is-rolling');
    }

    public stopDice(value: number): void {
        this.diceElement.classList.remove('is-rolling');
        this.setFace(value);
        this.diceElement.classList.add('is-settled');
    }
}
