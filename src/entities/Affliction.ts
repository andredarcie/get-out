export class Affliction {
    private _name: string;
    private _healthPerHour: number;

    constructor(name: string, healthPerHour: number) {
        this._name = name;
        this._healthPerHour = healthPerHour;
    }

    get name(): string {
        return this._name;
    }

    get healthPerHour(): number {
        return this._healthPerHour;
    }
}