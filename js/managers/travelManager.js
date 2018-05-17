
var $currentDayField;

start();

function start(){
    $currentDayField = document.getElementById("current-day-field");
}
function onClickNextDay(){

    if(calculateEvent()){
        goToState(GameStates.EVENT);
    }
    goToNextDay();
}

function goToNextDay(){
    Globals.currentDay++;
    setDay();
}

function setDay(){
    $currentDayField.innerHTML = "Day: " + Globals.currentDay;
}