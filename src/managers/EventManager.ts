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
    private _developOverlay: HTMLElement;
    private _characterCard: HTMLElement;
    private _currentEvent: Event;
    public currentChoice: Choice;
    private _images: Map<string, string>;
    private readonly _game: Game;
    private _imageLoadRequestId: number;

    constructor() {
        this._titleElement = document.getElementById("event-page-title")!;
        this._descriptionElement = document.getElementById("event-page-description")!;
        this._photographyBorder = document.querySelector(".photography-border")!;
        this._eventPageChoicesBtnListElement = document.getElementById("event-page-choices-btn-list")!;
        this._imageElement = document.getElementById("event-page-image") as HTMLImageElement;
        this._developOverlay = document.getElementById("photo-develop-overlay")!;
        this._characterCard = document.getElementById("event-character-card")!;

        this._images = new Map<string, string>([
            // lugares nomeados
            ['barn',       new URL('../../img/places/barn-abandoned-farm-homestead.jpg', import.meta.url).toString()],
            ['ferrisWheel',new URL('../../img/places/ferris-wheel.jpg', import.meta.url).toString()],
            ['forestFog',  new URL('../../img/places/forest-fog.jpg', import.meta.url).toString()],
            ['geyser',     new URL('../../img/places/geyser.jpg', import.meta.url).toString()],
            ['milestone',  new URL('../../img/places/milestone.jpg', import.meta.url).toString()],
            ['themePark',  new URL('../../img/places/theme-park.jpg', import.meta.url).toString()],
            // numerados
            ['img2', new URL('../../img/places/2.jpg', import.meta.url).toString()],
            ['img4', new URL('../../img/places/4.jpg', import.meta.url).toString()],
            ['img5', new URL('../../img/places/5.jpg', import.meta.url).toString()],
            ['img6', new URL('../../img/places/6.jpg', import.meta.url).toString()],
            ['img7', new URL('../../img/places/7.jpg', import.meta.url).toString()],
            ['imgC', new URL('../../img/places/c.jpg', import.meta.url).toString()],
            // raiz
            ['forest', new URL('../../img/forest.jpg', import.meta.url).toString()],
            ['house',  new URL('../../img/house.jpg',  import.meta.url).toString()],
            ['wolf',   new URL('../../img/wolf.jpg',   import.meta.url).toString()],
        ]);

        this._game = Game.getInstance();
        this._imageLoadRequestId = 0;
    }

    start(): void {
        console.log("event page")
        this._eventPageChoicesBtnListElement.innerHTML = '';
        const eventSeeds = new EventSeeds();
        eventSeeds.start();
        let events = eventSeeds.events;

        let randomEventType: number = this._game.state.getRandomArbitrary(1);

        if (this.checkForMileStone()) {
            this._currentEvent = eventSeeds.getMileStoneEvent();
        } else if (randomEventType == 0) {
            this._currentEvent = eventSeeds.getPlaceEvent();
        }

        this.showEvent();
    }

    private showCharacterCard(): void {
        const character = this._currentEvent.character;
        if (!character) {
            this._characterCard.innerHTML = '';
            this._characterCard.style.display = 'none';
            return;
        }

        const sanityPct = character.sanity;
        const sanityClass = sanityPct > 50 ? 'sanity-ok' : sanityPct > 25 ? 'sanity-warn' : 'sanity-critical';

        this._characterCard.style.display = 'flex';
        const afflictions = character.showAfflictions();
        this._characterCard.innerHTML = `
            <img src="${character.imageURL}" alt="${character.name}" class="event-character-img">
            <div class="event-character-info">
                <div class="event-character-name">${character.name} <span class="event-character-kinship">${character.kinship}</span></div>
                ${afflictions ? `<div class="event-character-afflictions">${afflictions}</div>` : ''}
                <div class="character-sanity-bar">
                    <div class="character-sanity-fill ${sanityClass}" style="width:${sanityPct}%"></div>
                </div>
            </div>
        `;
    }

    private showChoices() {
        this._eventPageChoicesBtnListElement.innerHTML = '';
        let diceManager = new DiceManager("dice-canvas");
        if (this.currentEvent.firstChoice) {
            this.showChoice(this.currentEvent.firstChoice, diceManager);
        }
        if (this.currentEvent.secondChoice) {
            this.showChoice(this.currentEvent.secondChoice, diceManager);
        }
    }

    private showChoice(choice : Choice, diceManager: DiceManager) {
        const button = document.createElement("button");

        if (choice.skillCheck && choice.skillCheckFields) {
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
        return (this._game.state.distanceToTheBorder == 250 ||
            this._game.state.distanceToTheBorder == 200 ||
            this._game.state.distanceToTheBorder == 150 ||
            this._game.state.distanceToTheBorder == 100 ||
            this._game.state.distanceToTheBorder == 50);
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
        this._titleElement.innerHTML = this._currentEvent.title;
        this._descriptionElement.innerHTML = this._currentEvent.description;
        this.renderEventImage();

        this.showCharacterCard();
        this.showChoices();
    }

    private renderEventImage(): void {
        const imageName = this._currentEvent.image;
        if (imageName == '') {
            this._photographyBorder.style.display = 'none';
            this._imageElement.style.display = 'none';
            this._developOverlay.classList.remove('developing');
            this._developOverlay.style.background = 'transparent';
            return;
        }

        const path = this.getImagePath(imageName);
        if (!path) {
            this._photographyBorder.style.display = 'none';
            this._imageElement.style.display = 'none';
            this._developOverlay.classList.remove('developing');
            this._developOverlay.style.background = 'transparent';
            return;
        }

        const requestId = ++this._imageLoadRequestId;
        this._photographyBorder.style.display = 'block';
        this._imageElement.style.display = 'none';
        this._developOverlay.classList.remove('developing');
        this._developOverlay.style.background = '#000';

        const preloadImage = new Image();
        preloadImage.onload = () => {
            if (requestId !== this._imageLoadRequestId) return;

            this._imageElement.src = path;
            this._imageElement.style.display = 'block';
            this._developOverlay.classList.remove('developing');
            void this._developOverlay.offsetWidth;
            this._developOverlay.classList.add('developing');
        };

        preloadImage.onerror = () => {
            if (requestId !== this._imageLoadRequestId) return;

            this._photographyBorder.style.display = 'none';
            this._imageElement.style.display = 'none';
            this._developOverlay.classList.remove('developing');
            this._developOverlay.style.background = 'transparent';
            console.error(`Failed to load image: ${path}`);
        };

        preloadImage.src = path;
    }
}
