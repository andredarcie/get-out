import { Game } from '../Game';
import { GameStates } from '../enums/GameStates';

export class CampManager {
    private _restBtn: HTMLButtonElement;
    private _travelBtn: HTMLButtonElement;
    private readonly _game: Game;

    constructor() {
        this._travelBtn = document.querySelector('#travel-btn');
        this._restBtn = document.querySelector('#camp-rest-btn');

        this._travelBtn.addEventListener('click', () => { this.onClickTravel() });
        this._restBtn.addEventListener('click', () => { this.onClickRest() });
        this._game = Game.getInstance();
    }

    start() {
    } 

    onClickTravel() {
        this._game.stateManager.goToState(GameStates.TRAVEL);
    }

    onClickRest() {
        for (let i = 0; i < 6; i++) {
            this._game.passOneHour();
        }

        this._game.characterManager.increaseStaminaOfAllCharacters(100);
    }
}