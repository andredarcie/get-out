import { Game } from '../Game';

export class DialogManager {
    private readonly _game: Game;

    constructor() {
        this._game = Game.getInstance();
    }

    public start(): void {
    }
}