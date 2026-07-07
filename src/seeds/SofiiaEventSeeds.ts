import { Event, EventType } from '../entities/Event';
import { Game } from '../Game';
import { LogType } from '../managers/LogManager';
import { Difficulties } from '../enums/Difficulties';

/**
 * Arco de Sofiia — a filha. Tema: memória.
 * Lugares: Jardim Lastivka, Praça da Cultura, Roda-Gigante, Viaduto Leste.
 */
export class SofiiaEventSeeds {
    private static _game: Game;

    public static createSofiiaEvents(): Event[] {
        this._game = Game.getInstance();
        let events: Event[] = [];

        events.push(new Event(
            'Mural.',
            'Rostos conhecidos. Nomes fugindo.',
            'placeMural',
            {
                buttonText: 'Recitar',
                skillCheck: true,
                skillCheckFields: {
                    difficulty: Difficulties.MEDIUM,
                    canGiveItems: false,
                    resultPath: {
                        success: () => {
                            this._game.characterManager.characterSofiia.increaseSanity(15);
                            this._game.log.addTempLog('Katya. Yulia. Vira. +15', LogType.Result);
                        },
                        failure: () => {
                            const dmg = this._game.characterManager.applyCheckFailure(this._game.characterManager.characterSofiia, 18, 'Isolamento');
                            this._game.log.addTempLog(`Sofiia: Isolamento. −${dmg}`, LogType.Result);
                        }
                    }
                },
                normalResultPath: null
            },
            {
                buttonText: 'Passar',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: () => {
                    this._game.characterManager.applyAvoidCost(this._game.characterManager.characterSofiia);
                    this._game.log.addTempLog('De cabeça baixa. −10 · grupo −4', LogType.Result);
                }
            },
            EventType.Psychological,
            this._game.characterManager.characterSofiia
        ));

        events.push(new Event(
            'Sombras.',
            'No fim da rua. Mais perto.',
            'placeCentralSquare',
            {
                buttonText: 'Aproximar',
                skillCheck: true,
                skillCheckFields: {
                    difficulty: Difficulties.CHALLENGING,
                    canGiveItems: false,
                    resultPath: {
                        success: () => {
                            this._game.characterManager.characterSofiia.increaseSanity(20);
                            this._game.log.addTempLog('Casacos num varal. Riso. +20', LogType.Result);
                        },
                        failure: () => {
                            const dmg = this._game.characterManager.applyCheckFailure(this._game.characterManager.characterSofiia, 32, 'Medo');
                            this._game.log.addTempLog(`Sofiia: Medo. −${dmg}`, LogType.Result);
                        }
                    }
                },
                normalResultPath: null
            },
            {
                buttonText: 'Desviar',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: () => {
                    this._game.characterManager.applyAvoidCost(this._game.characterManager.characterSofiia);
                    this._game.log.addTempLog('Sem olhar para trás. −10 · grupo −4', LogType.Result);
                }
            },
            EventType.Psychological,
            this._game.characterManager.characterSofiia
        ));

        events.push(new Event(
            'Roda.',
            'Nunca girou. O ingresso, guardado.',
            'placeFerrisWheel',
            {
                buttonText: 'Subir',
                skillCheck: true,
                skillCheckFields: {
                    difficulty: Difficulties.CHALLENGING,
                    canGiveItems: false,
                    resultPath: {
                        success: () => {
                            this._game.characterManager.characterSofiia.increaseSanity(20);
                            this._game.log.addTempLog('Lá do alto: o caminho. «A gente chega.» +20', LogType.Result);
                        },
                        failure: () => {
                            const dmg = this._game.characterManager.applyCheckFailure(this._game.characterManager.characterSofiia, 32, 'Desespero');
                            this._game.log.addTempLog(`Sofiia: Desespero. −${dmg}`, LogType.Result);
                        }
                    }
                },
                normalResultPath: null
            },
            {
                buttonText: 'Soltar',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: () => {
                    this._game.characterManager.applyAvoidCost(this._game.characterManager.characterSofiia);
                    this._game.log.addTempLog('Um enterro pequeno. De papel. −10 · grupo −4', LogType.Result);
                }
            },
            EventType.Psychological,
            this._game.characterManager.characterSofiia
        ));

        events.push(new Event(
            'Carro.',
            'Quatro portas abertas. Pressa.',
            'placeAbandonedCar',
            {
                buttonText: 'Vasculhar',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: null,
                opensItemPicker: true
            },
            {
                buttonText: 'Passar',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: () => {
                    this._game.log.addTempLog('«Que tenham conseguido.»', LogType.Result);
                }
            },
            EventType.Place,
            this._game.characterManager.characterSofiia
        ));

        return events;
    }
}
