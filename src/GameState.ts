import { Clock } from './entities/Clock';
import { SkillCheckResults } from './enums/SkillCheckResults';

export const STORY_YEAR = 2022;

export class GameState {
    private _currentDay: number = 1;
    private _clock: Clock;
    private _currentMapNodeId: string = 'camp';
    private _exploredLocationIds: Set<string> = new Set();
    private _traversedMapNodeIds: Set<string> = new Set(['camp']);
    private _traversedMapEdgeIds: Set<string> = new Set();
    private _gameOverMessage: string = '';
    private _pendingExplorationVictory: boolean = false;
    private _isVictoryEnding: boolean = false;
    public skillCheckResult: SkillCheckResults;

    constructor() {
        this._clock = new Clock(8, true);
    }

    get currentDay(): number { return this._currentDay; }
    get clock(): Clock { return this._clock; }
    get currentMapNodeId(): string { return this._currentMapNodeId; }
    get gameOverMessage(): string { return this._gameOverMessage; }
    get exploredLocationsCount(): number { return this._exploredLocationIds.size; }
    get pendingExplorationVictory(): boolean { return this._pendingExplorationVictory; }
    get isVictoryEnding(): boolean { return this._isVictoryEnding; }

    setCurrentMapNode(nodeId: string): void {
        this._currentMapNodeId = nodeId;
        this._traversedMapNodeIds.add(nodeId);
    }

    hasExploredLocation(nodeId: string): boolean {
        return this._exploredLocationIds.has(nodeId);
    }

    markLocationExplored(nodeId: string): void {
        this._exploredLocationIds.add(nodeId);
    }

    hasTraversedMapNode(nodeId: string): boolean {
        return this._traversedMapNodeIds.has(nodeId);
    }

    markTraversedMapEdge(fromNodeId: string, toNodeId: string): void {
        this._traversedMapEdgeIds.add(this.createMapEdgeId(fromNodeId, toNodeId));
    }

    hasTraversedMapEdge(fromNodeId: string, toNodeId: string): boolean {
        return this._traversedMapEdgeIds.has(this.createMapEdgeId(fromNodeId, toNodeId));
    }

    setGameOverMessage(message: string, isVictory: boolean = false): void {
        this._gameOverMessage = message;
        this._isVictoryEnding = isVictory;
    }

    setPendingExplorationVictory(value: boolean): void {
        this._pendingExplorationVictory = value;
    }

    addDaysToCurrentDay(n: number): void {
        this._currentDay += n;
    }

    passOneHour(): void {
        if (this._clock.currentHour == 12 && this._clock.anteMeridiem) {
            this.addDaysToCurrentDay(1);
        }
        this._clock.nextHour();
    }

    isDayLight(): boolean {
        if (this._clock.anteMeridiem) {
            return this._clock.currentHour > 6 && this._clock.currentHour < 12;
        } else {
            return !(this._clock.currentHour > 6 && this._clock.currentHour < 12);
        }
    }

    getRandomArbitrary(max: number): number {
        return Math.floor(Math.random() * max);
    }

    private createMapEdgeId(fromNodeId: string, toNodeId: string): string {
        return `${fromNodeId}->${toNodeId}`;
    }
}
