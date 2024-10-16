import { Event, EventType } from '../entities/Event';
import { Game } from '../Game';
import { LogType } from '../managers/LogManager';
import { Difficulties } from '../enums/Difficulties';

export class SofiiaEventSeeds {
    private static _game: Game;

    public static createSofiiaEvents(): Event[] {
        this._game = Game.getInstance();
        let events: Event[] = [];

        events.push(new Event(
            'Rostos Esquecidos',
            'Sofiia é assombrada por rostos que não consegue mais lembrar, como se as memórias estivessem desaparecendo de sua mente.',
            '',
            {
                buttonText: 'Esperança',
                skillCheck: true,
                skillCheckFields: {
                    difficulty: Difficulties.MEDIUM,
                    canGiveItems: false,
                    resultPath: {
                        success: () => {
                            this._game.characterManager.characterSofiia.increaseSanity(10);
                            this._game.log.addTempLog('Sofiia se agarra à esperança de que as memórias perdidas retornem, recuperando parte de sua sanidade.', LogType.Result);
                        },
                        failure: () => {
                            this._game.characterManager.characterSofiia.looseSanity(15);
                            this._game.characterManager.makeSomeoneInTheGroupGetStatus('Sofiia', 'Isolamento');
                            this._game.log.addTempLog('A sensação de perda é esmagadora para Sofiia, que se afasta cada vez mais dos outros, sentindo-se isolada.', LogType.Result);
                        }
                    }
                },
                normalResultPath: null
            },
            {
                buttonText: 'Desespero',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: () => {
                    this._game.characterManager.characterSofiia.looseSanity(5);
                    this._game.log.addTempLog('Sofiia cede ao desespero ao perceber que as memórias estão se esvaindo, perdendo parte de sua sanidade.', LogType.Result);
                }
            },
            EventType.Psychological,
            this._game.characterManager.characterSofiia
        ));

        events.push(new Event(
            'Sombras no Horizonte',
            'Sofiia vê sombras misteriosas ao longe, que parecem se aproximar lentamente, trazendo uma sensação de medo.',
            '',
            {
                buttonText: 'Confrontar',
                skillCheck: true,
                skillCheckFields: {
                    difficulty: Difficulties.MEDIUM,
                    canGiveItems: false,
                    resultPath: {
                        success: () => {
                            this._game.characterManager.characterSofiia.increaseSanity(5);
                            this._game.log.addTempLog('Sofiia enfrenta as sombras com coragem, recuperando parte de sua sanidade.', LogType.Result);
                        },
                        failure: () => {
                            this._game.characterManager.characterSofiia.looseSanity(10);
                            this._game.characterManager.makeSomeoneInTheGroupGetStatus('Sofiia', 'Medo');
                            this._game.log.addTempLog('O confronto com as sombras é demais para Sofiia, que sucumbe ao medo crescente.', LogType.Result);
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
                    this._game.characterManager.characterSofiia.looseSanity(5);
                    this._game.log.addTempLog('Sofiia tenta escapar das sombras, mas o medo a persegue, corroendo sua sanidade.', LogType.Result);
                }
            },
            EventType.Psychological,
            this._game.characterManager.characterSofiia
        ));

        events.push(new Event(
            'Esperança Quebrada',
            'Sofiia vê sua esperança desmoronar diante dos desafios que parecem insuperáveis.',
            '',
            {
                buttonText: 'Esperança',
                skillCheck: true,
                skillCheckFields: {
                    difficulty: Difficulties.MEDIUM,
                    canGiveItems: false,
                    resultPath: {
                        success: () => {
                            this._game.characterManager.characterSofiia.increaseSanity(10);
                            this._game.log.addTempLog('Sofiia se agarra a um fio de esperança, encontrando força para seguir em frente e recuperar parte de sua sanidade.', LogType.Result);
                        },
                        failure: () => {
                            this._game.characterManager.characterSofiia.looseSanity(15);
                            this._game.characterManager.makeSomeoneInTheGroupGetStatus('Sofiia', 'Desespero');
                            this._game.log.addTempLog('A esperança de Sofiia se despedaça, e ela é tomada por um profundo desespero.', LogType.Result);
                        }
                    }
                },
                normalResultPath: null
            },
            {
                buttonText: 'Desespero',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: () => {
                    this._game.characterManager.characterSofiia.looseSanity(5);
                    this._game.log.addTempLog('Sofiia sucumbe ao desespero, vendo sua sanidade lentamente se esvair.', LogType.Result);
                }
            },
            EventType.Psychological,
            this._game.characterManager.characterSofiia
        ));

        return events;
    }
}
