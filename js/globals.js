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
        GAME_OVER: 10
    },
    currentState: 1,
    currentDay: 0,
    hours: 0,
    characters: [],
    travelledDistance: 0,
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
    },
    pages: {
        travelPage: {
            element: document.getElementById("travel-page"),
            img: document.getElementById("travel-img"),
            currentDay: document.getElementById("current-day-field"),
            progressBar: document.getElementById("progress-bar"),
            walkBtn: document.getElementById("walk-btn"),
            travelBtn: document.querySelector('#travel-btn')
        },
        campPage: {
            element: document.getElementById("camp-page"),
            img: document.getElementById("camp-img")
        },
        sleepPage: {
            element: document.getElementById("sleep-page")
        },
        huntPage: {
            element: document.getElementById("hunt-page")
        },
        healPage: {
            element: document.getElementById("heal-page")
        },
        statsPage: {
            element: document.getElementById("stats-page"),
            nameField: document.getElementById("name-field"),
            relationshipField: document.getElementById("relationship-field"),
            thinkingField: document.getElementById("thinking-field"),
            healthField: document.getElementById("health-field"),
            woundsField: document.getElementById("wounds-field"),
            hungerField: document.getElementById("hunger-field"),
            fatigueField: document.getElementById("fatigue-field"),
            itemField: document.getElementById("item-field")
        },
        walkingPage: {
            element: document.getElementById("walking-page"),
            walkingMessage: document.getElementById("walking-message"),
            walkingMessageFound: document.getElementById("walking-message-found")
        },
        reportPage: {
            element: document.getElementById("report-page"),
            reportList: document.getElementById("report-list")
        },
        eventPage: {
            element: document.getElementById("report-page"),
            img: document.getElementById("event-page-image"),
            eventBtn: document.getElementById("event-page-back-btn")
        },
        gameOverPage: {
            element: document.getElementById("game-over-page")
        }
    }
}

Globals.characters.push({
    name: "Carter",
    img: "",
    relationship: "you",
    thinking: "I hope to save my family",
    health: 10,
    wounds: 0,
    hunger: 0,
    fatigue: 0,
    feeling: 0,
    item: 0
});

Globals.characters.push({
    name: "Mary",
    img: "",
    relationship: "wife",
    thinking: "We're lost",
    health: 10,
    wounds: 0,
    hunger: 0,
    fatigue: 0,
    feeling: 0,
    item: 0
});

Globals.characters.push({
    name: "Alice",
    img: "",
    relationship: "daughter",
    thinking: "I wanna go home",
    health: 10,
    wounds: 0,
    hunger: 0,
    fatigue: 0,
    feeling: 0,
    item: 0
});

Globals.characters.push({
    name: "Issac",
    img: "",
    relationship: "son",
    thinking: "Just leave me alone",
    health: 10,
    wounds: 0,
    hunger: 0,
    fatigue: 0,
    feeling: 0,
    item: 0
});

Globals.characters.push({
    name: "Teresa",
    img: "",
    relationship: "grandmother",
    thinking: "I wanna go home",
    health: 10,
    wounds: 0,
    hunger: 0,
    fatigue: 0,
    feeling: 0,
    item: 0
});