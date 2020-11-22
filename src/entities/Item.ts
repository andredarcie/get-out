import { Affliction } from '../entities/Affliction';

export enum ItemType {
    FirstAid,
    Food,
    Drink
}

export class Item {
    private _name: string;
    private _amount: number;
    private _type: ItemType;
    private _effectValue: number;
    private _afflictions: Affliction[] = [];
 
    constructor(name: string, type: ItemType, effectValue: number, afflictions: Affliction[] = []) {
        this._name = name;
        this._type = type;
        this._amount = 0;
        this._effectValue = effectValue;
        this._afflictions = afflictions;
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

    get afflictions(): Affliction[] {
        return this._afflictions;
    }

    get effect(): string {
        let effect: string = '';

        switch(this._type) {
            case ItemType.FirstAid:
                effect += '❤️';
                break;
            case ItemType.Food:
                effect += '🥫';
                break;
        }

        effect += ' +' + this.effectValue + '%';
        return effect;
    }

    get effectValue(): number {
        return this._effectValue;
    }

    set amount(amount: number) {
        this._amount = amount;
    }

    showAmount(): string {
        return (this._amount > 1 ? ' x ' + this._amount : '' );
    }

    decreaseAmount(): void {
        this._amount--;
    }

    increaseAmount(): void {
        this._amount++;
    }

    public showAfflictions(): string {
        if (this._afflictions.length == 0) {
            return '';
        }

        let afflictions: string = '';
        for (let affliction of this._afflictions) {
            afflictions += ' [ ' + affliction.name + ' ] ';
        }

        return afflictions;
    }
}