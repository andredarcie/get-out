import { Globals } from '../globals.js';

export class Travel {

    constructor(game) {
        this.game = game;

        this.travelPage = document.querySelector("#travel-page");
        this.travelImage = document.querySelector("#travel-img");
        this.travelledDistanceField = document.querySelector("#travelled-distance");
        this.currentDayField = document.querySelector("#current-day-field");
        this.currentHourField = document.querySelector("#current-hour-field");
        this.progressBar = document.querySelector("#progress-bar");
        this.walkBtn = document.querySelector("#walk-btn");
        this.campBtn = document.querySelector("#camp-btn");

        this.walkBtn.addEventListener('click', (e) => { this.onClickWalk(e) });
    }

    start() {
        Globals.currentDay++;
        this.showDay();
        this.showHour();
    }

    startTravels() {

        travelPage = Globals.pages.travelPage;
    
        progressBarWidth = 1;
        travelPage.progressBar.style.width = progressBarWidth + "%";
    }

    onClickWalk(e) {
        this.startWalking();
        this.passHours(3);
    }

    passHours(hours) {
        for (let i = 0; i < hours; i++) {

            if (!this.walking)
                break;

            this.gotoNextHour();
        }
    }

    gotoNextHour() {
        Globals.hours++;
        this.walkOneHour();

        if (Globals.hours >= 24 ) {
            Globals.hours = 0;
            this.gotoNextDay();
        }
        this.showHour();
    }

    gotoNextDay() {
        Globals.currentDay++;
        this.showDay();
    }

    showDay() {
        this.currentDayField.innerHTML = 'day ' + Globals.currentDay;
    }

    showHour() {
        this.currentHourField.innerHTML = Globals.hours + ':00';
    }

    walkOneHour() {
        Globals.travelledDistance++;
        this.showTravelledDistance();

        if(Globals.travelledDistance > 300) {
            this.arrivedAtTheGoal();
        }
    }

    showTravelledDistance() {
        this.travelledDistanceField.innerHTML = 'Travelled distance: ' + Globals.travelledDistance;
    }

    startWalking() {
        this.walking = true;
    }

    stopWalking() {
        this.walking = false;
    }

    arrivedAtTheGoal() {
        stopWalking();
        this.game.goToState(Globals.gameStates.GAME_OVER);
    }
}