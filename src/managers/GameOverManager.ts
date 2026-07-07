import { Game } from '../Game';
import { Character } from '../entities/Character';
import { STORY_YEAR } from '../GameState';

export class GameOverManager {
    private _gameOverMessage: Element;
    private _gameOverTitle: HTMLElement;
    private _gameOverStats: HTMLElement;
    private readonly _game: Game;
    private _tryAgainBtn: HTMLButtonElement;

    constructor() {
        this._game = Game.getInstance();
        this._gameOverMessage = document.querySelector("#game-over-message")!;
        this._gameOverTitle = document.querySelector("#game-over-page h1")!;
        this._gameOverStats = document.getElementById("game-over-stats")!;
        this._tryAgainBtn = document.querySelector('#try-again-btn')!;
        this._tryAgainBtn.addEventListener('click', () => { this.onClickTryAgainBtn() });
    }

    start(): void {
        const isVictory = this._game.state.isVictoryEnding;

        this._gameOverTitle.textContent = isVictory ? 'Do Outro Lado.' : 'Fim.';
        this._gameOverTitle.style.color = isVictory ? 'var(--c-ok)' : 'var(--c-accent)';
        this._tryAgainBtn.textContent = 'De novo';

        this._gameOverMessage.innerHTML = isVictory ? this.buildVictoryEpilogue() : this.buildDefeatMessage();
        this._gameOverStats.textContent = this.buildStatsLine();

        if (isVictory) {
            this._game.audioManager.playVictorySound();
        } else {
            this._game.audioManager.playGameOverSound();
        }
    }

    private buildVictoryEpilogue(): string {
        const crossing = this._game.state.gameOverMessage;
        const survivors = this._game.characterManager.getCharactersAlive();
        const dead = this._game.characterManager.getCharactersDead();

        const paragraphs: string[] = [crossing];

        if (dead.length === 0) {
            paragraphs.push('Quatro partiram. Quatro chegaram.');
            paragraphs.push('«Como?» — «Juntos.»');
        } else if (survivors.length > 1) {
            paragraphs.push(`${this.formatNames(dead)} ficou. Um lugar vazio à mesa.`);
            paragraphs.push(this.buildMemorialLine(dead));
        } else {
            paragraphs.push('Um atravessou. Quatro memórias.');
            paragraphs.push(this.buildMemorialLine(dead));
        }

        paragraphs.push(this.buildSanityCoda(survivors));

        return paragraphs.join('<br><br>');
    }

    /**
     * O estado em que se chega também é parte do final:
     * atravessar inteiro e atravessar em pedaços são histórias diferentes.
     */
    private buildSanityCoda(survivors: Character[]): string {
        if (survivors.length === 0) return '';
        const avg = survivors.reduce((s, c) => s + c.sanity, 0) / survivors.length;

        if (avg >= 70) return '<em>Inteiros.</em>';
        if (avg >= 40) return '<em>Cansados. Vivos.</em>';
        return '<em>No que restou de vocês.</em>';
    }

    private buildDefeatMessage(): string {
        const message = this._game.state.gameOverMessage || 'A travessia termina aqui.';
        return `${message}<br><br>A cidade guarda os nomes.`;
    }

    private buildMemorialLine(dead: Character[]): string {
        return dead
            .map((character) => `✝ ${character.name} · ${character.getDateOfBirth()}–${STORY_YEAR}`)
            .join('&nbsp;&nbsp;·&nbsp;&nbsp;');
    }

    private formatNames(characters: Character[]): string {
        const names = characters.map((character) => character.name);
        if (names.length === 1) return names[0];
        return names.slice(0, -1).join(', ') + ' e ' + names[names.length - 1];
    }

    private buildStatsLine(): string {
        const day = this._game.state.currentDay;
        const explored = this._game.state.exploredLocationsCount;
        const survivors = this._game.characterManager.getNumberOfCharactersAlive();

        if (this._game.state.isVictoryEnding) {
            return `Dia ${day} · ${explored} lugares · ${survivors}/4`;
        }

        const depth = this._game.mapManager.getCurrentDepth();
        const total = this._game.mapManager.totalSteps;
        return `Dia ${day} · ${explored} lugares · etapa ${depth}/${total}`;
    }

    private onClickTryAgainBtn() {
        this._game.audioManager.playButtonSound();
        location.reload();
    }
}
