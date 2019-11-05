import { Character } from '/js/entities/Character.js';

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

Globals.characters.push(new Character('Ethan', 5, 'father', true, false, false));
Globals.characters.push(new Character('Olivia', 5, 'mother', false, true, true));
Globals.characters.push(new Character('Michael', 5, 'son', true, true, true));
Globals.characters.push(new Character('Sophia', 5, 'daughter', false, false, false));
Globals.characters.push(new Character('Emma', 5, 'grandmother', true, true, false));