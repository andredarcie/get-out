import { Difficulties } from "../enums/Difficulties";
import { EnemyTypes } from "../seeds/EnemySeeds";

export class Enemy {
    private _name: string;
    private _type: EnemyTypes;
    private _attack: Difficulties;
    private _runAway: Difficulties;
    private _timesThatAppears: number;
    private _imageUrl: string;
    
    constructor(name: string, type: EnemyTypes, attack: Difficulties, runAway: Difficulties, timesThatAppears: number, imageUrl: string = '') {
        this._name = name;
        this._type = type;
        this._attack = attack;
        this._runAway = runAway;
        this._timesThatAppears = timesThatAppears;
        this._imageUrl = imageUrl;
    }

    get name(): string {
        return this._name;
    }

    get attack(): Difficulties {
        return this._attack;
    }

    get runAway(): Difficulties {
        return this._runAway;
    }
}