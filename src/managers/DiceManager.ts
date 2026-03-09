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
    private _diceTimer: any;

    constructor(canvasId: string) {
        this.percentageTable = {
            '1': 16.67, '2': 16.67, '3': 16.67,
            '4': 16.67, '5': 16.67, '6': 16.67
        };

        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        this.diceSize = 160;
        this.cornerRadius = 22;
        this.dotRadius = 9;

        this.positions = [
            [],
            [[0, 0]],
            [[-1, -1], [1, 1]],
            [[-1, -1], [0, 0], [1, 1]],
            [[-1, -1], [-1, 1], [1, -1], [1, 1]],
            [[-1, -1], [-1, 1], [0, 0], [1, -1], [1, 1]],
            [[-1, -1], [-1, 0], [-1, 1], [1, -1], [1, 0], [1, 1]],
        ];
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

    // ── Drawing ──────────────────────────────────────────────────

    private buildDicePath(x: number, y: number, size: number): void {
        const r = this.cornerRadius;
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + size, y,        x + size, y + size, r);
        ctx.arcTo(x + size, y + size,  x,        y + size, r);
        ctx.arcTo(x,        y + size,  x,        y,        r);
        ctx.arcTo(x,        y,         x + size, y,        r);
        ctx.closePath();
    }

    private drawFace(x: number, y: number): void {
        const ctx = this.ctx;
        const size = this.diceSize;

        this.buildDicePath(x, y, size);

        // Drop shadow to lift dice off background
        ctx.save();
        ctx.shadowBlur = 24;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 5;

        // Warm dark gradient — top-left lighter, bottom-right deeper
        const grad = ctx.createLinearGradient(x, y, x + size, y + size);
        grad.addColorStop(0, '#29281f');
        grad.addColorStop(0.5, '#161612');
        grad.addColorStop(1, '#0c0c0a');
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();

        // Border — thin off-white
        this.buildDicePath(x, y, size);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(212, 207, 196, 0.70)';
        ctx.stroke();
    }

    private drawDots(diceValue: number, glowing: boolean): void {
        const cx = this.canvas.width / 2;
        const cy = this.canvas.height / 2;
        const spacing = this.diceSize / 3.6;
        const ctx = this.ctx;

        ctx.save();
        ctx.fillStyle = '#e8e2d8';
        ctx.shadowColor = glowing
            ? 'rgba(232, 226, 216, 0.95)'
            : 'rgba(232, 226, 216, 0.35)';
        ctx.shadowBlur = glowing ? 14 : 5;

        this.positions[diceValue].forEach(([xPos, yPos]) => {
            ctx.beginPath();
            ctx.arc(
                cx + xPos * spacing,
                cy + yPos * spacing,
                this.dotRadius, 0, Math.PI * 2
            );
            ctx.fill();
        });
        ctx.restore();
    }

    private drawDice(diceValue: number, angle: number, scale: number, glowing: boolean): void {
        const { width, height } = this.canvas;
        const cx = width / 2;
        const cy = height / 2;

        this.ctx.clearRect(0, 0, width, height);
        this.ctx.save();

        // Apply wobble transform around canvas center
        this.ctx.translate(cx, cy);
        this.ctx.rotate(angle);
        this.ctx.scale(scale, scale);
        this.ctx.translate(-cx, -cy);

        const x = (width - this.diceSize) / 2;
        const y = (height - this.diceSize) / 2;
        this.drawFace(x, y);
        this.drawDots(diceValue, glowing);

        this.ctx.restore();
    }

    private getRandomDiceValue(): number {
        return Math.floor(Math.random() * 6) + 1;
    }

    // ── Public API ───────────────────────────────────────────────

    public animateDice(): void {
        this._diceTimer = setInterval(() => {
            const value = this.getRandomDiceValue();
            const angle = (Math.random() - 0.5) * 0.30;   // ±~8.5°
            const scale = 0.91 + Math.random() * 0.09;    // 91–100%
            this.drawDice(value, angle, scale, false);
        }, 50);
    }

    public stopDice(value: number): void {
        clearInterval(this._diceTimer);
        this.drawDice(value, 0, 1, true);  // settled, full glow on dots
    }
}
