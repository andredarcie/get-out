export class Item {
    private name: string;
    private description: string;
    private amount: number;

    constructor(name: string, description: string, amount: number) {
        this.name = name;
        this.description = description;
        this.amount = amount;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    getAmount(): number {
        return this.amount;
    }

    getNameWithAmount(): string {
        return this.name + (this.amount > 1 ? ' x ' + this.amount : '' );
    }

    decreaseAmount(): void {
        this.amount--;
    }
}