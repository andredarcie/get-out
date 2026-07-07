import { Event, EventType } from '../entities/Event';
import { Game } from '../Game';
import { LogType } from '../managers/LogManager';
import { Difficulties } from '../enums/Difficulties';

/**
 * Arco de Dmytro — o pai. Tema: culpa.
 * Lugares: Bloco Kurchatov, Correios, Escola 4, Casa 17.
 */
export class DmytroEventSeeds {
    private static _game: Game;

    public static createDmytroEvents(): Event[] {
        this._game = Game.getInstance();
        let events: Event[] = [];

        events.push(new Event(
            'Escombros.',
            'Quatro corpos. Quatro mochilas.',
            'placeApartmentBlock',
            {
                buttonText: 'Olhar',
                skillCheck: true,
                skillCheckFields: {
                    difficulty: Difficulties.MEDIUM,
                    canGiveItems: false,
                    resultPath: {
                        success: () => {
                            this._game.characterManager.characterDmytro.increaseSanity(15);
                            this._game.log.addTempLog('Dmytro: força. +15', LogType.Result);
                        },
                        failure: () => {
                            const dmg = this._game.characterManager.applyCheckFailure(this._game.characterManager.characterDmytro, 18, 'Ansiedade');
                            this._game.log.addTempLog(`Dmytro: Ansiedade. −${dmg}`, LogType.Result);
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
                    this._game.characterManager.applyAvoidCost(this._game.characterManager.characterDmytro);
                    this._game.log.addTempLog('Dmytro desvia. Os quatro seguem. −10 · grupo −4', LogType.Result);
                }
            },
            EventType.Psychological,
            this._game.characterManager.characterDmytro
        ));

        events.push(new Event(
            'Espelho.',
            'Um rosto rachado. Quase o seu.',
            'placePostOffice',
            {
                buttonText: 'Encarar',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: () => {
                    this._game.characterManager.applyAvoidCost(this._game.characterManager.characterDmytro);
                    this._game.log.addTempLog('Dmytro encara. Nomes voltam. −10 · grupo −4', LogType.Result);
                }
            },
            {
                buttonText: 'Desviar',
                skillCheck: true,
                skillCheckFields: {
                    difficulty: Difficulties.MEDIUM,
                    canGiveItems: false,
                    resultPath: {
                        success: () => {
                            this._game.characterManager.characterDmytro.increaseSanity(15);
                            this._game.log.addTempLog('Dmytro vira o espelho. «Depois.» +15', LogType.Result);
                        },
                        failure: () => {
                            const dmg = this._game.characterManager.applyCheckFailure(this._game.characterManager.characterDmytro, 18, 'Culpa');
                            this._game.log.addTempLog(`Dmytro: Culpa. −${dmg}`, LogType.Result);
                        }
                    }
                },
                normalResultPath: null
            },
            EventType.Psychological,
            this._game.characterManager.characterDmytro
        ));

        events.push(new Event(
            'Gritos.',
            'Recreio. Pátio vazio.',
            'placeSchool',
            {
                buttonText: 'Entrar',
                skillCheck: true,
                skillCheckFields: {
                    difficulty: Difficulties.CHALLENGING,
                    canGiveItems: false,
                    resultPath: {
                        success: () => {
                            this._game.characterManager.characterDmytro.increaseSanity(20);
                            this._game.log.addTempLog('Dmytro fica. O eco morre. +20', LogType.Result);
                        },
                        failure: () => {
                            const dmg = this._game.characterManager.applyCheckFailure(this._game.characterManager.characterDmytro, 32, 'Trauma');
                            this._game.log.addTempLog(`Dmytro: Trauma. −${dmg}`, LogType.Result);
                        }
                    }
                },
                normalResultPath: null
            },
            {
                buttonText: 'Contornar',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: () => {
                    this._game.characterManager.applyAvoidCost(this._game.characterManager.characterDmytro);
                    this._game.log.addTempLog('Os gritos seguem no vento. −10 · grupo −4', LogType.Result);
                }
            },
            EventType.Psychological,
            this._game.characterManager.characterDmytro
        ));

        events.push(new Event(
            'Casa.',
            'Porta trancada. Botas pequenas.',
            'placeApartmentInterior',
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
                    this._game.log.addTempLog('A casa fica. Inteira.', LogType.Result);
                }
            },
            EventType.Place,
            this._game.characterManager.characterDmytro
        ));

        return events;
    }
}
