
function checkEvent(){

    var gameStates = Globals.gameStates;
    
    if(calculateEvent()){
        goToState(gameStates.EVENT);
        foundEvent();
    } else {
        goToState(gameStates.TRAVEL);
    }
}

function foundEvent(){
    generateEvent();
}

function testEvent(){

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

function generateEvent(){

    var randomEventNumber = Math.floor((Math.random() * (events.length - 1)) + 1);

    var actualEvent = events[randomEventNumber];

    var eventPageTitle = document.getElementById("event-page-title");

    eventPageTitle.innerHTML = actualEvent.name;
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