import { Event, EventType } from '../entities/Event';
import { Game } from '../Game';
import { LogType } from '../managers/LogManager';
import { Difficulties } from '../enums/Difficulties';
import { DmytroEventSeeds } from './DmytroEventSeeds';
import { MykolaEventSeeds } from './MykolaEventSeeds';
import { OlenaEventSeeds } from './OlenaEventSeeds';
import { SofiiaEventSeeds } from './SofiiaEventSeeds';

export class EventSeeds {
    private _events: Event[];
    private _game: Game;
    private _triggeredEvents: Set<string>;

    constructor() {
        this._game = Game.getInstance();
        this._events = [];
        this._triggeredEvents = new Set();
    }

    start() {
        this._events.push(...DmytroEventSeeds.createDmytroEvents());
        this._events.push(...MykolaEventSeeds.createMykolaEvents());
        this._events.push(...OlenaEventSeeds.createOlenaEvents());
        this._events.push(...SofiiaEventSeeds.createSofiiaEvents());
    }

    get events() {
        return this._events;
    }

    public getPlaceEvent() {
        const availableEvents = this._events.filter(event => !this._triggeredEvents.has(event.title));
        if (availableEvents.length === 0) {
            return null; // Retorna null se todos os eventos já aconteceram
        }
        const selectedEvent = availableEvents[Math.floor(Math.random() * availableEvents.length)];
        this._triggeredEvents.add(selectedEvent.title);
        return selectedEvent;
    }

    public getMileStoneEvent(): Event {
        return new Event(
            'Marcos Alcançado!',
            `${this._game.distanceToTheBorder} milhas para a fronteira`,
            'milestone',
            {
                buttonText: 'Voltar para a viagem',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: () => {}
            },
            EventType.Exploration, 
            null,
            null
        );
    }
}