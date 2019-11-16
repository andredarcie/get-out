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
        Game.currentDay++;
        this.showTime();
    }

    onClickWalkBtn(): void {
        this.startWalking();
        this.passHours(1);

        const foundEvent = this.checkEvent();

        if (foundEvent) {
            Game.goToState(GameStates.EVENT);
        } else if (Game.tempLogs.length > 0) {
            Game.goToState(GameStates.LOG);
        } else {
            Game.log.clearLogs();
        }
    }

    onClickCampBtn(): void {
        Game.goToState(GameStates.CAMP);
    }

    onClickStatsBtn() {
        Game.goToState(GameStates.STATS);
    }

    passHours(hours: number): void {
        for (let i = 0; i < hours; i++) {

            if (!this._walking)
                break;

            this.gotoNextHour();
        }
    }

    gotoNextHour() {
        this.walkOneHour();
        Game.characterManager.increaseHungryOfAllCharacters();

        if (Game.hours >= 24 ) {
            Game.hours = 0;
            this.gotoNextDay();
        }
        this.showTime();
    }

    checkEvent() {
        return this.getRandomArbitrary(1, 100) <= 25;
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    gotoNextDay() {
        Game.currentDay++;
        this.showTime();
    }

    passOneHour() {
        Game.hours++;
        this.showTime();
    }

    showTime() {
        this._currentTimeField.innerHTML = Game.hours + ':00 - day ' + Game.currentDay;

        if(Game.hours >= 18 || Game.hours <= 6) {
            this._currentTimeField.innerHTML += ' - night';
        } else {
            this._currentTimeField.innerHTML += ' - daylight';
        }
    }

    walkOneHour() {
        
        Game.travelledDistance += 2;
        this.increaseProgressBar();

        this.showTravelledDistance();
        this.passOneHour();

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

    startWalking() {
        this._walking = true;
    }

    stopWalking() {
        this._walking = false;
    }

    arrivedAtTheGoal() {
        this.stopWalking();
        Game.goToState(GameStates.GAME_OVER);
    }
}