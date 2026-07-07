import { Game } from '../Game';
import { GameStates } from '../enums/GameStates';

export class StateManager {
    private readonly _game: Game;
    public currentState: GameStates = GameStates.INTRO;

    constructor() {
        this._game = Game.getInstance();
    }

    start(): void {
    }

    public setState(): void {
        const { pages } = this._game;
        pages.hideAll();

        switch(this.currentState) {
            case GameStates.INTRO:
                pages.show(pages.intro);
                this._game.introManager.start();
            break;
            case GameStates.EVENT:
                pages.show(pages.event);
                this._game.eventManager.start();
            break;
            case GameStates.SKILLCHECK:
                pages.show(pages.skillCheck);
                this._game.skillCheckManager.start();
            break;
            case GameStates.LOG:
                pages.show(pages.log);
                this._game.logManager.start();
            break;
            case GameStates.GAME_OVER:
                pages.show(pages.gameOver);
                this._game.gameOverManager.start();
            break;
            case GameStates.RIP:
                pages.show(pages.rip);
                this._game.ripManager.start();
            break;
            case GameStates.BAG:
                pages.show(pages.bag);
                this._game.bagManager.start();
            break;
            case GameStates.ITEM_PICKER:
                pages.show(pages.itemPicker);
                this._game.itemPickerManager.start();
            break;
            case GameStates.MAP:
                pages.show(pages.map);
                this._game.mapManager.start();
        }
    }

    public goToState(state: GameStates): void {
        if (this.currentState == GameStates.GAME_OVER) return;

        if (state !== GameStates.MAP && state !== GameStates.LOG) {
            this._game.audioManager.stopWalkSound();
        }

        this.currentState = state;
        this.setState();
    }
}
