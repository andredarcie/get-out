import { EventManager } from './managers/EventManager';
import { GameOverManager } from './managers/GameOverManager';
import { RipManager } from './managers/RipManager';
import { LogManager } from './managers/LogManager';
import { BagManager } from './managers/BagManager';
import { StateManager } from './managers/StateManager';
import { GameStates } from './enums/GameStates';
import { Character } from './entities/Character';
import { CharacterManager } from './managers/CharacterManager';
import { Language, LocalizationManager } from './managers/LocalizationManager';
import { DialogManager } from './managers/DialogManager';
import { MapManager } from './managers/MapManager';
import { SkillUpManager } from './managers/SkillUpManager';
import { SkillCheckManager } from './managers/SkillCheckManager';
import { ItemPickerManager } from './managers/ItemPickerManager';
import { AudioManager } from './managers/AudioManager';
import { GameState } from './GameState';
import { PageRegistry } from './PageRegistry';

export class Game {
    private static _instance: Game;

    public readonly state: GameState;
    public readonly pages: PageRegistry;

    public eventManager: EventManager;
    public skillCheckManager: SkillCheckManager;
    public gameOverManager: GameOverManager;
    public ripManager: RipManager;
    public logManager: LogManager;
    public bagManager: BagManager;
    public characterManager: CharacterManager;
    public stateManager: StateManager;
    public itemPickerManager: ItemPickerManager;
    public loc: LocalizationManager;
    public dialogManager: DialogManager;
    public mapManager: MapManager;
    public skillUpManager: SkillUpManager;
    public audioManager: AudioManager;

    private constructor() {
        this.state = new GameState();
        this.pages = new PageRegistry();
    }

    static getInstance(): Game {
        if (!Game._instance) {
            Game._instance = new Game();
        }
        return Game._instance;
    }

    public start(): void {
        this.loc = new LocalizationManager(Language.PtBr);
        this.bagManager = new BagManager();
        this.characterManager = new CharacterManager();
        this.characterManager.start();
        this.eventManager = new EventManager();
        this.gameOverManager = new GameOverManager();
        this.skillCheckManager = new SkillCheckManager();
        this.ripManager = new RipManager();
        this.logManager = new LogManager();
        this.stateManager = new StateManager();
        this.itemPickerManager = new ItemPickerManager();
        this.dialogManager = new DialogManager();
        this.mapManager = new MapManager();
        this.skillUpManager = new SkillUpManager();
        this.audioManager = new AudioManager();

        this.stateManager.goToState(GameStates.LOG);
    }

    get log(): LogManager {
        return this.logManager;
    }

    get characters(): Character[] {
        return this.characterManager.characters;
    }
}
