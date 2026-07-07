import { Game } from '../Game';
import { GameStates } from '../enums/GameStates';
import { LogType } from '../managers/LogManager';
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

    get isPlayer(): boolean {
        return this._kinship === 'you';
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
        // Fadiga: a estrada cobra de todos, a cada etapa.
        this.looseSanity(Character.FATIGUE_PER_HOUR);
    }

    public static readonly FATIGUE_PER_HOUR = 4;

    public hasAffliction(): boolean {
        return this._status != null;
    }

    public setStatus(status: Status) {
        this._status = status;
    }

    public removeStatus() {
        this._status = null;
    }

    public showAfflictions(): string {
        return this._status?.name ?? '';
    }

    getSanity(): string {
        return this._sanity + '%';
    }

    getDateOfBirth(): string {
        return this._dateOfBirth;
    }

    looseSanity(sanityToLoose: number): void {
        if (sanityToLoose < 0 || sanityToLoose > 100) {
            throw new Error('Invalid value for sanityToLoose');
        }

        if (this._isDead || this._sanity <= 0) return;

        this._sanity -= sanityToLoose;

        if (this._sanity <= 0) {
            this._sanity = 0;
            this._isDead = true;

            if (this.isPlayer) {
                this._game.state.setGameOverMessage('A mente cede. O caminho se perde.');
                this._game.stateManager.goToState(GameStates.GAME_OVER);
            } else {
                this._game.characterManager.onCharacterDied(this);
            }
        }
    }

    /**
     * Luto nunca mata — deixa marcas. Reduz a sanidade sem
     * disparar morte, com piso mínimo de 5.
     */
    public sufferGrief(amount: number): void {
        if (this._isDead) return;
        this._sanity = Math.max(5, this._sanity - amount);
    }

    increaseSanity(sanityToIncrease: number): void {
        if (this._isDead) return;

        this._sanity += sanityToIncrease;

        if (this._sanity > 100) {
            this._sanity = 100;
        }
    }
}
