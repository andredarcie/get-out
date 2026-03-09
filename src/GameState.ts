import { Clock } from './entities/Clock';
import { SkillCheckResults } from './enums/SkillCheckResults';

export class GameState {
    private _currentDay: number = 1;
    private _hours: number = 0;
    private _clock: Clock;
    private _distanceToTheBorder: number = 300;
    public skillCheckResult: SkillCheckResults;
    public readonly playerGuid: string;

    constructor() {
        this._clock = new Clock(8, true);
        this.playerGuid = this.generateGuid();
    }

    get distanceToTheBorder(): number { return this._distanceToTheBorder; }
    get currentDay(): number { return this._currentDay; }
    get hours(): number { return this._hours; }
    set hours(h: number) { this._hours = h; }
    get clock(): Clock { return this._clock; }

    decreaseTheDistanceToTheBorder(n: number): void {
        this._distanceToTheBorder -= n;
    }

    addDaysToCurrentDay(n: number): void {
        this._currentDay += n;
    }

    passOneHour(): void {
        if (this._clock.currentHour == 12 && this._clock.anteMeridiem) {
            this.addDaysToCurrentDay(1);
        }
        this._clock.nextHour();
    }

    isDayLight(): boolean {
        if (this._clock.anteMeridiem) {
            return this._clock.currentHour > 6 && this._clock.currentHour < 12;
        } else {
            return !(this._clock.currentHour > 6 && this._clock.currentHour < 12);
        }
    }

    getRandomArbitrary(max: number): number {
        return Math.floor(Math.random() * max);
    }

    private generateGuid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
