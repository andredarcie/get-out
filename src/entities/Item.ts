import { Status } from './Status';

export class Item {
    private _name: string;
    private _amount: number;
    private _status: Status;
 
    constructor(name: string, status: Status) {
        this._name = name;
        this._amount = 0;
        this._status = status;
    }

    get name(): string {
        return this._name;
    }

    get amount(): number {
        return this._amount;
    }

    get status(): Status {
        return this._status;
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
}