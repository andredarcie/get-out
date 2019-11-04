import { Event } from '../entities/Event.js';
import { Globals } from '../Globals.js';

export class EventManager {

    constructor(game) {
        this.game = game;

        this.reportPage = document.getElementById("report-page");
        this.eventPageTitle = document.getElementById("event-page-title");
        this.eventPageDescription = document.getElementById("event-page-description");
        this.eventPageImage = document.getElementById("event-page-image");
        this.eventPageYesBtn = document.getElementById("event-page-yes-btn");
        this.eventPageNoBtn = document.getElementById("event-page-no-btn");

        this.eventPageYesBtn.addEventListener('click', (e) => { this.onEventPageYesBtn(e) });
        this.eventPageNoBtn.addEventListener('click', (e) => { this.onEventPageNoBtn(e) });
    }

    start() {
        let events = [new Event("Abandoned house", "No sign of life. Explore the house?"), 
                      new Event("Wild Wolf Appeared", "Fight with the wolf?")];
        let randomIndex = this.getRandomArbitrary(events.length);

        this.event = events[randomIndex];

        this.showEvent();
    }

    showEvent() {
        this.eventPageTitle.innerHTML = this.event.name;
        this.eventPageDescription.innerHTML = this.event.description;
    }

    onEventPageYesBtn(e) {

        if (Globals.tempLogs.length > 0) {
            this.game.log.start();
        } else {
            this.game.goToState(Globals.gameStates.TRAVEL);
        }
    }

    onEventPageNoBtn(e) {

        if (Globals.tempLogs.length > 0) {
            this.game.log.start();
        } else {
            this.game.goToState(Globals.gameStates.TRAVEL);
        }
    }

    getRandomArbitrary(max) {
        return Math.floor(Math.random() * max) 
    }
}