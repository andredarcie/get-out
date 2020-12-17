import { Game } from '../Game';
import { GameStates } from '../enums/GameStates';

export class CampManager {
    private _restBtn: HTMLButtonElement;
    private _travelBtn: HTMLButtonElement;
    private readonly _game: Game;
    private _imageElement: HTMLImageElement;

    constructor() {
        this._travelBtn = document.querySelector('#travel-btn');
        this._restBtn = document.querySelector('#camp-rest-btn');

        this._travelBtn.addEventListener('click', () => { this.onClickTravel() });
        this._restBtn.addEventListener('click', () => { this.onClickRest() });

        this._imageElement = document.getElementById("camp-img") as HTMLImageElement;
        this._game = Game.getInstance();
    }

    start() {
        this._imageElement.src = 'camp.jpg';
    } 

    onClickTravel() {
        this._game.playButtonSound();
        this._game.stateManager.goToState(GameStates.TRAVEL);
    }

    onClickRest() {
        this._game.playButtonSound();
        for (let i = 0; i < 6; i++) {
            this._game.passOneHour();
        }

        this._game.characterManager.increaseStaminaOfAllCharacters(100);
    }
}