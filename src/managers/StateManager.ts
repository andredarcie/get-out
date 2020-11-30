import { Game } from '../Game';
import { GameStates } from '../enums/GameStates';

export class StateManager {
    private readonly _game: Game;
    public currentState: GameStates = GameStates.TRAVEL;

    constructor() {
        this._game = Game.getInstance();
    }

    start(): void {
    }

    public setState(): void {
        this._game.hideAllPages();

        switch(this.currentState) {
            case GameStates.TRAVEL: 
                this._game.showPage(this._game.travelPage);
                this._game.travelManager.start();
            break;
            case GameStates.CAMP: 
                this._game.showPage(this._game.campPage);
                this._game.campManager.start();
            break;
            case GameStates.EVENT: 
                this._game.showPage(this._game.eventPage);
                this._game.eventManager.start();
            break;
            case GameStates.SKILLCHECK:
                this._game.showPage(this._game.skillCheckPage);
                this._game.skillCheckManager.start();
            break;
            case GameStates.LOG:
                this._game.showPage(this._game.logPage);
                this._game.logManager.start();
            break;
            case GameStates.GAME_OVER:
                this._game.showPage(this._game.gameOverPage);
                this._game.gameOverManager.start();
            break;
            case GameStates.RIP:
                this._game.showPage(this._game.ripPage);
                this._game.ripManager.start();
            break;
            case GameStates.BAG:
                this._game.showPage(this._game.bagPage);
                this._game.bagManager.start();
            break;
            case GameStates.ITEM_PICKER:
                this._game.showPage(this._game.itemPickerPage);
                this._game.itemPickerManager.start();
            break;
            case GameStates.SKILL_UP:
                this._game.showPage(this._game.skillUpPage);
                this._game.skillUpManager.start();
            break;
            case GameStates.DIALOG:
                this._game.showPage(this._game.dialogPage);
                this._game.dialogManager.start();
            break;
            case GameStates.MAP:
                this._game.showPage(this._game.mapPage);
                this._game.mapManager.start();
        }
    }

    public goToState(state: GameStates): void {
        if (this.currentState == GameStates.GAME_OVER) return;

        this.currentState = state;
        this.setState();
    }
}