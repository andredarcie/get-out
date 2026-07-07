import { Event, Choice } from '../entities/Event';
import { Game } from '../Game';
import { GameStates } from '../enums/GameStates';
import { DiceManager } from './DiceManager';

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
    private _pendingEvent: Event | null;

    constructor() {
        this._titleElement = document.getElementById("event-page-title")!;
        this._descriptionElement = document.getElementById("event-page-description")!;
        this._photographyBorder = document.querySelector(".photography-border")!;
        this._eventPageChoicesBtnListElement = document.getElementById("event-page-choices-btn-list")!;
        this._imageElement = document.getElementById("event-page-image") as HTMLImageElement;
        this._developOverlay = document.getElementById("photo-develop-overlay")!;
        this._characterCard = document.getElementById("event-character-card")!;

        // Cada chave é um lugar do mapa — foto real de um ambiente abandonado
        // (Pripyat / Zona de Exclusão de Chernobyl), em preto e branco e 4:3.
        // Baixadas do Wikimedia Commons; créditos e licenças em
        // img/places/ATTRIBUTIONS.md. Ver scripts/fetch-place-images.mjs.
        this._images = new Map<string, string>([
            ['placeHospital',          new URL('../../img/places/hospital.jpg', import.meta.url).toString()],
            ['placeApartmentBlock',    new URL('../../img/places/apartment-block.jpg', import.meta.url).toString()],
            ['placeMaternity',         new URL('../../img/places/maternity.jpg', import.meta.url).toString()],
            ['placePostOffice',        new URL('../../img/places/post-office.jpg', import.meta.url).toString()],
            ['placeSchool',            new URL('../../img/places/school.jpg', import.meta.url).toString()],
            ['placePool',              new URL('../../img/places/pool.jpg', import.meta.url).toString()],
            ['placeApartmentInterior', new URL('../../img/places/apartment-interior.jpg', import.meta.url).toString()],
            ['placePharmacy',          new URL('../../img/places/pharmacy.jpg', import.meta.url).toString()],
            ['placeKindergarten',      new URL('../../img/places/kindergarten.jpg', import.meta.url).toString()],
            ['placeMural',             new URL('../../img/places/mural.jpg', import.meta.url).toString()],
            ['placeRiverPark',         new URL('../../img/places/river-park.jpg', import.meta.url).toString()],
            ['placeCentralSquare',     new URL('../../img/places/central-square.jpg', import.meta.url).toString()],
            ['placeRailwayBridge',     new URL('../../img/places/railway-bridge.jpg', import.meta.url).toString()],
            ['placeFerrisWheel',       new URL('../../img/places/ferris-wheel.jpg', import.meta.url).toString()],
            ['placeTrench',            new URL('../../img/places/trench.jpg', import.meta.url).toString()],
            ['placeAbandonedCar',      new URL('../../img/places/abandoned-car.jpg', import.meta.url).toString()],
            ['placePalaceCulture',     new URL('../../img/places/palace-culture.jpg', import.meta.url).toString()],
            ['placeFrozenRiver',       new URL('../../img/places/frozen-river.jpg', import.meta.url).toString()],
        ]);

        this._game = Game.getInstance();
        this._imageLoadRequestId = 0;
        this._pendingEvent = null;
    }

    start(): void {
        this._eventPageChoicesBtnListElement.innerHTML = '';

        if (this._pendingEvent) {
            this._currentEvent = this._pendingEvent;
            this._pendingEvent = null;
        }

        if (!this._currentEvent) {
            // Sem evento na fila — nada a mostrar aqui.
            this._game.stateManager.goToState(GameStates.LOG);
            return;
        }

        this.showEvent();
    }

    public queueEvent(event: Event): void {
        this._pendingEvent = event;
    }

    public get hasPendingEvent(): boolean {
        return this._pendingEvent != null;
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

            let buttonText: string = choice.buttonText + ' · ' +
                                     diceManager.probabilityForTarget(choice.skillCheckFields.difficult.value);

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

        if (this.currentChoice.opensItemPicker) {
            this._game.stateManager.goToState(GameStates.ITEM_PICKER);
            return;
        }

        if (this.currentChoice.normalResultPath) {
            this.currentChoice.normalResultPath();
        }

        this._game.stateManager.goToState(this.resolveNextState());
    }

    /**
     * Decide para onde ir depois que um evento se resolve:
     * epílogo (fronteira cruzada), enterro (alguém morreu) ou diário.
     */
    public resolveNextState(): GameStates {
        if (this._game.state.pendingExplorationVictory) {
            return GameStates.GAME_OVER;
        }

        if (this._game.characterManager.getFirstCharacterDeadAndNotBuried()) {
            return GameStates.RIP;
        }

        return GameStates.LOG;
    }

    get currentEvent(): Event {
        return this._currentEvent;
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
        this._game.audioManager.playEventRevealSound();
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

            this._game.audioManager.playImageRevealSound();
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
