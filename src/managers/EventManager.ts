import { Event, EventType } from '../entities/Event';
import { Game, GameStates } from '../Game';
import { Item, ItemType } from '../entities/Item';
import { EventSeeds } from '../seeds/EventSeeds';

export class EventManager {
    private _titleElement: HTMLElement;
    private _descriptionElement: HTMLElement;
    private _imageElement: HTMLImageElement;
    private _yesButton: HTMLElement;
    private _noButton: HTMLElement;
    private _currentEvent: Event;
    private readonly _game: Game;

    constructor() {
        this._titleElement = document.getElementById("event-page-title");
        this._descriptionElement = document.getElementById("event-page-description");
        this._imageElement = document.getElementById("event-page-image") as HTMLImageElement;
        this._yesButton = document.getElementById("event-page-yes-btn");
        this._noButton = document.getElementById("event-page-no-btn");

        this._yesButton.addEventListener('click', () => { this.onEventPageYesBtn() });
        this._noButton.addEventListener('click', () => { this.onEventPageNoBtn() });
        this._game = Game.getInstance();
    }

    start(): void {
        const eventSeeds = new EventSeeds();
        eventSeeds.start();
        let events = eventSeeds.events;

        let randomEventType: number = this._game.getRandomArbitrary(3);
        randomEventType = 2;
        switch (randomEventType) {
            case EventType.Combat:
            case EventType.Exploration:
                var randomIndex: number = this._game.getRandomArbitrary(events.length);
                this._currentEvent = events[randomIndex];
            case EventType.Place:
                this._currentEvent = eventSeeds.getPlaceEvent();
        }

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
        this._imageElement.src = this._currentEvent.image;
        this._imageElement.style.display = 'block';
        this.showButtons();
    }

    showButtons(): void {
        this._yesButton.style.display = 'inline-block';
        this._noButton.style.display = 'inline-block';

        this._yesButton.innerHTML = this._currentEvent.onYes.buttonText;
        this._noButton.innerHTML = this._currentEvent.onNo.buttonText;
    }

    onEventPageYesBtn(): void {
        this._currentEvent.onYes.callback();

        this.checkLogs();
    }

    onEventPageNoBtn(): void {
        this._currentEvent.onNo.callback();

        this.checkLogs();
    }

    checkLogs(): void {
        if (this._game.log.isThereAnyTemporaryLog()) {
            this._game.goToState(GameStates.LOG);
        } else {
            this._game.goToState(GameStates.TRAVEL);
        }
    }
}