import { Game } from '../Game';

export class SkillUpManager {
    private readonly _game: Game;

    constructor() {
        this._game = Game.getInstance();
    }

    public start(): void {
    }
}