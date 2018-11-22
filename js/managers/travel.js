var travelPage;

function startTravels() {

    travelPage = Globals.pages.travelPage;

    progressBarWidth = 1;
    travelPage.progressBar.style.width = progressBarWidth + "%";
}

function onClickWalk(){

    var gameStates = Globals.gameStates;

    goToState(gameStates.WALKING);
    goToNextDay();
}

function goToNextDay(){

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

function setDay(){
    travelPage.currentDay.innerHTML = 'Day: ' + Globals.currentDay;
}