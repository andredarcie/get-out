export class Item {
    private _name: string;
    private _description: string;
    private _amount: number;

    constructor(name: string, description: string, amount: number) {
        this._name = name;
        this._description = description;
        this._amount = amount;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get amount(): number {
        return this._amount;
    }

    getNameWithAmount(): string {
        return this.name + (this.amount > 1 ? ' x ' + this.amount : '' );
    }

    decreaseAmount(): void {
        this._amount--;
    }

    increaseAmount(): void {
        this._amount++;
    }
}