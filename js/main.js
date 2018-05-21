function stateController(){

    var gamePages = Globals.gamePages;
    var gameStates = Globals.gameStates;

    switch(Globals.currentState){
        case gameStates.TRAVEL: 
            showPage(gamePages.travelPage);
            hidePage(gamePages.campPage);
            hidePage(gamePages.eventPage);
            hidePage(gamePages.walkingPage);
        break;
        case gameStates.CAMP: 
            hideAllPages();
            showPage(gamePages.campPage);
        break;
        case gameStates.SLEEP: 
            showPage(gamePages.sleepPage);
            hidePage(gamePages.campPage);
        break;
        case gameStates.HUNT: 
            showPage(gamePages.huntPage);
            hidePage(gamePages.campPage);
        break;
        case gameStates.HEAL: 
            showPage(gamePages.healPage);
            hidePage(gamePages.campPage);
        break;
        case gameStates.STATS: 
            showPage(gamePages.statsPage);
            hidePage(gamePages.campPage);
        break;
        case gameStates.EVENT: 
            showPage(gamePages.eventPage);
            hidePage(gamePages.travelPage);
            hidePage(gamePages.walkingPage);
            //startEventManager();
        break;
        case gameStates.WALKING:
            showPage(gamePages.walkingPage);
            hidePage(gamePages.travelPage);
            initWalking();
        break;
        case gameStates.REPORT:
            showPage(gamePages.reportPage);
        case gameStates.GAME_OVER:
            hideAllPages();
            showPage(gamePages.gameOverPage);
        break;
    }
}

function goToState(state){
    Globals.currentState = state;
    stateController();
}

function showPage(page){
    page.style.display = "block";
}

function hidePage(page){
    page.style.display = "none";
}

function hideAllPages(){

    var gamePages = Globals.gamePages;

    hidePage(gamePages.travelPage);
    hidePage(gamePages.campPage);
    hidePage(gamePages.sleepPage);
    hidePage(gamePages.huntPage);
    hidePage(gamePages.healPage);
    hidePage(gamePages.statsPage);
    hidePage(gamePages.eventPage);
    hidePage(gamePages.walkingPage);
    hidePage(gamePages.gameOverPage);
}

gameStart();

function gameStart(){

    var gamePages = Globals.gamePages;

    hideAllPages();
    showPage(gamePages.campPage);
}

var Feelings = {
    Excited: 1,
    Tender: 2,
    Scared: 3,
    Angry: 4,
    Sad: 5,
    Happy: 6
}

var Wounds = {
    BulletWounds: 1,
    ArrowWounds: 2,
    BrokenBones: 3,
    Burns: 4,
    Colds: 5,
    Cuts: 6,
    FoodPoisoning: 7,
    Leeches: 8,
    StomachAches: 9,
    Poison: 10
}