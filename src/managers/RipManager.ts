import { Game } from '../Game';
import { Character } from '../entities/Character';
import { GameStates } from '../enums/GameStates';
import { STORY_YEAR } from '../GameState';

const RIP_QUOTES: Record<string, string> = {
    'Olena': 'Via demais.',
    'Mykola': 'Cresceu depressa demais.',
    'Sofiia': 'Guardava os nomes.',
};

export class RipManager {
    private _ripPageImageElement: HTMLImageElement;
    private _ripPageNameElement: Element;
    private _ripPageDatesElement: Element;
    private _ripPageQuoteElement: Element;
    private _ripPageStatusElement: Element;

    private _travelBtn: HTMLButtonElement;

    private readonly _game: Game;

    constructor() {
        this._game = Game.getInstance();

        this._ripPageImageElement = document.querySelector("#rip-page-image") as HTMLImageElement;
        this._ripPageNameElement = document.querySelector("#rip-page-name")!;
        this._ripPageDatesElement = document.querySelector("#rip-page-dates")!;
        this._ripPageQuoteElement = document.querySelector("#rip-page-quote")!;
        this._ripPageStatusElement = document.querySelector("#rip-page-status")!;

        this._travelBtn = document.querySelector('#rip-page-back-btn')!;
        this._travelBtn.addEventListener('click', () => { this.onClickTravel() });
    }

    start(): void {
        const character = this._game.characterManager.getFirstCharacterDeadAndNotBuried();
        if (!character) {
            this._game.stateManager.goToState(GameStates.LOG);
            return;
        }

        this._game.audioManager.playCharacterDeathSound();
        this.showCharacter(character);
        character.buried = true;
    }

    private showCharacter(character: Character) {
        this._ripPageImageElement.src = character.imageURL;
        this._ripPageNameElement.innerHTML = character.name;
        this._ripPageDatesElement.innerHTML = `⭐ ${character.getDateOfBirth()} — ${STORY_YEAR} ✝`;
        this._ripPageQuoteElement.innerHTML = RIP_QUOTES[character.name] ?? 'Descanse.';
        this._ripPageStatusElement.innerHTML = 'A mente cedeu.';
    }

    private onClickTravel() {
        this._game.audioManager.playButtonSound();
        const character = this._game.characterManager.getFirstCharacterDeadAndNotBuried();

        if (character) {
            this._game.audioManager.playCharacterDeathSound();
            this.showCharacter(character);
            character.buried = true;
            return;
        }

        if (this._game.eventManager.hasPendingEvent) {
            this._game.stateManager.goToState(GameStates.EVENT);
            return;
        }

        this._game.stateManager.goToState(GameStates.LOG);
    }
}
