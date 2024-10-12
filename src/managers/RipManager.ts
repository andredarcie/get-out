import { Game } from '../Game';
import { Character } from '../entities/Character';
import { GameStates } from '../enums/GameStates';

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
        const character: Character = this._game.characterManager.getFirstCharacterDeadAndNotBuried();
        this.showCharater(character);
        character.buried = true;
    }

    showCharater(character: Character) {
        this._ripPageImageElement.src = character.imageURL;
        this._ripPageNameElement.innerHTML = character.name + ' Miller';
        this._ripPageDatesElement.innerHTML = '⭐ 02/02/1996 - 20/03/2020 ✝️';
        this._ripPageQuoteElement.innerHTML = 'I pray you find peace and rest wherever you are';
        this._ripPageStatusElement.innerHTML = '<span style="font-weight: bold;">Status:</span> Starved to death';
    }

    onClickTravel() {
        this._game.audioManager.playButtonSound();
        const character: Character = this._game.characterManager.getFirstCharacterDeadAndNotBuried();
        if (character != null) {
            this.showCharater(character);
            character.buried = true;
        } else {
            this._game.stateManager.goToState(GameStates.LOG);
        }
    }
}
