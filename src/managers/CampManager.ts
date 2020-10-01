import { Game, GameStates } from '../Game';

export class CampManager {
    private _campImg: Element;
    private _restBtn: HTMLButtonElement;
    private _travelBtn: HTMLButtonElement;
    private readonly _game: Game;

    constructor() {
        this._campImg = document.querySelector('#camp-img');

        this._travelBtn = document.querySelector('#travel-btn');
        this._restBtn = document.querySelector('#camp-rest-btn');

        this._travelBtn.addEventListener('click', () => { this.onClickTravel() });
        this._restBtn.addEventListener('click', () => { this.onClickRest() });
        this._game = Game.getInstance();
    }

    start() {
    } 

    onClickTravel() {
        this._game.goToState(GameStates.TRAVEL);
    }

    onClickRest() {
        for (let i = 0; i < 6; i++) {
            this._game.passOneHour();
        }

        this._game.characterManager.increaseStaminaOfAllCharacters(100);
    }
}