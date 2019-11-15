import { Game, GameStates } from '../Game';

export class TravelManager {
    travelPage: Element;
    travelImage: Element;
    travelledDistanceField: Element;
    currentTimeField: Element;
    progressBar: HTMLElement;
    walkBtn: Element;
    campBtn: Element;
    statsBtn: Element;
    walking: boolean;

    constructor() {
        this.travelPage = document.querySelector("#travel-page");
        this.travelImage = document.querySelector("#travel-img");
        this.travelledDistanceField = document.querySelector("#travelled-distance");
        this.currentTimeField = document.querySelector("#current-time-field");
        this.progressBar = document.getElementById("progress-bar");
        this.walkBtn = document.querySelector("#walk-btn");
        this.campBtn = document.querySelector("#camp-btn");
        this.statsBtn = document.querySelector("#stats-btn");

        this.walkBtn.addEventListener('click', () => { this.onClickWalkBtn() });
        this.campBtn.addEventListener('click', () => { this.onClickCampBtn() });
        this.statsBtn.addEventListener('click', () => { this.onClickStatsBtn() });

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

            if (!this.walking)
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
        this.currentTimeField.innerHTML = Game.hours + ':00 - day ' + Game.currentDay;

        if(Game.hours >= 18 || Game.hours <= 6) {
            this.currentTimeField.innerHTML += ' - night';
        } else {
            this.currentTimeField.innerHTML += ' - daylight';
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
        this.progressBar.style.width = Game.travelledDistance * unity + 'px';
    }

    getRandomCharacter() {
        let x = Math.floor(Math.random() * (Game.characters.length));
        return x;
    }

    showTravelledDistance() {
        this.travelledDistanceField.innerHTML = 'Travelled distance: ' + Game.travelledDistance + ' miles';
    }

    startWalking() {
        this.walking = true;
    }

    stopWalking() {
        this.walking = false;
    }

    arrivedAtTheGoal() {
        this.stopWalking();
        Game.goToState(GameStates.GAME_OVER);
    }
}