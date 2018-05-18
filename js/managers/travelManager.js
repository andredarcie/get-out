
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
function onClickNextDay(){
    goToState(GameStates.EVENT);
    goToNextDay();
}

function goToNextDay(){
    Globals.currentDay++;

    progressBarWidth += 1;
    $nextDayElement.style.width = progressBarWidth + "%";

    if(progressBarWidth >= 98){
        goToState(GameStates.GAME_OVER);
    }

    setDay();
}

function setDay(){
    $currentDayField.innerHTML = "Day: " + Globals.currentDay;
}