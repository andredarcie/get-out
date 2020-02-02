import { Event, EventType } from '../entities/Event';
import { Game, GameStates } from '../Game';
import { ItemSeeds, ItemsNames } from '../seeds/ItemSeeds'

export class EventSeeds {
    private _events: Event[];
    private _game: Game;

    constructor() {
        this._game = Game.getInstance();

        this._events = [];
    }

    start() {
        this.events.push(new Event(
            'Wild Wolf Appeared',
            'He jumps furiously wanting blood!', 
            { 
                buttonText: 'Throw a stone',
                callback: () => {
                    this._game.log.addTempLog('You hit the rock and killed the wolf!');
                }
            },
            { 
                buttonText: 'Run like a chicken',
                callback: () => {
                    this._game.log.addTempLog('Did you get away');
                }
            },
            EventType.Combat,
            null
        ),
        new Event(
            'Abandoned House',
            'House with no sign of life', 
            { 
                buttonText: 'Explore',
                callback: () => {
                    this._game.log.addTempLog('You have found supplies');
                    this._game.bagManager.putItem(ItemSeeds.getItens(ItemsNames.Antibiotic, 1));
                }
            },
            { 
                buttonText: 'Ignore',
                callback: () => {
                    this._game.log.addTempLog('You just ignored the house');
                }
            },
            EventType.Combat,
            null
        ));
    }

    get events() {
        return this._events;
    }
}