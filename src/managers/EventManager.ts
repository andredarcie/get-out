import { Event, EventType, Choice } from '../entities/Event';
import { Game } from '../Game';
import { EventSeeds } from '../seeds/EventSeeds';
import { GameStates } from '../enums/GameStates';
import { DiceManager, Difficult } from './DiceManager';

export class EventManager {
    private _titleElement: HTMLElement;
    private _descriptionElement: HTMLElement;
    private _eventPageChoicesBtnListElement: HTMLElement;
    private _photographyBorder: HTMLElement;
    private _imageElement: HTMLImageElement;
    private _currentEvent: Event;
    public currentChoice: Choice;
    private _images: Map<string, string>;
    private readonly _game: Game;

    constructor() {
        this._titleElement = document.getElementById("event-page-title")!;
        this._descriptionElement = document.getElementById("event-page-description")!;
        this._photographyBorder = document.querySelector(".photography-border")!;
        this._eventPageChoicesBtnListElement = document.getElementById("event-page-choices-btn-list")!;
        this._imageElement = document.getElementById("event-page-image") as HTMLImageElement;

        this._images = new Map<string, string>([
            ['ferrisWheel', new URL('../../img/places/ferris-wheel.jpg', import.meta.url).toString()],
            ['geysir', new URL('../../img/places/geyser.jpg', import.meta.url).toString()],
            ['themePark', new URL('../../img/places/theme-park.jpg', import.meta.url).toString()],
            ['barn', new URL('../../img/places/barn-abandoned-farm-homestead.jpg', import.meta.url).toString()],            
        ]);

        this._game = Game.getInstance();
    }

    start(): void {
        console.log("event page")
        this._eventPageChoicesBtnListElement.innerHTML = '';
        const eventSeeds = new EventSeeds();
        eventSeeds.start();
        let events = eventSeeds.events;

        let randomEventType: number = this._game.getRandomArbitrary(1);

        if (this.checkForMileStone()) {
            this._currentEvent = eventSeeds.getMileStoneEvent();
        } else if (randomEventType == 0) {
            this._currentEvent = eventSeeds.getPlaceEvent();
        } else {
            this._currentEvent = eventSeeds.getCombatEvent();
        }

        this.showEvent();
    }

    private showChoices() {
        this._eventPageChoicesBtnListElement.innerHTML = '';
        let diceManager = new DiceManager("");
        for (let choice of this.currentEvent.choices) {
            const button = document.createElement("button");

            if (choice.skillCheck) {
                choice.skillCheckFields.difficult = diceManager.getDifficult(choice.skillCheckFields.difficulty);

                let buttonText: string = choice.buttonText + ' [' +
                                         choice.skillCheckFields.difficult.text + ': ' + 
                                         choice.skillCheckFields.difficult.value + 
                                         ' - ' + diceManager.calculateProbabilityFrom((choice.skillCheckFields.difficult.value - 3)) + ']';

                button.appendChild(document.createTextNode(buttonText));
                button.classList.add(choice.skillCheckFields.difficult.class);
            } else {
                button.appendChild(document.createTextNode(choice.buttonText));
            }

            
            button.addEventListener('click', () => this.selectChoice(choice));
            this._eventPageChoicesBtnListElement.appendChild(button);
        }
    }

    private selectChoice(choice: Choice) {
        this._game.audioManager.playButtonSound();
        this.currentChoice = choice;

        if (this.currentChoice.skillCheck) {
            this._game.stateManager.goToState(GameStates.SKILLCHECK);
            return;
        }

        if (this.currentEvent.type == EventType.Place && choice.buttonText == 'Investigate') {
            this._game.stateManager.goToState(GameStates.ITEM_PICKER);
            return;
        }

        this.currentChoice.normalResultPath();
        this._game.stateManager.goToState(GameStates.LOG);
    }

    get currentEvent(): Event {
        return this._currentEvent;
    }

    private checkForMileStone(): boolean {
        return (this._game.distanceToTheBorder == 250 ||
            this._game.distanceToTheBorder == 200 ||
            this._game.distanceToTheBorder == 150 ||
            this._game.distanceToTheBorder == 100 ||
            this._game.distanceToTheBorder == 50);
    }

    showWaitingMessage(): void {
        this._titleElement.style.display = 'none';
        this._photographyBorder.style.display = 'none';
        this._descriptionElement.innerHTML = 'Something happened!'
        this._imageElement.style.display = 'none';

        setTimeout(() => this.showEvent(), 1000);
    }

    public getImagePath(imageName: string): string {
        const imagePath = this._images.get(imageName);
        if (!imagePath) {
            console.error(`Image ${imageName} not found.`);
            return '';
        }
        return imagePath;
    }

    showEvent(): void {
        console.log("show event");
        this._titleElement.style.display = 'block';
        this._photographyBorder.style.display = 'block';
        this._titleElement.innerHTML = this._currentEvent.title;
        this._descriptionElement.innerHTML = this._currentEvent.description;
        
        if (this._currentEvent.image != '') {
            this._imageElement.src = 'img\\places\\' + this._currentEvent.image + '.jpg';
            this._imageElement.src = this.getImagePath(this._currentEvent.image);
        }

        this._imageElement.style.display = 'block';
        this.showChoices();
    }
}