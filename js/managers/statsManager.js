var $nameField;
var $relationshipField;
var $thinkingField;
var $healthField;
var $woundsField;
var $hungerField;
var $fatigueField;
var $feelingField;
var $itemField;

var currentCharacter = 0;

function getViewElements(){
    $nameField = document.getElementById("name-field");
    $relationshipField = document.getElementById("relationship-field");
    $thinkingField = document.getElementById("thinking-field");
    $healthField = document.getElementById("health-field");
    $woundsField = document.getElementById("wounds-field");
    $hungerField = document.getElementById("hunger-field");
    $fatigueField = document.getElementById("fatigue-field");
    $feelingField = document.getElementById("feeling-field");
    $itemField = document.getElementById("item-field");
}

function setViewElements(character){
    $nameField.innerHTML = character.name;
    $relationshipField.innerHTML = character.relationship;
    $thinkingField.innerHTML = "Thinking: " + character.thinking;
    $healthField.innerHTML = "Health: " + character.health;
    $woundsField.innerHTML = "Wounds: " + character.wounds;
    $hungerField.innerHTML = "Hunger: " + character.hunger;
    $fatigueField.innerHTML = "Fatigue: " + character.fatigue;
    $feelingField.innerHTML = "Feeling: " + character.feeling;
    $itemField.innerHTML = "Items: " + character.item;
}

function previousCharacter(){
    currentCharacter--;
    
    if(currentCharacter < 0){
        currentCharacter = Globals.characters.length - 1;
    }

    setViewElements(Globals.characters[currentCharacter]);
}

function nextCharacter(){
    currentCharacter++;

    if(currentCharacter === Globals.characters.length){
        currentCharacter = 0;
    }

    setViewElements(Globals.characters[currentCharacter]);
}

start();
function start(){
    getViewElements();
    setViewElements(Globals.characters[0]);
}