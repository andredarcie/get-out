export let Globals = {
    gameStates: {
        TRAVEL: 1,
        CAMP: 2,
        STATS: 3,
        EVENT: 4,
        GAME_OVER: 5
    },
    currentState: 1,
    currentDay: 0,
    hours: 0,
    characters: [],
    travelledDistance: 0,
    distanceToGoal: 300,
    tempLogs: [],
    logs: [],
    gamePages: {
        travelPage: document.getElementById("travel-page"),
        campPage: document.getElementById("camp-page"),
        statsPage: document.getElementById("stats-page"),
        eventPage: document.getElementById("event-page"),
        gameOverPage: document.getElementById("game-over-page"),
    }
}