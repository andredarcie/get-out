var Globals = {
    gameStates: {
        TRAVEL: 1,
        CAMP: 2,
        SLEEP: 3,
        HUNT: 4,
        HEAL: 5,
        STATS: 6,
        EVENT: 7,
        WALKING: 8,
        REPORT: 9,
        GAME_OVER: 10
    },
    currentState: 1,
    currentDay: 0,
    characters: [],
    gamePages: {
        travelPage: document.getElementById("travel-page"),
        campPage: document.getElementById("camp-page"),
        sleepPage: document.getElementById("sleep-page"),
        huntPage: document.getElementById("hunt-page"),
        healPage: document.getElementById("heal-page"),
        statsPage: document.getElementById("stats-page"),
        eventPage: document.getElementById("event-page"),
        walkingPage: document.getElementById("walking-page"),
        reportPage: document.getElementById("report-page"),
        gameOverPage: document.getElementById("game-over-page"),
    }
}