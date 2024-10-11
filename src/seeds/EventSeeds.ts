import { Event, EventType } from '../entities/Event';
import { Game } from '../Game';
import { LogType } from '../managers/LogManager';
import { Skills } from '../enums/Skills';
import { Difficulties } from '../enums/Difficulties';
import { EnemySeeds } from './EnemySeeds';
import { Enemy } from '../entities/Enemy';
import { ItemSeeds } from './ItemSeeds';

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
                'ferrisWheel',
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
                        difficulty: Difficulties.MEDIUM,
                        skillToCheck: Skills.STRENGTH,
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
                'Haunting Echoes',
                'You hear a distant sound, faint but familiar, like someone calling your name from far away.',
                'An eerie sensation creeps up your spine, making you feel as though you are not alone.',
                'geysir',
                [{
                    buttonText: 'Follow the sound',
                    skillCheck: true,
                    skillCheckFields: {
                        difficulty: Difficulties.EASY,
                        skillToCheck: Skills.EXPLORATION,
                        canGiveItems: true,
                        resultPath: {
                            success: () => {
                                this._game.log.addTempLog('You carefully follow the sound, discovering an itme hidden among the trees.', LogType.Result);
                                this._game.itemPickerManager.addItemToPick(ItemSeeds.getOneRandomItem());
                            },
                            failure: () => {
                                this._game.characterManager.makeSomeoneInTheGroupGetStatus('Paranoid');
                                this._game.log.addTempLog('You become lost in the forest, hearing whispers all around you but finding nothing.', LogType.Result);
                            }
                        }
                    },
                    normalResultPath: null
                },
                {
                    buttonText: 'Ignore the sound',
                    skillCheck: false,
                    skillCheckFields: null,
                    normalResultPath: () => {
                        this._game.log.addTempLog("You decide to ignore the sound, but it lingers in the back of your mind, leaving you uneasy.", LogType.Result);
                    }
                }],
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