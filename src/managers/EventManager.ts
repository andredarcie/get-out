import { Event, EventType } from '../entities/Event';
import { Game, GameStates } from '../Game';
import { Item } from '../entities/Item';

export class EventManager {
    private _titleElement: HTMLElement;
    private _descriptionElement: HTMLElement;
    private _imageElement: HTMLElement;
    private _yesButton: HTMLElement;
    private _noButton: HTMLElement;
    private _currentEvent: Event;

    constructor() {
        this._titleElement = document.getElementById("event-page-title");
        this._descriptionElement = document.getElementById("event-page-description");
        this._imageElement = document.getElementById("event-page-image");
        this._yesButton = document.getElementById("event-page-yes-btn");
        this._noButton = document.getElementById("event-page-no-btn");

        this._yesButton.addEventListener('click', () => { this.onEventPageYesBtn() });
        this._noButton.addEventListener('click', () => { this.onEventPageNoBtn() });
    }

    start(): void {
        let events = [new Event("Abandoned house", "No sign of life. Explore the house?", EventType.Exploration, [new Item('Food', '', 1)]), 
                      new Event("Wild Wolf Appeared", "Fight with the wolf?", EventType.Combat)];
        let randomIndex = this.getRandomArbitrary(events.length);

        this._currentEvent = events[randomIndex];
        this.showWaitingMessage();
    }

    showWaitingMessage(): void {
        this._titleElement.style.display = 'none';
        this._descriptionElement.innerHTML = 'Something happened!'
        this._imageElement.style.display = 'none';
        this._yesButton.style.display = 'none';
        this._noButton.style.display = 'none';

        setTimeout(() => this.showEvent(), 1000);
    }

    showEvent(): void {
        this._titleElement.style.display = 'block';
        this._titleElement.innerHTML = this._currentEvent.name;
        this._descriptionElement.innerHTML = this._currentEvent.description;
        this._imageElement.style.display = 'block';
        this.showButtons();
    }

    showButtons(): void {
        this._yesButton.style.display = 'inline-block';
        this._noButton.style.display = 'inline-block';

        switch (this._currentEvent.type) {
            case EventType.Exploration: 
                this._yesButton.innerHTML = 'Explore';
                this._noButton.innerHTML = 'Ignore';
                break;
            case EventType.Combat:
                this._yesButton.innerHTML = 'Fight';
                this._noButton.innerHTML = 'Run away';
        }
    }

    onEventPageYesBtn(): void {
        let randomCharacterIndex = this.getRandomArbitrary(Game.characters.length);
        let randomCharacter = Game.characters[randomCharacterIndex];

        switch (this._currentEvent.type) {
            case EventType.Exploration:
                Game.log.addTempLog(randomCharacter.name + ' found food!');
                break;
            case EventType.Combat:
                randomCharacter.looseHealth(1);
                break;
        }

        if(this._currentEvent.willGiveItems()) {
            for (let item of this._currentEvent.items) {
                Game.bagManager.putItem(item);
            }
        }

        if (Game.log.isThereAnyTemporaryLog()) {
            Game.goToState(GameStates.LOG);
        } else {
            Game.goToState(GameStates.TRAVEL);
        }
    }

    onEventPageNoBtn(): void {

        if (Game.log.isThereAnyTemporaryLog()) {
            Game.goToState(GameStates.LOG);
        } else {
            Game.goToState(GameStates.TRAVEL);
        }
    }

    getRandomArbitrary(max: number): number {
        return Math.floor(Math.random() * max) 
    }
}