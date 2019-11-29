import { Game, GameStates } from '../Game';

export class CampManager {
    private _campImg: Element;
    private _travelBtn: Element;
    private readonly _game: Game;

    constructor() {
        this._campImg = document.querySelector('#camp-img');
        this._travelBtn = document.querySelector('#travel-btn');
        

        this._travelBtn.addEventListener('click', () => { this.onClickTravel() });
        this._game = Game.getInstance();
    }

    start() {
    } 

    onClickTravel() {
        this._game.goToState(GameStates.TRAVEL);
    }
}