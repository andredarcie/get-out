import { Event } from './Event.js';
import { Globals } from '../globals.js';

export class Events {

    constructor(game) {
        this.game = game;

        this.reportPage = document.getElementById("report-page");
        this.eventPageTitle = document.getElementById("event-page-title");
        this.eventPageDescription = document.getElementById("event-page-description");
        this.eventPageImage = document.getElementById("event-page-image");
        this.eventPageBackBtn = document.getElementById("event-page-back-btn");

        this.eventPageBackBtn.addEventListener('click', (e) => { this.onEventPageBackBtn(e) });
    }

    start() {
        let events = [new Event("Event 1", "Event description"), new Event("Event 2", "Event description")];
        let randomIndex = this.getRandomArbitrary(events.length);
        var event = events[randomIndex];
    }

    showEvent(event) {
        this.eventPageTitle.innerHTML = event.name;
        this.eventPageDescription.innerHTML = event.description;
    }

    onEventPageBackBtn(e) {
        this.game.goToState(Globals.gameStates.TRAVEL);
    }

    getRandomArbitrary(max) {
        return Math.floor(Math.random() * max) 
    }
}