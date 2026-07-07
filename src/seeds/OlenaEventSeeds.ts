import { Event, EventType } from '../entities/Event';
import { Game } from '../Game';
import { LogType } from '../managers/LogManager';
import { Difficulties } from '../enums/Difficulties';

/**
 * Arco de Olena — a esposa. Tema: vigilância.
 * Lugares: Hospital 2, Maternidade, Piscina Lazúrna, Farmácia Velha.
 */
export class OlenaEventSeeds {
    private static _game: Game;

    public static createOlenaEvents(): Event[] {
        this._game = Game.getInstance();
        let events: Event[] = [];

        events.push(new Event(
            'Olhos.',
            'O hospital observa.',
            'placeHospital',
            {
                buttonText: 'Encarar',
                skillCheck: true,
                skillCheckFields: {
                    difficulty: Difficulties.MEDIUM,
                    canGiveItems: false,
                    resultPath: {
                        success: () => {
                            this._game.characterManager.characterOlena.increaseSanity(15);
                            this._game.log.addTempLog('Olena encara. Nada. +15', LogType.Result);
                        },
                        failure: () => {
                            const dmg = this._game.characterManager.applyCheckFailure(this._game.characterManager.characterOlena, 18, 'Paranoia');
                            this._game.log.addTempLog(`Olena: Paranoia. −${dmg}`, LogType.Result);
                        }
                    }
                },
                normalResultPath: null
            },
            {
                buttonText: 'Apressar',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: () => {
                    this._game.characterManager.applyAvoidCost(this._game.characterManager.characterOlena);
                    this._game.log.addTempLog('Os olhos viajam junto. −10 · grupo −4', LogType.Result);
                }
            },
            EventType.Psychological,
            this._game.characterManager.characterOlena
        ));

        events.push(new Event(
            'Sussurros.',
            'O berçário canta baixinho.',
            'placeMaternity',
            {
                buttonText: 'Ouvir',
                skillCheck: true,
                skillCheckFields: {
                    difficulty: Difficulties.MEDIUM,
                    canGiveItems: false,
                    resultPath: {
                        success: () => {
                            this._game.characterManager.characterOlena.increaseSanity(15);
                            this._game.log.addTempLog('O primeiro choro de Sofiia. Aqui. +15', LogType.Result);
                        },
                        failure: () => {
                            const dmg = this._game.characterManager.applyCheckFailure(this._game.characterManager.characterOlena, 18, 'Desespero');
                            this._game.log.addTempLog(`Olena: Desespero. −${dmg}`, LogType.Result);
                        }
                    }
                },
                normalResultPath: null
            },
            {
                buttonText: 'Tapar',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: () => {
                    this._game.characterManager.applyAvoidCost(this._game.characterManager.characterOlena);
                    this._game.log.addTempLog('Memória não tem porta. −10 · grupo −4', LogType.Result);
                }
            },
            EventType.Psychological,
            this._game.characterManager.characterOlena
        ));

        events.push(new Event(
            'Silêncio.',
            'Denso. Com peso.',
            'placePool',
            {
                buttonText: 'Gritar',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: () => {
                    this._game.characterManager.applyAvoidCost(this._game.characterManager.characterOlena);
                    this._game.log.addTempLog('O eco volta sozinho. −10 · grupo −4', LogType.Result);
                }
            },
            {
                buttonText: 'Atravessar',
                skillCheck: true,
                skillCheckFields: {
                    difficulty: Difficulties.MEDIUM,
                    canGiveItems: false,
                    resultPath: {
                        success: () => {
                            this._game.characterManager.characterOlena.increaseSanity(15);
                            this._game.log.addTempLog('Um azulejo por vez. +15', LogType.Result);
                        },
                        failure: () => {
                            const dmg = this._game.characterManager.applyCheckFailure(this._game.characterManager.characterOlena, 18, 'Depressão');
                            this._game.log.addTempLog(`Olena: Depressão. −${dmg}`, LogType.Result);
                        }
                    }
                },
                normalResultPath: null
            },
            EventType.Psychological,
            this._game.characterManager.characterOlena
        ));

        events.push(new Event(
            'Farmácia.',
            'Saqueada. O fundo, não.',
            'placePharmacy',
            {
                buttonText: 'Vasculhar',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: null,
                opensItemPicker: true
            },
            {
                buttonText: 'Seguir',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: () => {
                    this._game.log.addTempLog('A porta fica encostada.', LogType.Result);
                }
            },
            EventType.Place,
            this._game.characterManager.characterOlena
        ));

        return events;
    }
}
