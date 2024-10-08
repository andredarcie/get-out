export class Clock {
    private _anteMeridiem: boolean;
    private _currentHour: number;

    constructor(currentHour: number, anteMediem: boolean) {
        this._currentHour = currentHour;
        this._anteMeridiem = anteMediem;
    }

    get currentHour(): number {
        return this._currentHour;
    }

    get anteMeridiem(): boolean {
        return this._anteMeridiem;
    }

    nextHour() {
        if (this._currentHour == 11) {
            this._anteMeridiem = !this._anteMeridiem;
        }
        
        if (this._currentHour == 12) {
            this._currentHour = 1;
        } else {
            this._currentHour++;
        }
    }

    showTime(): string {
        return (this._currentHour <= 9 ? '0' : '') + this._currentHour.toString() + ':00 ' + (this._anteMeridiem ? 'a.m' : 'p.m');
    }
}