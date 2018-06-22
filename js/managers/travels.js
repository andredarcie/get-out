
var $currentDayField;
var $nextDayElement;
var progressBarWidth;

start();

function start(){
    progressBarWidth = 1;
    $currentDayField = document.getElementById("current-day-field");
    $nextDayElement = document.getElementById("progress-bar");
    $nextDayElement.style.width = progressBarWidth + "%";
}
function onClickWalk(){

    var gameStates = Globals.gameStates;

    goToState(gameStates.WALKING);
    goToNextDay();
}

function goToNextDay(){

    var gameStates = Globals.gameStates;

    Globals.currentDay++;

    progressBarWidth += 1;
    $nextDayElement.style.width = progressBarWidth + "%";

    if(progressBarWidth >= 98){
        goToState(gameStates.GAME_OVER);
    }

    setDay();
}

function setDay(){
    $currentDayField.innerHTML = "Day: " + Globals.currentDay;
}