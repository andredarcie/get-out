import { Game } from '../Game';
import { LogType } from '../managers/LogManager';
import { GameStates } from '../enums/GameStates';
import { Status } from './Status';

export class Character {
    private _name: string;
    private _kinship: string;
    private _dateOfBirth: string;
    private _imageURL: string;
    private _sanity: number = 100;
    private _status: Status | null;

    private _isDead: boolean = false;
    private _buried: boolean = false;
    private _sick: boolean = false;

    private readonly _game: Game;

    constructor(name: string, kinship: string, sanity: number = 100, dateOfBirth: string, isDead: boolean) {
        this._name = name;
        this._kinship = kinship;
        this._sanity = sanity;
        this._dateOfBirth = dateOfBirth;
        this._isDead = isDead;
        this._game = Game.getInstance();
    }

    get name() {
        return this._name;
    }

    get isDead() {
        return this._isDead;
    }

    get sanity() {
        return this._sanity;
    }

    get kinship() {
        return this._game.loc.l(this._kinship);
    }

    get buried() {
        return this._buried;
    }

    set buried(buried: boolean) {
        this._buried = buried;
    }

    get imageURL() {
        return this._imageURL;
    }

    set imageURL(imageURL: string) {
        this._imageURL = imageURL;
    }

    public walkOneHour(): void {
        if (this._status != null) {
            this.looseSanity(this._status?.healthPerHour ?? 0);
        }
    }

    private checksIfAnStatusExists(statusName: string): boolean {
        return this._status?.name == statusName;
    }

    public setStatus(status: Status) {
        this._game.logManager.addTempLog(this._name + ' pegou: ' + status.name, LogType.Result);
        this._status = status;
    }

    public removeStatus() {
        this._status = null;
    }

    public showAfflictions(): string {
        return this._status?.name ?? '';
    }

    getSanity(): string {
        return 'Sanity: ' + this._sanity + '%';
    }

    getSickness(): string {
        return this._sick ? 'Sick' : 'Not sick'
    }

    getDateOfBirth(): string {
        return this._dateOfBirth;
    }

    
    sicken(): void {
        this._sick = true;
    }

    looseSanity(healthToLoose: number): void {
        if (healthToLoose < 0 || healthToLoose > 100) {
            throw new Error('Invalid value for healthToLoose');
        }

        if (this._sanity > 0) {
            this._sanity -= healthToLoose;

            if (this._sanity <= 0) {
                this._sanity = 0;
                this._isDead = true;

                if (this._kinship == 'you') {
                    this._game.stateManager.goToState(GameStates.GAME_OVER);
                }
            }
        }
    }

    increaseHealth(healthToIncrease: number): void {
        this._sanity += healthToIncrease;

        if (this._sanity > 100) {
            this._sanity = 100;
        }
    }
}