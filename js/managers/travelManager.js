
var $currentDayField;

start();

function start(){
    $currentDayField = document.getElementById("current-day-field");
}
function onClickNextDay(){
    goToNextDay();
}

function goToNextDay(){
    Globals.currentDay++;
    setDay();
}

function setDay(){
    $currentDayField.innerHTML = "Day: " + Globals.currentDay;
}