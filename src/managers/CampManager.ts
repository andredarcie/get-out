import { Game, GameStates } from '../Game';

export class CampManager {
    campImg: Element;
    travelBtn: Element;

    constructor() {
        this.campImg = document.querySelector("#camp-img");
        this.travelBtn = document.querySelector("#travel-btn");

        this.travelBtn.addEventListener('click', () => { this.onClickTravel() });
    }

    start() {
    } 

    onClickTravel() {
        Game.goToState(GameStates.TRAVEL);
    }
}