import { Event, EventType } from '../entities/Event';
import { Game } from '../Game';
import { LogType } from '../managers/LogManager';
import { AfflictionSeeds } from './AfflictionSeeds';
import { Skills } from '../enums/Skills';
import { Difficulties } from '../enums/Difficulties';

export class EventSeeds {
    private _events: Event[];
    private _game: Game;
    private _imageUrlList: string[] = [];

    constructor() {
        this._game = Game.getInstance();

        for (let i = 0; i < 8; i++) {
            this._imageUrlList[i] = (document.getElementById("event-page-image-" + (i + 1)) as HTMLImageElement).src;
        }

        this._events = [];
    }

    start() {
        this.events.push(new Event(
            'Wild Wolf Appeared',
            'Something that catches your eye',
            'He jumps furiously wanting blood!', 
            '',
            [{ 
                buttonText: 'Throw a stone',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: () => {
                    this._game.log.addTempLog('You hit the rock and killed the wolf!', LogType.Result);
                }
            },
            { 
                buttonText: 'Run like a chicken',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: () => {
                    this._game.log.addTempLog('Did you get away', LogType.Result);
                }
            }],
            EventType.Combat,
            null
        ));
    }

    get events() {
        return this._events;
    }

    public getPlaceEvent() {
        const events: Event[] = [
            new Event(
                'Ferris wheel',
                'When you look up you feel a chill in your belly',
                'It seems like it’s not been used for a long time,' +
                ' a time when having fun still made sense',
                this._imageUrlList[0],
                [{
                    buttonText: 'Investigate',
                    skillCheck: false,
                    skillCheckFields: null,
                    normalResultPath: () => {
                        this._game.log.addTempLog("You don't find anything interesting", LogType.Result);
                        this._game.log.addTempLog("Just look at the ferris wheel for a while, take a deep breath and walk away", LogType.Result);
                    }
                },
                {
                    buttonText: 'Continue the walk',
                    skillCheck: false,
                    skillCheckFields: null,
                    normalResultPath: () => {
                        this._game.log.addTempLog("You just go by the ferris wheel and go away, without looking back", LogType.Result);
                    }
                }],
                EventType.Combat,
                null
            )
        ];

        return events[0];
    }

    public getCombatEvent() {
        return new Event(
            'Furious wolf appeared!',
            'Something that catches your eye',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultricies, ' +
            'lorem semper scelerisque interdum, neque felis tincidunt enim, at iaculis elit dolor ut libero. ' +
            'Fusce a odio pellentesque, pretium ipsum non, scelerisque mi. Vivamus quis arcu vel sapien ultricies varius. Pellentesque elementum lobortis convallis.',
            this._imageUrlList[6],
            [{
                buttonText: 'Fight',
                skillCheck: true,
                skillCheckFields: {
                    difficulty: Difficulties.VERY_HARD,
                    skillToCheck: Skills.STRENGTH,
                    resultPath: {
                        success: () => {
                            this._game.log.addTempLog('With a lot of struggle you beat the wolf', LogType.Result);
                        },
                        criticalSuccess: () => {
                            this._game.log.addTempLog('You defeated the wolf easily', LogType.Result);
                        },
                        failure: () => {
                            this._game.log.addTempLog('The wolf has hurt you', LogType.Result);
                            this._game.characterManager.decreasesTheHealthOfSomeoneInTheGroup();
                        },
                        criticalFailure: () => {
                            this._game.log.addTempLog('The wolf left you devastated', LogType.Result);
                            this._game.characterManager.decreasesTheHealthOfSomeoneInTheGroup();
                            this._game.characterManager.decreasesTheHealthOfSomeoneInTheGroup();
                        }
                    }
                },
                normalResultPath: null
            },
            {
                buttonText: 'Try to escape',
                skillCheck: true,
                skillCheckFields: {
                    difficulty: Difficulties.CHALLENGING,
                    skillToCheck: Skills.STEALTH,
                    resultPath: {
                        success: () => {
                            this._game.log.addTempLog('You managed to escape the wolf', LogType.Result);
                        },
                        criticalSuccess: () => {
                            this._game.log.addTempLog('You managed to escape with some ease', LogType.Result);
                        },
                        failure: () => {
                            this._game.log.addTempLog('You didnt get away', LogType.Result);
                            this._game.characterManager.decreasesTheHealthOfSomeoneInTheGroup();
                        },
                        criticalFailure: () => {
                            this._game.log.addTempLog('You try to escape but fall to the ground', LogType.Result);
                            this._game.characterManager.decreasesTheHealthOfSomeoneInTheGroup();
                            this._game.characterManager.decreasesTheHealthOfSomeoneInTheGroup();
                        }
                    }
                },
                normalResultPath: null
            }],
            EventType.Combat,
            null
        );
    }

    public getMileStoneEvent(): Event {
        return new Event('Milestone Reached! ',
        'Something that catches your eye',
        this._game.distanceToTheBorder + ' miles to the border',
        this._imageUrlList[7],
        [
        {
            buttonText: 'Back to travel',
            skillCheck: false,
            skillCheckFields: null,
            normalResultPath: () => {}
        }],
        EventType.Exploration, null
        );
    }
}