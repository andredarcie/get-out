import { Game } from '../Game';
import { GameStates } from '../enums/GameStates';
import { LogType } from './LogManager';

export class IntroManager {
    private readonly _game: Game;
    private _startBtn: HTMLButtonElement;

    constructor() {
        this._game = Game.getInstance();
        this._startBtn = document.querySelector('#intro-start-btn')!;
        this._startBtn.addEventListener('click', () => this.onClickStart());
    }

    public start(): void {
    }

    private onClickStart(): void {
        this._game.audioManager.playButtonSound();
        this._game.log.addTempLog('Dia 1. Partimos.', LogType.Result);
        this._game.log.addTempLog('Oito etapas. Juntos.', LogType.Result);
        this._game.stateManager.goToState(GameStates.LOG);
    }
}
