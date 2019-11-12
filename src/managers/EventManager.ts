import { Event, EventType } from '../entities/Event';
import { Game, GameStates } from '../Game';

export class EventManager {
    titleElement: HTMLElement;
    descriptionElement: HTMLElement;
    imageElement: HTMLElement;
    yesButton: HTMLElement;
    noButton: HTMLElement;
    currentEvent: Event;

    constructor() {
        this.titleElement = document.getElementById("event-page-title");
        this.descriptionElement = document.getElementById("event-page-description");
        this.imageElement = document.getElementById("event-page-image");
        this.yesButton = document.getElementById("event-page-yes-btn");
        this.noButton = document.getElementById("event-page-no-btn");

        this.yesButton.addEventListener('click', () => { this.onEventPageYesBtn() });
        this.noButton.addEventListener('click', () => { this.onEventPageNoBtn() });
    }

    start(): void {
        let events = [new Event("Abandoned house", "No sign of life. Explore the house?", EventType.Exploration), 
                      new Event("Wild Wolf Appeared", "Fight with the wolf?", EventType.Combat)];
        let randomIndex = this.getRandomArbitrary(events.length);

        this.currentEvent = events[randomIndex];
        this.showWaitingMessage();
    }

    showWaitingMessage(): void {
        this.titleElement.style.display = 'none';
        this.descriptionElement.innerHTML = 'Something happened!'
        this.imageElement.style.display = 'none';
        this.yesButton.style.display = 'none';
        this.noButton.style.display = 'none';

        setTimeout(() => this.showEvent(), 1000);
    }

    showEvent(): void {
        this.titleElement.style.display = 'block';
        this.titleElement.innerHTML = this.currentEvent.name;
        this.descriptionElement.innerHTML = this.currentEvent.description;
        this.imageElement.style.display = 'block';
        this.showButtons();
    }

    showButtons(): void {
        this.yesButton.style.display = 'inline-block';
        this.noButton.style.display = 'inline-block';

        switch (this.currentEvent.type) {
            case EventType.Exploration: 
                this.yesButton.innerHTML = 'Explore';
                this.noButton.innerHTML = 'Ignore';
                break;
            case EventType.Combat:
                this.yesButton.innerHTML = 'Fight';
                this.noButton.innerHTML = 'Run away';
        }
    }

    onEventPageYesBtn(): void {
        let randomCharacterIndex = this.getRandomArbitrary(Game.characters.length);
        let randomCharacter = Game.characters[randomCharacterIndex];

        switch (this.currentEvent.type) {
            case EventType.Exploration:
                Game.tempLogs.push(randomCharacter.name + ' found food!');
                break;
            case EventType.Combat:
                randomCharacter.looseHealth(1);
                break;
        }

        if (Game.tempLogs.length > 0) {
            Game.goToState(GameStates.LOG);
        } else {
            Game.goToState(GameStates.TRAVEL);
        }
    }

    onEventPageNoBtn(): void {

        if (Game.tempLogs.length > 0) {
            Game.goToState(GameStates.LOG);
        } else {
            Game.goToState(GameStates.TRAVEL);
        }
    }

    getRandomArbitrary(max: number): number {
        return Math.floor(Math.random() * max) 
    }
}