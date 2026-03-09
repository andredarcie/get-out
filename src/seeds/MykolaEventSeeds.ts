import { Event, EventType } from '../entities/Event';
import { Game } from '../Game';
import { LogType } from '../managers/LogManager';
import { Difficulties } from '../enums/Difficulties';

export class MykolaEventSeeds {
    private static _game: Game;

    public static createMykolaEvents(): Event[] {
        this._game = Game.getInstance();
        let events: Event[] = [];

        events.push(new Event(
            'Eco de Choro',
            'Mykola ouve ecos de um choro distante, que ressoam como um reflexo de sua própria dor.',
            'img4',
            {
                buttonText: 'Confrontar',
                skillCheck: true,
                skillCheckFields: {
                    difficulty: Difficulties.MEDIUM,
                    canGiveItems: false,
                    resultPath: {
                        success: () => {
                            this._game.characterManager.characterMykola.increaseSanity(5);
                            this._game.log.addTempLog('Mykola reúne coragem para confrontar os ecos, encontrando um breve alívio em sua mente.', LogType.Result);
                        },
                        failure: () => {
                            this._game.characterManager.characterMykola.looseSanity(15);
                            this._game.characterManager.makeSomeoneInTheGroupGetStatus('Mykola', 'Pânico');
                            this._game.log.addTempLog('Os ecos são demais para Mykola, mergulhando-o em um estado de pânico incontrolável.', LogType.Result);
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
                    this._game.characterManager.characterMykola.looseSanity(5);
                    this._game.log.addTempLog('Mykola tenta escapar dos sons, mas eles continuam a persegui-lo, minando sua sanidade.', LogType.Result);
                }
            },
            EventType.Psychological,
            this._game.characterManager.characterMykola
        ));

        events.push(new Event(
            'Companheiro Imaginário',
            'Mykola começa a falar com alguém que ninguém mais vê, buscando conforto em uma presença imaginária.',
            'themePark',
            {
                buttonText: 'Enfrentar',
                skillCheck: true,
                skillCheckFields: {
                    difficulty: Difficulties.MEDIUM,
                    canGiveItems: false,
                    resultPath: {
                        success: () => {
                            this._game.characterManager.characterMykola.increaseSanity(5);
                            this._game.log.addTempLog('Mykola reconhece a ilusão e consegue encontrar um pouco de equilíbrio, recuperando parte de sua sanidade.', LogType.Result);
                        },
                        failure: () => {
                            this._game.characterManager.characterMykola.looseSanity(10);
                            this._game.characterManager.makeSomeoneInTheGroupGetStatus('Mykola', 'Alucinações');
                            this._game.log.addTempLog('Mykola perde o controle sobre a realidade, mergulhando em alucinações cada vez mais intensas.', LogType.Result);
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
                    this._game.characterManager.characterMykola.looseSanity(5);
                    this._game.log.addTempLog('Mykola tenta ignorar a presença imaginária, mas a sensação de solidão o consome, corroendo sua sanidade.', LogType.Result);
                }
            },
            EventType.Psychological,
            this._game.characterManager.characterMykola
        ));

        events.push(new Event(
            'Caminho Sem Volta',
            'Mykola encontra um caminho sombrio e desconhecido, que parece não ter fim.',
            'img7',
            {
                buttonText: 'Pressão',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: () => {
                    this._game.characterManager.characterMykola.looseSanity(5);
                    this._game.log.addTempLog('Mykola sente a pressão do caminho interminável, perdendo um pouco de sua sanidade ao avançar por ele.', LogType.Result);
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
                            this._game.characterManager.characterMykola.increaseSanity(5);
                            this._game.log.addTempLog('Mykola avança com cautela, conseguindo manter sua mente focada e recuperar um pouco de sanidade.', LogType.Result);
                        },
                        failure: () => {
                            this._game.characterManager.characterMykola.looseSanity(10);
                            this._game.characterManager.makeSomeoneInTheGroupGetStatus('Mykola', 'Ansiedade');
                            this._game.log.addTempLog('O medo do desconhecido toma conta de Mykola, provocando uma crise de ansiedade.', LogType.Result);
                        }
                    }
                },
                normalResultPath: null
            },
            EventType.Psychological,
            this._game.characterManager.characterMykola
        ));

        events.push(new Event(
            'Mochila no Caminho',
            'Mykola tropeça em uma mochila militar abandonada na estrada. Está suja de lama e parcialmente aberta. O que quer que esteja lá dentro ainda pode ser útil.',
            'img7',
            {
                buttonText: 'Investigate',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: null
            },
            {
                buttonText: 'Não tocar',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: () => {
                    this._game.log.addTempLog('Mykola olha para a mochila por um longo momento, depois desvia o olhar e continua andando.', LogType.Result);
                }
            },
            EventType.Place,
            this._game.characterManager.characterMykola
        ));

        return events;
    }
}