var $travelingMessage = document.getElementById("traveling-message");
var $travelingMessageFound = document.getElementById("traveling-message-found");
var $core = document.getElementById("core");
var $eventPageBackBtn = document.getElementById("event-page-back-btn");
var $eventPageTitle = document.getElementById("event-page-title");
var $eventPageImage = document.getElementById("event-page-image");

function startEventManager(){
    $travelingMessage.style.display = "block";
    $travelingMessageFound.style.display = "none";
    $core.style.backgroundColor = "black";
    $eventPageBackBtn.style.display = "none";
    $eventPageTitle.style.display = "none";
    $eventPageImage.style.display = "none";
    setTimeout(function(){ checkEvent(); }, 2000);
}

function checkEvent(){
    if(calculateEvent()){
        foundEvent();
    } else {
        $core.style.backgroundColor = "#ecf0f1";
        goToState(GameStates.TRAVEL);
    }
}

function foundEvent(){
    $travelingMessageFound.style.display = "block";
    setTimeout(function(){ testEvent(); }, 2000);
}

function testEvent(){
    $travelingMessage.style.display = "none";
    $travelingMessageFound.style.display = "none";
    $eventPageBackBtn.style.display = "block";
    $eventPageTitle.style.display = "block";
    $eventPageImage.style.display = "block";
    $core.style.backgroundColor = "#ecf0f1";
    $eventPageTitle.innerHTML = "Sample Event";

    var beforeCharacters = JSON.parse(JSON.stringify(Globals.characters));

    for (var i = 0; i < 3; i++){
        var characterNumber = Math.floor((Math.random() * 4) + 0);

        Globals.characters[characterNumber].health--;
        Globals.characters[characterNumber].hunger--;
        Globals.characters[characterNumber].fatigue++;
    }

    var afterCharacters = Globals.characters

    var reports = report(beforeCharacters, afterCharacters);

    var $reportList = document.getElementById("report-list");

    var reportHtml = "";

    for(var i = 0; i < reports.length; i++){
        reportHtml += "<li>" + reports[i] + "</li>";
    }
    
    //$reportList.innerHTML = reportHtml;
}

function calculateEvent(){

    var result = Math.floor((Math.random() * 100) + 1);

    return result > 50;
}

function report(beforeCharacters, afterCharacters){
    var reports = [];

    for (var i = 0; i < beforeCharacters.length; i++){

        var oldCharacter = beforeCharacters[i];
        var newCharacter = afterCharacters[i];

        if(oldCharacter.health > newCharacter.health){
            reports.push(oldCharacter.name + " loose health");
        } else if (oldCharacter.health < newCharacter.health){
            reports.push(oldCharacter.name + " gain health");
        }

        if(oldCharacter.hunger > newCharacter.hunger){
            reports.push(oldCharacter.name + " loose hunger");
        } else if (oldCharacter.hunger < newCharacter.hunger){
            reports.push(oldCharacter.name + " gain hunger");
        }

        if(oldCharacter.fatigue > newCharacter.fatigue){
            reports.push(oldCharacter.name + " loose fatigue");
        } else if (oldCharacter.fatigue < newCharacter.fatigue){
            reports.push(oldCharacter.name + " gain fatigue");
        }
    }

    return reports;
}