import { Character } from '/js/entities/Character.js';

export let Globals = {
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
        LOG: 10,
        GAME_OVER: 11
    },
    currentState: 1,
    currentDay: 0,
    hours: 0,
    characters: [],
    travelledDistance: 0,
    tempLogs: [],
    logs: [],
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
        logPage: document.getElementById("log-page"),
        gameOverPage: document.getElementById("game-over-page"),
    }
}

Globals.characters.push(new Character('Ethan', 5, 'father'));
Globals.characters.push(new Character('Olivia', 5, 'mother'));
Globals.characters.push(new Character('Michael', 5, 'son'));
Globals.characters.push(new Character('Sophia', 5, 'daughter'));
Globals.characters.push(new Character('Emma', 5, 'grandmother'));