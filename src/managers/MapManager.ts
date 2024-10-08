import { Game } from '../Game';

export class MapManager {
    private readonly _game: Game;

    constructor() {
        this._game = Game.getInstance();
    }

    public start(): void {
    }
}