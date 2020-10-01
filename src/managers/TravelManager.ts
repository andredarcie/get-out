import { Game, GameStates } from '../Game';

export class TravelManager {
    private _travelPage: Element;
    private _travelImage: Element;
    private _travelledDistanceField: Element;
    private _progressBar: HTMLElement;
    private _walkBtn: HTMLButtonElement;
    private _campBtn: HTMLButtonElement;
    private _statsBtn: HTMLButtonElement;
    private _game: Game;

    constructor() {
        this._game = Game.getInstance();
        
        this._travelPage = document.querySelector("#travel-page");
        this._travelImage = document.querySelector("#travel-img");
        this._travelledDistanceField = document.querySelector("#travelled-distance");
        this._progressBar = document.getElementById("progress-bar");
        this._walkBtn = document.querySelector("#walk-btn");
        this._campBtn = document.querySelector("#camp-btn");
        this._statsBtn = document.querySelector("#stats-btn");

        this._walkBtn.addEventListener('click', () => { this.onClickWalkBtn() });
        this._campBtn.addEventListener('click', () => { this.onClickCampBtn() });
        this._statsBtn.addEventListener('click', () => { this.onClickStatsBtn() });

        this.showTravelledDistance();
    }

    start(): void {
        if (this._game.characterManager.isInDanger()) {
            this._statsBtn.innerHTML = 'Your Family (!)';
        } else {
            this._statsBtn.innerHTML = 'Your Family';
        }
    }

    onClickWalkBtn(): void {
        this._game.passOneHour();
        this.walkOneHour();
        const foundEvent = this.checkEvent();

        if (foundEvent) {
            this._game.goToState(GameStates.EVENT);
        } else if (this._game.log.isThereAnyTemporaryLog()) {
            this._game.goToState(GameStates.LOG);
        }
    }

    onClickCampBtn(): void {
        this._game.passOneHour();
        this._game.goToState(GameStates.CAMP);
    }

    onClickStatsBtn() {
        this._game.goToState(GameStates.STATS);
    }

    checkEvent() {
        return this.getRandomArbitrary(1, 100) <= 25;
    }

    getRandomArbitrary(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    walkOneHour() {
        this._game.characterManager.decreaseStaminaOfAllCharacters(5);
        this._game.characterManager.increaseHungryOfAllCharacters();
        this._game.decreaseTheDistanceToTheBorder(2);
        this.increaseProgressBar();
        this._game.addLogToFirebase('Walk one hour');

        this.showTravelledDistance();
        
        if(this._game.distanceToTheBorder <= 0) {
            this.arrivedAtTheBorder();
        }
    }

    increaseProgressBar() {
        let progressBarLevel = 300 - this._game.distanceToTheBorder;
        this._progressBar.style.width = progressBarLevel * 1 + 'px';
    }

    getRandomCharacter() {
        return Math.floor(Math.random() * (this._game.characters.length));
    }

    showTravelledDistance() {
        this._travelledDistanceField.innerHTML = this._game.distanceToTheBorder + ' miles to the border';
    }

    arrivedAtTheBorder() {
        this._game.goToState(GameStates.GAME_OVER);
    }
}