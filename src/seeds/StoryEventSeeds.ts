import { Event, EventType } from '../entities/Event';
import { Game } from '../Game';
import { LogType } from '../managers/LogManager';
import { Difficulties } from '../enums/Difficulties';
import { Character } from '../entities/Character';

/**
 * Eventos estruturais: o refúgio no Palácio Energetik
 * (a calmaria antes do fim) e o clímax na fronteira.
 */
export class StoryEventSeeds {
    private static _game: Game;

    public static createStoryEvents(): Event[] {
        this._game = Game.getInstance();
        return [this.createPalaceRefugeEvent(), this.createBorderCrossingEvent()];
    }

    private static createPalaceRefugeEvent(): Event {
        return new Event(
            'Palácio.',
            'Paredes grossas. Um piano.',
            'placePalaceCulture',
            {
                buttonText: 'Descansar',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: () => {
                    this._game.characterManager.getCharactersAlive().forEach((character: Character) => {
                        character.increaseSanity(15);
                    });
                    this._game.log.addTempLog('Três músicas. Uma hora de paz. +15 para todos.', LogType.Result);
                    this._game.log.addTempLog('Amanhã: a fronteira.', LogType.Result);
                }
            },
            {
                buttonText: 'Vasculhar',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: null,
                opensItemPicker: true
            },
            EventType.Place,
            null as any
        );
    }

    private static createBorderCrossingEvent(): Event {
        return new Event(
            'Fronteira.',
            'O rio congelado. O outro lado.',
            'placeFrozenRiver',
            {
                buttonText: 'Cruzar o gelo',
                skillCheck: true,
                skillCheckFields: {
                    difficulty: Difficulties.CHALLENGING,
                    canGiveItems: false,
                    resultPath: {
                        success: () => {
                            this._game.characterManager.getCharactersAlive().forEach((character: Character) => {
                                character.increaseSanity(10);
                            });
                            this._game.state.setGameOverMessage(
                                'O gelo range. Sustenta. Um por um — a margem norte.',
                                true
                            );
                            this._game.state.setPendingExplorationVictory(true);
                        },
                        failure: () => {
                            const dmytro = this._game.characterManager.characterDmytro;
                            const companions = this._game.characterManager.getCharactersAlive()
                                .filter((character: Character) => character !== dmytro);

                            dmytro.looseSanity(45);

                            if (companions.length > 0) {
                                const unlucky = companions[this._game.state.getRandomArbitrary(companions.length)];
                                unlucky.looseSanity(45);
                            }

                            if (!dmytro.isDead) {
                                this._game.state.setGameOverMessage(
                                    'O gelo cede. Mãos na água preta. A margem, enfim. Nem todos inteiros.',
                                    true
                                );
                                this._game.state.setPendingExplorationVictory(true);
                            }
                        }
                    }
                },
                normalResultPath: null
            },
            {
                buttonText: 'Esperar',
                skillCheck: true,
                skillCheckFields: {
                    difficulty: Difficulties.MEDIUM,
                    canGiveItems: false,
                    resultPath: {
                        success: () => {
                            this._game.state.setGameOverMessage(
                                'A espera compensa. Na hora mais escura, a família cruza a cancela. Juntos.',
                                true
                            );
                            this._game.state.setPendingExplorationVictory(true);
                        },
                        failure: () => {
                            const dmytro = this._game.characterManager.characterDmytro;
                            const others = this._game.characterManager.getCharactersAlive()
                                .filter((character: Character) => character !== dmytro);

                            others.forEach((character: Character) => character.looseSanity(15));
                            dmytro.looseSanity(15);

                            if (!dmytro.isDead) {
                                this._game.state.setGameOverMessage(
                                    'Holofotes. Correria no escuro. A cancela — atravessada. Por pouco.',
                                    true
                                );
                                this._game.state.setPendingExplorationVictory(true);
                            }
                        }
                    }
                },
                normalResultPath: null
            },
            EventType.Exploration,
            this._game.characterManager.characterDmytro
        );
    }
}
