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
                'Velhas Memórias',
                'Você se depara com um lugar que parece estranhamente familiar.',
                'Memórias de um tempo mais feliz inundam sua mente, misturadas com tristeza.',
                'ferrisWheel',
                [{
                    buttonText: 'Abraçar as memórias',
                    skillCheck: false,
                    skillCheckFields: null,
                    normalResultPath: () => {
                        this._game.log.addTempLog("Você se permite sentir a tristeza, e isso lhe dá uma estranha sensação de conforto.", LogType.Result);
                    }
                },
                {
                    buttonText: 'Afastar as memórias',
                    skillCheck: true,
                    skillCheckFields: {
                        difficulty: Difficulties.MEDIUM,
                        skillToCheck: Skills.STRENGTH,
                        canGiveItems: false,
                        resultPath: {
                            success: () => {
                                this._game.log.addTempLog('Você consegue suprimir as emoções, sentindo-se um pouco entorpecido.', LogType.Result);
                            },
                            failure: () => {
                                this._game.characterManager.makeSomeoneInTheGroupGetStatus('Depressão');
                                this._game.log.addTempLog("Você falha em suprimir as memórias, e elas o sobrecarregam com tristeza.", LogType.Result);
                            }
                        }
                    },
                    normalResultPath: null
                }],
                EventType.Psychological,
                null
            ),
            new Event(
                'Ecos Assombrados',
                'Você ouve um som distante, fraco mas familiar, como se alguém estivesse chamando seu nome de longe.',
                'Uma sensação estranha sobe pela sua espinha, fazendo você se sentir como se não estivesse sozinho.',
                'geysir',
                [{
                    buttonText: 'Seguir o som',
                    skillCheck: true,
                    skillCheckFields: {
                        difficulty: Difficulties.EASY,
                        skillToCheck: Skills.EXPLORATION,
                        canGiveItems: true,
                        resultPath: {
                            success: () => {
                                this._game.log.addTempLog('Você segue cuidadosamente o som, descobrindo um item escondido entre as árvores.', LogType.Result);
                                this._game.itemPickerManager.addItemToPick(ItemSeeds.getOneRandomItem());
                            },
                            failure: () => {
                                this._game.characterManager.makeSomeoneInTheGroupGetStatus('Paranoia');
                                this._game.log.addTempLog('Você se perde na floresta, ouvindo sussurros ao seu redor, mas não encontra nada.', LogType.Result);
                            }
                        }
                    },
                    normalResultPath: null
                },
                {
                    buttonText: 'Ignorar o som',
                    skillCheck: false,
                    skillCheckFields: null,
                    normalResultPath: () => {
                        this._game.log.addTempLog("Você decide ignorar o som, mas ele persiste no fundo da sua mente, deixando você inquieto.", LogType.Result);
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