import { Globals } from '../globals.js';

export class Travel {

    constructor() {
        this.travelPage = document.querySelector("#travel-page");
        this.travelImage = document.querySelector("#travel-img");
        this.currentDayField = document.querySelector("#current-day-field");
        this.progressBar = document.querySelector("#progress-bar");
        this.walkBtn = document.querySelector("#walk-btn");
        this.campBtn = document.querySelector("#camp-btn");
    }

    start() {
        Globals.currentDay++;
        this.showDay();
    }

    startTravels() {

        travelPage = Globals.pages.travelPage;
    
        progressBarWidth = 1;
        travelPage.progressBar.style.width = progressBarWidth + "%";
    }

    onClickWalk() {
        console.log("oi");
        Globals.currentDay++;
        this.showDay();
    }

    goToNextDay() {

        var gameStates = Globals.gameStates;
    
        Globals.currentDay++;
        Globals.hours += 3;
    
        progressBarWidth += 1;
        travelPage.progressBar.style.width = progressBarWidth + "%";
    
        if(progressBarWidth >= 98){
            goToState(gameStates.GAME_OVER);
        }
    
        setDay();
    }

    showDay() {
        this.currentDayField.innerHTML = 'Day: ' + Globals.currentDay;
    }
}