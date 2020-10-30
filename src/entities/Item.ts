export enum ItemType {
    FirstAid,
    Food,
    Drink
}

export class Item {
    private _name: string;
    private _amount: number;
    private _type: ItemType;
    private _effect: string;

    constructor(name: string, type: ItemType, effect: string) {
        this._name = name;
        this._type = type;
        this._effect = effect;
        this._amount = 0;
    }

    get name(): string {
        return this._name;
    }

    get amount(): number {
        return this._amount;
    }

    get type(): ItemType {
        return this._type;
    }

    get effect(): string {
        return this._effect;
    }

    set amount(amount: number) {
        this._amount = amount;
    }

    getNameWithAmount(): string {
        return this._name + (this._amount > 1 ? ' x ' + this._amount : '' );
    }

    decreaseAmount(): void {
        this._amount--;
    }

    increaseAmount(): void {
        this._amount++;
    }
}