import { Event, EventType } from '../entities/Event';
import { Game } from '../Game';
import { LogType } from '../managers/LogManager';
import { Skills } from '../enums/Skills';
import { Difficulties } from '../enums/Difficulties';
import { EnemySeeds } from './EnemySeeds';
import { Enemy } from '../entities/Enemy';

export class EventSeeds {
    private _events: Event[];
    private _game: Game;

    constructor() {
        this._game = Game.getInstance();
        this._events = [];
    }

    start() {
        this.events.push(new Event(
            'Overwhelming Anxiety',
            'A sudden wave of anxiety hits you',
            'You feel your heart pounding and your breath becomes shallow',
            '',
            [{ 
                buttonText: 'Take deep breaths',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: () => {
                    this._game.log.addTempLog('You manage to calm yourself a bit, but the unease lingers.', LogType.Result);
                }
            },
            { 
                buttonText: 'Ignore it',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: () => {
                    this._game.log.addTempLog('The anxiety remains, gnawing at the back of your mind.', LogType.Result);
                }
            }],
            EventType.Psychological,
            null
        ));
    }

    get events() {
        return this._events;
    }

    public getPlaceEvent() {
        const events: Event[] = [
            new Event(
                'Old Memories',
                'You come across a place that feels strangely familiar',
                'Memories of a happier time flood your mind, mixed with sadness',
                'memories-place',
                [{
                    buttonText: 'Embrace the memories',
                    skillCheck: false,
                    skillCheckFields: null,
                    normalResultPath: () => {
                        this._game.log.addTempLog("You allow yourself to feel the sadness, and it gives you a strange sense of comfort.", LogType.Result);
                    }
                },
                {
                    buttonText: 'Push the memories away',
                    skillCheck: true,
                    skillCheckFields: {
                        difficulty: Difficulties.HARD,
                        skillToCheck: Skills.WILLPOWER,
                        canGiveItems: false,
                        resultPath: {
                            success: () => {
                                this._game.log.addTempLog('You manage to suppress the emotions, feeling a bit numb.', LogType.Result);
                            },
                            failure: () => {
                                this._game.characterManager.makeSomeoneInTheGroupGetStatus('Depressed');
                                this._game.log.addTempLog("You fail to suppress the memories, and they overwhelm you with sadness.", LogType.Result);
                            }
                        }
                    },
                    normalResultPath: null
                }],
                EventType.Psychological,
                null
            ),
            new Event(
                'Abandoned House',
                'A house that seems to hold many stories',
                'The silence inside is almost deafening, and you feel a chill run down your spine',
                'abandoned-house',
                [                
                    {
                        buttonText: 'Search for clues',
                        skillCheck: true,
                        skillCheckFields: {
                            difficulty: Difficulties.CHALLENGING,
                            skillToCheck: Skills.INTUITION,
                            canGiveItems: false,
                            resultPath: {
                                success: () => {
                                    this._game.log.addTempLog('You find an old photograph that makes you think about lost connections.', LogType.Result);
                                },
                                failure: () => {
                                    this._game.log.addTempLog("You couldn't find anything, but the emptiness of the place fills you with unease.", LogType.Result);
                                }
                            }
                        },
                        normalResultPath: null
                    },
                    {
                        buttonText: 'Leave the house',
                        skillCheck: false,
                        skillCheckFields: null,
                        normalResultPath: () => {
                            this._game.log.addTempLog("You decide it's better to leave before the unsettling feeling grows stronger.", LogType.Result);
                        }
                    }
                ],
                EventType.Psychological,
                null
            ),
            new Event(
                'Haunted Theme Park',
                'A place that once brought joy now feels empty and eerie',
                'The broken rides and faded colors remind you of forgotten dreams',
                'haunted-theme-park',
                [
                    {
                        buttonText: 'Confront the feeling of loss',
                        skillCheck: true,
                        skillCheckFields: {
                            difficulty: Difficulties.MEDIUM,
                            skillToCheck: Skills.COURAGE,
                            canGiveItems: false,
                            resultPath: {
                                success: () => {
                                    this._game.log.addTempLog('You face the sadness and find a sense of closure.', LogType.Result);
                                },
                                failure: () => {
                                    this._game.characterManager.makeSomeoneInTheGroupGetStatus('Depressed');
                                    this._game.log.addTempLog('The memories are too painful, and you feel overwhelmed.', LogType.Result);
                                }
                            }
                        },
                        normalResultPath: null
                    },
                    {
                        buttonText: 'Ignore the feeling',
                        skillCheck: false,
                        skillCheckFields: null,
                        normalResultPath: () => {
                            this._game.log.addTempLog("You try to ignore the feelings, but they linger as you walk away.", LogType.Result);
                        }
                    }
                ],
                EventType.Psychological,
                null
            ),
            new Event(
                'Thick Forest',
                'The foggy forest seems to reflect your inner thoughts',
                'The deeper you go, the more lost you feel',
                'thick-forest',
                [
                    {
                        buttonText: 'Find your way through',
                        skillCheck: true,
                        skillCheckFields: {
                            difficulty: Difficulties.HARD,
                            skillToCheck: Skills.WILLPOWER,
                            canGiveItems: false,
                            resultPath: {
                                success: () => {
                                    this._game.log.addTempLog('You push through the fog, feeling a sense of determination.', LogType.Result);
                                },
                                failure: () => {
                                    this._game.characterManager.makeSomeoneInTheGroupGetStatus('Lost');
                                    this._game.log.addTempLog('You lose your way and feel a growing sense of panic.', LogType.Result);
                                }
                            }
                        },
                        normalResultPath: null
                    },
                    {
                        buttonText: 'Sit and gather your thoughts',
                        skillCheck: false,
                        skillCheckFields: null,
                        normalResultPath: () => {
                            this._game.log.addTempLog("You sit down, trying to make sense of your thoughts in the oppressive fog.", LogType.Result);
                        }
                    }
                ],
                EventType.Psychological,
                null
            ),
            new Event(
                'Geyser of Emotions',
                'A geyser erupts nearby, mirroring your turbulent feelings',
                'The power of nature reminds you of emotions you’ve tried to suppress',
                'emotional-geyser',
                [
                    {
                        buttonText: 'Let the emotions flow',
                        skillCheck: false,
                        skillCheckFields: null,
                        normalResultPath: () => {
                            this._game.log.addTempLog("You let yourself feel everything, and it leaves you both exhausted and relieved.", LogType.Result);
                        }
                    },
                    {
                        buttonText: 'Hold it all in',
                        skillCheck: true,
                        skillCheckFields: {
                            difficulty: Difficulties.CHALLENGING,
                            skillToCheck: Skills.WILLPOWER,
                            canGiveItems: false,
                            resultPath: {
                                success: () => {
                                    this._game.log.addTempLog('You manage to contain your emotions, but at a cost.', LogType.Result);
                                },
                                failure: () => {
                                    this._game.characterManager.makeSomeoneInTheGroupGetStatus('Fear');
                                    this._game.log.addTempLog('You fail to contain it, and emotions burst out uncontrollably.', LogType.Result);
                                }
                            }
                        },
                        normalResultPath: null
                    }
                ],
                EventType.Psychological,
                null
            )
        ];

        return events[Math.floor(Math.random() * events.length)];
    }

    public getCombatEvent() {
        const enemy: Enemy = EnemySeeds.getOneRandomEnemy();

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
            enemy.name,
            'Conflict',
            quote,
            '2',
            [{
                buttonText: 'Attack',
                skillCheck: true,
                skillCheckFields: {
                    difficulty: enemy.attack,
                    skillToCheck: Skills.STRENGTH,
                    canGiveItems: false,
                    resultPath: {
                        success: () => {
                            this._game.log.addTempLog('You managed to scare the ' + enemy.name.toLowerCase() + ' and run away.', LogType.Result);
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
                    difficulty: enemy.runAway,
                    skillToCheck: Skills.STRENGTH,
                    canGiveItems: false,
                    resultPath: {
                        success: () => {
                            this._game.log.addTempLog('You managed to escape.', LogType.Result);
                        },
                        failure: () => {
                            this._game.characterManager.decreasesTheHealthOfSomeoneInTheGroup();
                            this._game.characterManager.makeSomeoneInTheGroupGetStatus('Fear');
                            this._game.log.addTempLog('You escaped but got hurt by the ' + enemy.name.toLowerCase(), LogType.Result);
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