import { Game, GameStates } from '../Game';

export class CampManager {
    private _campImg: Element;
    private _restBtn: HTMLButtonElement;
    private _travelBtn: HTMLButtonElement;
    private readonly _game: Game;
    private readonly _animationDuration: number;

    constructor() {
        this._campImg = document.querySelector('#camp-img');

        this._travelBtn = document.querySelector('#travel-btn');
        this._restBtn = document.querySelector('#camp-rest-btn');

        this._travelBtn.addEventListener('click', () => { this.onClickTravel() });
        this._restBtn.addEventListener('click', () => { this.onClickRest() });
        this._game = Game.getInstance();

        this._animationDuration = 2000;
    }

    start() {
    } 

    onClickTravel() {
        this._game.goToState(GameStates.TRAVEL);
    }

    onClickRest() {
        this._restBtn.disabled = true;
        this._restBtn.classList.add('loading');

        setTimeout(() => {
            this._restBtn.classList.remove('loading');
            this._restBtn.disabled = false;

            for (let i = 0; i < 6; i++) {
                this._game.passOneHour();
            }

            this._game.characterManager.increaseStaminaOfAllCharacters(100);
        }, this._animationDuration);
    }
}