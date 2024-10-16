import { Event, EventType } from '../entities/Event';
import { Game } from '../Game';
import { LogType } from '../managers/LogManager';
import { Difficulties } from '../enums/Difficulties';

export class DmytroEventSeeds {
    private static _game: Game;

    public static createDmytroEvents(): Event[] {
        this._game = Game.getInstance();
        let events: Event[] = [];

        events.push(new Event(
            'Rostos nos Escombros',
            'Dmytro depara-se com os corpos de uma família, soterrados nos escombros de uma casa destruída. A visão faz com que o medo de um destino similar para sua própria família o assombre.',
            '',
            {
                buttonText: 'Enfrentar',
                skillCheck: true,
                skillCheckFields: {
                    difficulty: Difficulties.MEDIUM,
                    canGiveItems: false,
                    resultPath: {
                        success: () => {
                            this._game.characterManager.characterDmytro.increaseSanity(5);
                            this._game.log.addTempLog('Dmytro reúne forças para enfrentar a visão aterradora, recuperando um fragmento de sua sanidade.', LogType.Result);
                        },
                        failure: () => {
                            this._game.characterManager.characterDmytro.looseSanity(10);
                            this._game.characterManager.makeSomeoneInTheGroupGetStatus('Dmytro', 'Ansiedade');
                            this._game.log.addTempLog('A visão é demasiado penosa para Dmytro, instilando uma profunda ansiedade em seu coração.', LogType.Result);
                        }
                    }
                },
                normalResultPath: null
            },
            {
                buttonText: 'Evitar',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: () => {
                    this._game.characterManager.characterDmytro.looseSanity(5);
                    this._game.log.addTempLog('Dmytro desvia o olhar, mas a imagem permanece vívida em sua mente, corroendo lentamente sua sanidade.', LogType.Result);
                }
            },
            EventType.Psychological,
            this._game.characterManager.characterDmytro
        ));

        events.push(new Event(
            'O Velho Espelho',
            'Dmytro encontra um espelho rachado, e nele vislumbra os rostos daqueles que não conseguiu salvar.',
            '',
            {
                buttonText: 'Pressão',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: () => {
                    this._game.characterManager.characterDmytro.looseSanity(5);
                    this._game.log.addTempLog('Dmytro sente o peso esmagador da culpa ao encarar o espelho, perdendo parte de sua sanidade.', LogType.Result);
                }
            },
            {
                buttonText: 'Cautela',
                skillCheck: true,
                skillCheckFields: {
                    difficulty: Difficulties.MEDIUM,
                    canGiveItems: false,
                    resultPath: {
                        success: () => {
                            this._game.characterManager.characterDmytro.increaseSanity(5);
                            this._game.log.addTempLog('Dmytro desvia o olhar do espelho, afastando os pensamentos sombrios que o assolavam.', LogType.Result);
                        },
                        failure: () => {
                            this._game.characterManager.characterDmytro.looseSanity(10);
                            this._game.characterManager.makeSomeoneInTheGroupGetStatus('Dmytro', 'Culpa');
                            this._game.log.addTempLog('Dmytro falha em afastar os pensamentos negativos e é consumido pela culpa.', LogType.Result);
                        }
                    }
                },
                normalResultPath: null
            },
            EventType.Psychological,
            this._game.characterManager.characterDmytro
        ));

        events.push(new Event(
            'Gritos Fantasmas',
            'Dmytro escuta gritos ao longe, ecos dolorosos das memórias de um massacre que testemunhou.',
            '',
            {
                buttonText: 'Confrontar',
                skillCheck: true,
                skillCheckFields: {
                    difficulty: Difficulties.CHALLENGING,
                    canGiveItems: false,
                    resultPath: {
                        success: () => {
                            this._game.characterManager.characterDmytro.increaseSanity(10);
                            this._game.log.addTempLog('Dmytro confronta as memórias dolorosas e consegue transcendê-las, recuperando parte de sua sanidade.', LogType.Result);
                        },
                        failure: () => {
                            this._game.characterManager.characterDmytro.looseSanity(15);
                            this._game.characterManager.makeSomeoneInTheGroupGetStatus('Dmytro', 'Trauma');
                            this._game.log.addTempLog('As lembranças são intensas demais, mergulhando Dmytro em um estado de profundo trauma.', LogType.Result);
                        }
                    }
                },
                normalResultPath: null
            },
            {
                buttonText: 'Fugir',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: () => {
                    this._game.characterManager.characterDmytro.looseSanity(7);
                    this._game.log.addTempLog('Dmytro tenta fugir dos gritos, mas eles continuam a ecoar em sua mente, deteriorando sua sanidade.', LogType.Result);
                }
            },
            EventType.Psychological,
            this._game.characterManager.characterDmytro
        ));

        return events;
    }
}