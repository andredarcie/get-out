import { Globals } from '../Globals.js';
import { CharacterManager } from './CharacterManager.js';

export class TravelManager {

    constructor(game) {
        this.game = game;

        this.travelPage = document.querySelector("#travel-page");
        this.travelImage = document.querySelector("#travel-img");
        this.travelledDistanceField = document.querySelector("#travelled-distance");
        this.currentTimeField = document.querySelector("#current-time-field");
        this.progressBar = document.querySelector("#progress-bar");
        this.walkBtn = document.querySelector("#walk-btn");
        this.campBtn = document.querySelector("#camp-btn");

        this.walkBtn.addEventListener('click', (e) => { this.onClickWalk(e) });
        this.campBtn.addEventListener('click', (e) => { this.onClickCamp(e) });
        
        this.characterManager = new CharacterManager();
        this.showTravelledDistance();
    }

    start() {
        Globals.currentDay++;
        this.showTime();
    }

    onClickWalk(e) {
        this.startWalking();
        this.passHours(3);

        const foundEvent = this.checkEvent();

        if (foundEvent) {
            this.game.goToState(Globals.gameStates.EVENT);
        } else if (Globals.tempLogs.length > 0) {
            this.game.log.showLogs();
        } else {
            this.game.log.clearLogs();
        }
    }

    onClickCamp(e) {
        this.game.goToState(Globals.gameStates.CAMP);
    }

    passHours(hours) {
        for (let i = 0; i < hours; i++) {

            if (!this.walking)
                break;

            this.gotoNextHour();
        }
    }

    gotoNextHour() {
        this.walkOneHour();

        if (Globals.hours >= 24 ) {
            Globals.hours = 0;
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
        Globals.currentDay++;
        this.showTime();
    }

    passOneHour() {
        Globals.hours++;
        this.showTime();
    }

    showTime() {
        this.currentTimeField.innerHTML = Globals.hours + ':00 - day ' + Globals.currentDay;

        if(Globals.hours >= 18 || Globals.hours <= 6) {
            this.currentTimeField.innerHTML += ' - night';
        } else {
            this.currentTimeField.innerHTML += ' - daylight';
        }
    }

    walkOneHour() {
        
        Globals.travelledDistance += 2;
        this.increaseProgressBar();

        this.showTravelledDistance();
        this.passOneHour();

        Globals.characters[this.getRandomCharacter()].looseHealth(1);

        let allPlayerAreDead = this.characterManager.checkIfAllCharactersAreDead();
        if (allPlayerAreDead) 
            this.game.goToState(Globals.gameStates.GAME_OVER);

        console.log(Globals.logs);
        
        if(Globals.travelledDistance > Globals.distanceToGoal) {
            this.arrivedAtTheGoal();
        }
    }

    increaseProgressBar() {
        let progressBarFullWidth = 321;
        let unity = progressBarFullWidth / Globals.distanceToGoal;
        this.progressBar.style.width = Globals.travelledDistance * unity + 'px';
    }

    getRandomCharacter() {
        let x = Math.floor(Math.random() * (Globals.characters.length));
        return x;
    }

    showTravelledDistance() {
        this.travelledDistanceField.innerHTML = 'Travelled distance: ' + Globals.travelledDistance + ' miles';
    }

    startWalking() {
        this.walking = true;
    }

    stopWalking() {
        this.walking = false;
    }

    arrivedAtTheGoal() {
        this.stopWalking();
        this.game.goToState(Globals.gameStates.GAME_OVER);
    }
}