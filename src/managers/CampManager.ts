import { Game, GameStates } from '../Game';

export class CampManager {
    campImg: Element;
    travelBtn: Element;
    bagBtn: Element;
    
    constructor() {
        this.campImg = document.querySelector('#camp-img');
        this.travelBtn = document.querySelector('#travel-btn');
        this.bagBtn = document.querySelector('#bag-btn');

        this.travelBtn.addEventListener('click', () => { this.onClickTravel() });
        this.bagBtn.addEventListener('click', () => { this.onClickBag() });
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