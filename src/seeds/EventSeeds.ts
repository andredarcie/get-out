import { Event } from '../entities/Event';
import { DmytroEventSeeds } from './DmytroEventSeeds';
import { MykolaEventSeeds } from './MykolaEventSeeds';
import { OlenaEventSeeds } from './OlenaEventSeeds';
import { SofiiaEventSeeds } from './SofiiaEventSeeds';
import { StoryEventSeeds } from './StoryEventSeeds';

/**
 * Registro central de eventos. Cada nó do mapa aponta para um
 * evento pelo título; este registro monta todos e resolve a busca.
 */
export class EventSeeds {
    private _events: Event[];

    constructor() {
        this._events = [];
    }

    start() {
        this._events.push(...DmytroEventSeeds.createDmytroEvents());
        this._events.push(...MykolaEventSeeds.createMykolaEvents());
        this._events.push(...OlenaEventSeeds.createOlenaEvents());
        this._events.push(...SofiiaEventSeeds.createSofiiaEvents());
        this._events.push(...StoryEventSeeds.createStoryEvents());
    }

    get events() {
        return this._events;
    }

    public getEventByTitle(title: string): Event | null {
        return this._events.find((event) => event.title === title) ?? null;
    }
}
