import { Event, EventType } from '../entities/Event';
import { Game } from '../Game';
import { LogType } from '../managers/LogManager';
import { Skills } from '../enums/Skills';
import { Difficulties } from '../enums/Difficulties';

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
                'ferris-wheel',
                [{
                    buttonText: 'Take a deep breath',
                    skillCheck: false,
                    skillCheckFields: null,
                    normalResultPath: () => {
                        this._game.log.addTempLog("You don't find anything interesting", LogType.Result);
                        this._game.log.addTempLog("Just look at the ferris wheel for a while, take a deep breath and walk away", LogType.Result);
                        this._game.characterManager.makeSomeoneInTheGroupGetStatus();
                    }
                },
                {
                    buttonText: 'Investigate',
                    skillCheck: true,
                    skillCheckFields: {
                        difficulty: Difficulties.MEDIUM,
                        skillToCheck: Skills.STRENGTH,
                        canGiveItems: true,
                        resultPath: {
                            success: () => {
                                this._game.log.addTempLog('You found some things of value', LogType.Result);
                            },
                            failure: () => {
                                this._game.log.addTempLog("You couldn't find anything", LogType.Result);
                            }
                        }
                    },
                    normalResultPath: null
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
            ),
            new Event(
                'Abandoned Barn',
                'Just a normal place',
                'There is something unsettling about this place',
                'barn-abandoned-farm-homestead',
                [                
                    {
                        buttonText: 'Investigate',
                        skillCheck: true,
                        skillCheckFields: {
                            difficulty: Difficulties.CHALLENGING,
                            skillToCheck: Skills.STRENGTH,
                            canGiveItems: true,
                            resultPath: {
                                success: () => {
                                    this._game.log.addTempLog('You found some things of value', LogType.Result);
                                },
                                failure: () => {
                                    this._game.log.addTempLog("You couldn't find anything", LogType.Result);
                                }
                            }
                        },
                        normalResultPath: null
                    },
                    {
                        buttonText: 'Continue',
                        skillCheck: false,
                        skillCheckFields: null,
                        normalResultPath: () => {
                            this._game.log.addTempLog("You just continue walking...", LogType.Result);
                        }
                    }
                ],
                EventType.Combat,
                null
            ),
            new Event(
                'Theme Park',
                'Just a normal place',
                'This place brings you strange memories, about sad things',
                'theme-park',
                [
                    {
                        buttonText: 'Forget memory',
                        skillCheck: true,
                        skillCheckFields: {
                            difficulty: Difficulties.MEDIUM,
                            skillToCheck: Skills.STRENGTH,
                            canGiveItems: false,
                            resultPath: {
                                success: () => {
                                    this._game.log.addTempLog('You managed to overcome the negative memories', LogType.Result);
                                },
                                failure: () => {
                                    this._game.characterManager.makeSomeoneInTheGroupGetStatus('Depressed');
                                }
                            }
                        },
                        normalResultPath: null
                    },
                    {
                        buttonText: 'Just ignore.',
                        skillCheck: false,
                        skillCheckFields: null,
                        normalResultPath: () => {
                            this._game.log.addTempLog("You just continue walking...", LogType.Result);
                        }
                    }
                ],
                EventType.Combat,
                null
            ),
            new Event(
                'Forest Fog',
                'Just a normal place',
                'There is something unsettling about this place',
                'forest-fog',
                [
                    {
                        buttonText: 'Continue',
                        skillCheck: false,
                        skillCheckFields: null,
                        normalResultPath: () => {
                            this._game.log.addTempLog("You just continue walking...", LogType.Result);
                        }
                    }
                ],
                EventType.Combat,
                null
            ),
            new Event(
                'Geyser',
                'Just a normal place',
                'There is something unsettling about this place',
                'geyser',
                [
                    {
                        buttonText: 'Continue',
                        skillCheck: false,
                        skillCheckFields: null,
                        normalResultPath: () => {
                            this._game.log.addTempLog("You just continue walking...", LogType.Result);
                        }
                    }
                ],
                EventType.Combat,
                null
            )
        ];

        return events[Math.floor(Math.random() * events.length)];
        //return events[1];
    }

    public getCombatEvent() {
        const possibleEnemies = [
            'Mad Dog',
            'Wild dog',
            'Pack of hounds',
            'Hungry wild wolf',
            'Swarm of bees',
            'Cloud of insects',
            'Sick human',
            'Hungry fox',
            'Dark figure',
            'Woman with two faces',
            'Thief with ax',
            'Militia hunter',
            'Two militia hunters',
            'Deformed rats',
            'Flock of crows',
            'Pack of wolves',
            'Locust cloud',
            'Swarm of flies',
            'Pigs with worms in the body',
            'Eyeless creature',
            'Man crawling with a knife'
        ];

        const enemy = possibleEnemies[Math.floor(Math.random() * possibleEnemies.length)];

        const possibleQuotes = [
            'Approaches more and more with an aggressive posture.',
            'Closer and closer, making avoiding conflict almost impossible',
            'Appears suddenly scaring everyone',
            'Appears from the dark in a sadistic way',
            'An inevitable encounter in this place',
            'Hard to avoid conflict'
        ]

        const quote = possibleQuotes[Math.floor(Math.random() * possibleQuotes.length)];

        return new Event(
            enemy,
            'Conflict',
            quote,
            '2',
            [{
                buttonText: 'Attack',
                skillCheck: true,
                skillCheckFields: {
                    difficulty: this._game.getRandomArbitrary(6),
                    skillToCheck: Skills.STRENGTH,
                    canGiveItems: false,
                    resultPath: {
                        success: () => {
                            this._game.log.addTempLog('You managed to scare the ' + enemy.toLowerCase() + ' and run away.', LogType.Result);
                        },
                        failure: () => {
                            this._game.characterManager.decreasesTheHealthOfSomeoneInTheGroup();
                            this._game.characterManager.makeSomeoneInTheGroupGetStatus('Wounds');
                            this._game.log.addTempLog('You were attacked but managed to escape.', LogType.Result);
                        },
                    }
                },
                normalResultPath: null
            },
            {
                buttonText: 'Run away',
                skillCheck: true,
                skillCheckFields: {
                    difficulty: this._game.getRandomArbitrary(6),
                    skillToCheck: Skills.STRENGTH,
                    canGiveItems: false,
                    resultPath: {
                        success: () => {
                            this._game.log.addTempLog('You managed to escape.', LogType.Result);
                        },
                        failure: () => {
                            this._game.characterManager.decreasesTheHealthOfSomeoneInTheGroup();
                            this._game.characterManager.makeSomeoneInTheGroupGetStatus('Fear');
                            this._game.log.addTempLog('You escaped but got hurt by the ' + enemy.toLowerCase(), LogType.Result);
                        },
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
        'milestone',
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