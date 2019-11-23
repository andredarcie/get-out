import { Game, GameStates } from '../Game';

export class TravelManager {
    private _travelPage: Element;
    private _travelImage: Element;
    private _travelledDistanceField: Element;
    private _currentTimeField: Element;
    private _progressBar: HTMLElement;
    private _walkBtn: Element;
    private _campBtn: Element;
    private _statsBtn: Element;
    private _walking: boolean;
    private readonly _game: Game;

    constructor() {
        this._travelPage = document.querySelector("#travel-page");
        this._travelImage = document.querySelector("#travel-img");
        this._travelledDistanceField = document.querySelector("#travelled-distance");
        this._currentTimeField = document.querySelector("#current-time-field");
        this._progressBar = document.getElementById("progress-bar");
        this._walkBtn = document.querySelector("#walk-btn");
        this._campBtn = document.querySelector("#camp-btn");
        this._statsBtn = document.querySelector("#stats-btn");

        this._walkBtn.addEventListener('click', () => { this.onClickWalkBtn() });
        this._campBtn.addEventListener('click', () => { this.onClickCampBtn() });
        this._statsBtn.addEventListener('click', () => { this.onClickStatsBtn() });

        this.showTravelledDistance();
        this._game = Game.getInstance();
    }

    start(): void {
        this.showTime();
    }

    onClickWalkBtn(): void {
        this.passOneHour();

        const foundEvent = this.checkEvent();

        if (foundEvent) {
            this._game.goToState(GameStates.EVENT);
        } else if (this._game.log.isThereAnyTemporaryLog()) {
            this._game.goToState(GameStates.LOG);
        }
    }

    onClickCampBtn(): void {
        this._game.goToState(GameStates.CAMP);
    }

    onClickStatsBtn() {
        this._game.goToState(GameStates.STATS);
    }

    passOneHour(): void {

        if (this._game.clock.currentHour == 12 && this._game.clock.anteMeridiem) {
            this.gotoNextDay();
        }

        this._game.clock.nextHour();
        this.walkOneHour();
        this._game.characterManager.increaseHungryOfAllCharacters();


        this.showTime();
    }

    checkEvent() {
        return this.getRandomArbitrary(1, 100) <= 25;
    }

    getRandomArbitrary(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    gotoNextDay() {
        this._game.addDaysToCurrentDay(1);
        this.showTime();
    }

    showTime() {
        this._currentTimeField.innerHTML = this._game.clock.showTime() + ' - day ' + this._game.currentDay;

        if (this._game.clock.anteMeridiem) {
            if (this._game.clock.currentHour > 6 && this._game.clock.currentHour < 12) {
                this._currentTimeField.innerHTML += ' - daylight';
            } else {
                this._currentTimeField.innerHTML += ' - night';
            }
        } else {
            if (this._game.clock.currentHour > 6 && this._game.clock.currentHour < 12) {
                this._currentTimeField.innerHTML += ' - night';
            } else {
                this._currentTimeField.innerHTML += ' - daylight';
            }
        }
    }

    walkOneHour() {
        this._game.addDistanceToTravelledDistance(2);
        this.increaseProgressBar();

        this.showTravelledDistance();

        let allPlayerAreDead = this._game.characterManager.checkIfAllCharactersAreDead();
        if (allPlayerAreDead) 
        this._game.goToState(GameStates.GAME_OVER);
        
        if(this._game.travelledDistance > this._game.distanceToGoal) {
            this.arrivedAtTheGoal();
        }
    }

    increaseProgressBar() {
        let progressBarFullWidth = 321;
        let unity = progressBarFullWidth / this._game.distanceToGoal;
        this._progressBar.style.width = this._game.travelledDistance * unity + 'px';
    }

    getRandomCharacter() {
        return Math.floor(Math.random() * (this._game.characters.length));
    }

    showTravelledDistance() {
        this._travelledDistanceField.innerHTML = 'Travelled distance: ' + this._game.travelledDistance + ' miles';
    }

    arrivedAtTheGoal() {
        this._game.goToState(GameStates.GAME_OVER);
    }
}