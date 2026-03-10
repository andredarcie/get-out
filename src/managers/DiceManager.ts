import { Difficulties } from '../enums/Difficulties';

export interface Difficult {
    value: number,
    text: string,
    class: string
}

export class DiceManager {
    private percentageTable: Record<string, number>;
    private readonly diceElement: HTMLElement;
    private readonly sceneElement: HTMLElement;
    private readonly cubeElement: HTMLElement;
    private readonly shadowElement: HTMLElement;
    private settleAnimation: Animation | null = null;

    constructor(canvasId: string) {
        this.percentageTable = {
            '1': 16.67, '2': 16.67, '3': 16.67,
            '4': 16.67, '5': 16.67, '6': 16.67
        };

        this.diceElement = document.getElementById(canvasId) as HTMLElement;
        this.sceneElement = this.diceElement.closest('.dice-scene') as HTMLElement;
        this.cubeElement = this.diceElement.querySelector('.dice-cube') as HTMLElement;
        this.shadowElement = this.sceneElement.querySelector('.dice-shadow') as HTMLElement;
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
        this.settleAnimation?.cancel();
        this.settleAnimation = null;

        this.cubeElement.style.removeProperty('transform');
        this.cubeElement.style.removeProperty('animation');
        this.shadowElement.style.removeProperty('animation');
        this.diceElement.style.setProperty('--roll-x-start', `${-35 + Math.random() * 22}deg`);
        this.diceElement.style.setProperty('--roll-y-start', `${20 + Math.random() * 60}deg`);
        this.diceElement.style.setProperty('--roll-z-start', `${Math.random() * 120}deg`);
        this.diceElement.classList.remove('is-settled');
        this.sceneElement.classList.remove('is-settled');
        this.sceneElement.classList.add('is-rolling');
        this.diceElement.classList.add('is-rolling');
    }

    public stopDice(value: number): void {
        const currentTransform = getComputedStyle(this.cubeElement).transform;

        this.diceElement.classList.remove('is-rolling');
        this.sceneElement.classList.remove('is-rolling');
        this.setFace(value);
        const finalTransform = getComputedStyle(this.diceElement).getPropertyValue('--dice-final-transform').trim();
        this.diceElement.classList.add('is-settled');
        this.sceneElement.classList.add('is-settled');

        this.cubeElement.style.animation = 'none';
        this.cubeElement.style.transform = currentTransform;

        this.shadowElement.style.animation = 'none';

        this.settleAnimation?.cancel();
        this.settleAnimation = this.cubeElement.animate(
            [
                {
                    transform: currentTransform === 'none' ? 'rotateX(-24deg) rotateY(38deg)' : currentTransform,
                    offset: 0
                },
                {
                    transform: `${finalTransform} translateY(-8px) scale3d(1.04, 1.04, 1.04)`,
                    offset: 0.45
                },
                {
                    transform: `${finalTransform} translateY(2px) scale3d(0.985, 0.985, 0.985)`,
                    offset: 0.72
                },
                {
                    transform: `${finalTransform} translateY(0) scale3d(1, 1, 1)`,
                    offset: 1
                }
            ],
            {
                duration: 420,
                easing: 'cubic-bezier(0.18, 0.9, 0.22, 1)',
                fill: 'forwards'
            }
        );

        this.shadowElement.animate(
            [
                { opacity: 0.34, transform: 'translateX(-50%) rotateX(86deg) translateZ(-28px) scale(0.78)' },
                { opacity: 0.62, transform: 'translateX(-50%) rotateX(86deg) translateZ(-28px) scale(0.98)' },
                { opacity: 0.5, transform: 'translateX(-50%) rotateX(86deg) translateZ(-28px) scale(0.92)' }
            ],
            {
                duration: 420,
                easing: 'cubic-bezier(0.18, 0.9, 0.22, 1)',
                fill: 'none'
            }
        );

        this.settleAnimation.onfinish = () => {
            this.cubeElement.style.animation = '';
            this.cubeElement.style.transform = finalTransform;
            this.diceElement.classList.remove('is-settled');
            this.sceneElement.classList.remove('is-settled');
        };
    }
}
