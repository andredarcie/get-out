
var $currentDayField;
var $nextDayElement;
var progressBarWidth;

start();

function start(){
    progressBarWidth = 10;
    $currentDayField = document.getElementById("current-day-field");
    $nextDayElement = document.getElementById("progress-bar");
}
function onClickNextDay(){

    //if(calculateEvent()){
        //goToState(GameStates.EVENT);
    //}
    goToNextDay();
}

function goToNextDay(){
    Globals.currentDay++;

    progressBarWidth += 10;
    $nextDayElement.style.width = progressBarWidth + "px";

    if(progressBarWidth > 420){
        goToState(GameStates.MAP);
    }

    setDay();
}

function setDay(){
    $currentDayField.innerHTML = "Day: " + Globals.currentDay;
}