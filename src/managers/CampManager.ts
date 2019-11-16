import { Game, GameStates } from '../Game';

export class CampManager {
    private _campImg: Element;
    private _travelBtn: Element;
    private _bagBtn: Element;
    
    constructor() {
        this._campImg = document.querySelector('#camp-img');
        this._travelBtn = document.querySelector('#travel-btn');
        this._bagBtn = document.querySelector('#bag-btn');

        this._travelBtn.addEventListener('click', () => { this.onClickTravel() });
        this._bagBtn.addEventListener('click', () => { this.onClickBag() });
    }

    start() {
    } 

    onClickTravel() {
        Game.goToState(GameStates.TRAVEL);
    }

    onClickBag() {
        Game.goToState(GameStates.BAG);
    }
}