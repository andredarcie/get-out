export enum ItemType {
    Food,
    Drink,
    Medical,
    Tool,
    Weapon
}

export class Item {
    private _name: string;
    private _description: string;
    private _amount: number;
    private _type: ItemType;

    constructor(name: string, description: string, amount: number, type: ItemType) {
        this._name = name;
        this._description = description;
        this._amount = amount;
        this._type = type;
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

    get type(): ItemType {
        return this._type;
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