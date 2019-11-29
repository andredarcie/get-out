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
    private _game: Game;
    private readonly _animationDuration: number;

    constructor() {
        this._game = Game.getInstance();
        
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

        this._animationDuration = 2000;
    }

    start(): void {
        this.showTime();
        
        if (this._game.characterManager.isInDanger()) {
            this._statsBtn.innerHTML = 'Your Family (!)';
        } else {
            this._statsBtn.innerHTML = 'Your Family';
        }
    }

    onClickWalkBtn(): void {
        this._walkBtn.setAttribute('disabled', 'disabled');
        this._walkBtn.classList.add('loading');

        setTimeout(() => {
            this._walkBtn.classList.remove('loading');
            this._walkBtn.removeAttribute('disabled');

            this.passOneHour();
            const foundEvent = this.checkEvent();

            if (foundEvent) {
                this._game.goToState(GameStates.EVENT);
            } else if (this._game.log.isThereAnyTemporaryLog()) {
                this._game.goToState(GameStates.LOG);
            }
        }, this._animationDuration);
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
        this._game.decreaseTheDistanceToTheBorder(2);
        this.increaseProgressBar();

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