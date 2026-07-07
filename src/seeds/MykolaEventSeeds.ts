import { Event, EventType } from '../entities/Event';
import { Game } from '../Game';
import { LogType } from '../managers/LogManager';
import { Difficulties } from '../enums/Difficulties';

/**
 * Arco de Mykola — o filho. Tema: infância interrompida.
 * Lugares: Creche Solnyshko, Parque do Rio, Passarela Férrea, Valeta Sul.
 */
export class MykolaEventSeeds {
    private static _game: Game;

    public static createMykolaEvents(): Event[] {
        this._game = Game.getInstance();
        let events: Event[] = [];

        events.push(new Event(
            'Choro.',
            'Não há mais crianças aqui.',
            'placeKindergarten',
            {
                buttonText: 'Procurar',
                skillCheck: true,
                skillCheckFields: {
                    difficulty: Difficulties.MEDIUM,
                    canGiveItems: false,
                    resultPath: {
                        success: () => {
                            this._game.characterManager.characterMykola.increaseSanity(15);
                            this._game.log.addTempLog('Um brinquedo. Pilha fraca. +15', LogType.Result);
                        },
                        failure: () => {
                            const dmg = this._game.characterManager.applyCheckFailure(this._game.characterManager.characterMykola, 18, 'Pânico');
                            this._game.log.addTempLog(`Mykola: Pânico. −${dmg}`, LogType.Result);
                        }
                    }
                },
                normalResultPath: null
            },
            {
                buttonText: 'Ignorar',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: () => {
                    this._game.characterManager.applyAvoidCost(this._game.characterManager.characterMykola);
                    this._game.log.addTempLog('O choro segue junto. −10 · grupo −4', LogType.Result);
                }
            },
            EventType.Psychological,
            this._game.characterManager.characterMykola
        ));

        events.push(new Event(
            'Sasha.',
            'O balanço vazio range.',
            'placeRiverPark',
            {
                buttonText: 'Despedir',
                skillCheck: true,
                skillCheckFields: {
                    difficulty: Difficulties.CHALLENGING,
                    canGiveItems: false,
                    resultPath: {
                        success: () => {
                            this._game.characterManager.characterMykola.increaseSanity(20);
                            this._game.log.addTempLog('«Chega bem, Sasha.» +20', LogType.Result);
                        },
                        failure: () => {
                            const dmg = this._game.characterManager.applyCheckFailure(this._game.characterManager.characterMykola, 32, 'Alucinações');
                            this._game.log.addTempLog(`Mykola: Alucinações. −${dmg}`, LogType.Result);
                        }
                    }
                },
                normalResultPath: null
            },
            {
                buttonText: 'Fingir',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: () => {
                    this._game.characterManager.applyAvoidCost(this._game.characterManager.characterMykola);
                    this._game.log.addTempLog('Ninguém pergunta. −10 · grupo −4', LogType.Result);
                }
            },
            EventType.Psychological,
            this._game.characterManager.characterMykola
        ));

        events.push(new Event(
            'Passarela.',
            'Doze metros. Tábuas faltando.',
            'placeRailwayBridge',
            {
                buttonText: 'Ir primeiro',
                skillCheck: true,
                skillCheckFields: {
                    difficulty: Difficulties.CHALLENGING,
                    canGiveItems: false,
                    resultPath: {
                        success: () => {
                            this._game.characterManager.characterMykola.increaseSanity(20);
                            this._game.log.addTempLog('O filho guia o pai. +20', LogType.Result);
                        },
                        failure: () => {
                            const dmg = this._game.characterManager.applyCheckFailure(this._game.characterManager.characterMykola, 32, 'Ansiedade');
                            this._game.log.addTempLog(`Mykola: Ansiedade. −${dmg}`, LogType.Result);
                        }
                    }
                },
                normalResultPath: null
            },
            {
                buttonText: 'No meio',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: () => {
                    this._game.characterManager.applyAvoidCost(this._game.characterManager.characterMykola);
                    this._game.log.addTempLog('Agarrado aos ombros. −10 · grupo −4', LogType.Result);
                }
            },
            EventType.Psychological,
            this._game.characterManager.characterMykola
        ));

        events.push(new Event(
            'Mochila.',
            'Militar. Meio aberta.',
            'placeTrench',
            {
                buttonText: 'Vasculhar',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: null,
                opensItemPicker: true
            },
            {
                buttonText: 'Não tocar',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: () => {
                    this._game.log.addTempLog('Algumas histórias ficam fechadas.', LogType.Result);
                }
            },
            EventType.Place,
            this._game.characterManager.characterMykola
        ));

        return events;
    }
}
