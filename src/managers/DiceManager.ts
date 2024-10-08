import { Game } from '../Game';
import { Difficulties } from '../enums/Difficulties';

export interface Difficult {
    value: number,
    text: string,
    class: string
}

export class DiceManager {
    private percentageTable: any;

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private diceSize: number;
    private cornerRadius: number;
    private dotRadius: number;
    private positions: [number, number][][];

    constructor(canvasId: string) {
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

        //this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        //this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

        this.diceSize = 150;
        this.cornerRadius = 20;
        this.dotRadius = 10;

        // Definindo as posições das bolinhas para as faces do dado
        this.positions = [
            [], // 0 - nunca usado
            [[0, 0]], // 1
            [[-1, -1], [1, 1]], // 2
            [[-1, -1], [0, 0], [1, 1]], // 3
            [[-1, -1], [-1, 1], [1, -1], [1, 1]], // 4
            [[-1, -1], [-1, 1], [0, 0], [1, -1], [1, 1]], // 5
            [[-1, -1], [-1, 0], [-1, 1], [1, -1], [1, 0], [1, 1]] // 6
        ];
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

    private drawRoundedRect(x: number, y: number, width: number, height: number, radius: number): void {
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.arcTo(x + width, y, x + width, y + height, radius);
        this.ctx.arcTo(x + width, y + height, x, y + height, radius);
        this.ctx.arcTo(x, y + height, x, y, radius);
        this.ctx.arcTo(x, y, x + width, y, radius);
        this.ctx.closePath();
        this.ctx.fillStyle = "black";  // Preenchendo o dado com preto
        this.ctx.fill();
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = "white"; // Contorno branco para o dado
        this.ctx.stroke();
    }

    private drawDots(diceValue: number): void {
        const centerX: number = this.canvas.width / 2;
        const centerY: number = this.canvas.height / 2;
        const spacing: number = this.diceSize / 4;

        this.ctx.fillStyle = "white"; // Bolinhas brancas
        this.positions[diceValue].forEach(([xPos, yPos]: [number, number]) => {
            const x = centerX + xPos * spacing;
            const y = centerY + yPos * spacing;
            this.ctx.beginPath();
            this.ctx.arc(x, y, this.dotRadius, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    private drawDice(diceValue: number): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Desenha o retângulo arredondado (o dado)
        const x = (this.canvas.width - this.diceSize) / 2;
        const y = (this.canvas.height - this.diceSize) / 2;
        this.drawRoundedRect(x, y, this.diceSize, this.diceSize, this.cornerRadius);

        // Desenha as bolinhas de acordo com o valor do dado
        this.drawDots(diceValue);
    }

    private getRandomDiceValue(): number {
        return Math.floor(Math.random() * 6) + 1;
    }

    public animateDice(): void {
        setInterval(() => {
            const diceValue = this.getRandomDiceValue();
            this.drawDice(diceValue);
        }, 1000);
    }
}