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
    }

    start(): void {
        this.showTime();
    }

    onClickWalkBtn(): void {
        this.passOneHour();

        const foundEvent = this.checkEvent();

        if (foundEvent) {
            Game.goToState(GameStates.EVENT);
        } else if (Game.log.isThereAnyTemporaryLog()) {
            Game.goToState(GameStates.LOG);
        }
    }

    onClickCampBtn(): void {
        Game.goToState(GameStates.CAMP);
    }

    onClickStatsBtn() {
        Game.goToState(GameStates.STATS);
    }

    passOneHour(): void {

        if (Game.clock.currentHour == 12 && Game.clock.anteMeridiem) {
            this.gotoNextDay();
        }

        Game.clock.nextHour();
        this.walkOneHour();
        Game.characterManager.increaseHungryOfAllCharacters();


        this.showTime();
    }

    checkEvent() {
        return this.getRandomArbitrary(1, 100) <= 25;
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    gotoNextDay() {
        Game.addDaysToCurrentDay(1);
        this.showTime();
    }

    showTime() {
        this._currentTimeField.innerHTML = Game.clock.showTime() + ' - day ' + Game.currentDay;

        if (Game.clock.anteMeridiem) {
            if (Game.clock.currentHour > 6 && Game.clock.currentHour < 12) {
                this._currentTimeField.innerHTML += ' - daylight';
            } else {
                this._currentTimeField.innerHTML += ' - night';
            }
        } else {
            if (Game.clock.currentHour > 6 && Game.clock.currentHour < 12) {
                this._currentTimeField.innerHTML += ' - night';
            } else {
                this._currentTimeField.innerHTML += ' - daylight';
            }
        }
    }

    walkOneHour() {
        Game.addDistanceToTravelledDistance(2);
        this.increaseProgressBar();

        this.showTravelledDistance();

        let allPlayerAreDead = Game.characterManager.checkIfAllCharactersAreDead();
        if (allPlayerAreDead) 
            Game.goToState(GameStates.GAME_OVER);
        
        if(Game.travelledDistance > Game.distanceToGoal) {
            this.arrivedAtTheGoal();
        }
    }

    increaseProgressBar() {
        let progressBarFullWidth = 321;
        let unity = progressBarFullWidth / Game.distanceToGoal;
        this._progressBar.style.width = Game.travelledDistance * unity + 'px';
    }

    getRandomCharacter() {
        let x = Math.floor(Math.random() * (Game.characters.length));
        return x;
    }

    showTravelledDistance() {
        this._travelledDistanceField.innerHTML = 'Travelled distance: ' + Game.travelledDistance + ' miles';
    }

    arrivedAtTheGoal() {
        Game.goToState(GameStates.GAME_OVER);
    }
}