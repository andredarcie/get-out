import { Game } from './Game';

const game = Game.getInstance();
game.start();

declare global {
    interface Window {
        advanceTime?: (ms: number) => Promise<void>;
        render_game_to_text?: () => string;
        __game?: Game;
    }
}

window.__game = game;

const getVisiblePageId = (): string | null => {
    const pages: Array<[string, HTMLElement]> = [
        ['intro', game.pages.intro],
        ['log', game.pages.log],
        ['event', game.pages.event],
        ['skillCheck', game.pages.skillCheck],
        ['gameOver', game.pages.gameOver],
        ['rip', game.pages.rip],
        ['bag', game.pages.bag],
        ['itemPicker', game.pages.itemPicker],
        ['map', game.pages.map],
    ];

    const visibleEntry = pages.find(([, page]) => page.style.display !== 'none');
    return visibleEntry ? visibleEntry[0] : null;
};

const getTextList = (selector: string): string[] => {
    return Array.from(document.querySelectorAll(selector))
        .map((node) => (node.textContent || '').trim())
        .filter(Boolean);
};

window.advanceTime = (ms: number): Promise<void> => {
    return new Promise((resolve) => {
        window.setTimeout(resolve, Math.max(0, ms));
    });
};

window.render_game_to_text = (): string => {
    const visiblePage = getVisiblePageId();
    const visibleButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('button'))
        .filter((button) => button.offsetParent !== null)
        .map((button) => ({
            text: (button.textContent || '').trim(),
            disabled: button.disabled,
            id: button.id || null,
        }));

    const payload = {
        coordinateSystem: 'DOM UI only; top-left origin; no gameplay canvas is used.',
        visiblePage,
        state: {
            currentState: game.stateManager.currentState,
            currentDay: game.state.currentDay,
            currentHour: game.state.clock.currentHour,
            anteMeridiem: game.state.clock.anteMeridiem,
            currentMapNodeId: game.state.currentMapNodeId,
            exploredLocationsCount: game.state.exploredLocationsCount,
            pendingExplorationVictory: game.state.pendingExplorationVictory,
            isVictoryEnding: game.state.isVictoryEnding,
        },
        characters: game.characters.map((character) => ({
            name: character.name,
            kinship: character.kinship,
            sanity: character.sanity,
            isDead: character.isDead,
            buried: character.buried,
            afflictions: character.showAfflictions(),
        })),
        visibleButtons,
        headings: getTextList('h1, h2'),
        paragraphs: getTextList('p'),
        logEntries: getTextList('#log-list-result li'),
        bagItems: getTextList('#bag-item-list li'),
        itemsToPick: getTextList('#item-picker-page-items-to-pick li'),
        myItems: getTextList('#item-picker-page-item-my-items li'),
        mapNodes: getTextList('.map-node-label'),
        choiceButtons: getTextList('#event-page-choices-btn-list button'),
    };

    return JSON.stringify(payload, null, 2);
};
