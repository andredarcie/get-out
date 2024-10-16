import { Event, EventType } from '../entities/Event';
import { Game } from '../Game';
import { LogType } from '../managers/LogManager';
import { Difficulties } from '../enums/Difficulties';

export class OlenaEventSeeds {
    private static _game: Game;

    public static createOlenaEvents(): Event[] {
        this._game = Game.getInstance();
        let events: Event[] = [];

        events.push(new Event(
            'Olhos no Escuro',
            'Olena sente que algo a observa na escuridão, como se olhos invisíveis a seguissem por onde passa.',
            '',
            {
                buttonText: 'Enfrentar',
                skillCheck: true,
                skillCheckFields: {
                    difficulty: Difficulties.MEDIUM,
                    canGiveItems: false,
                    resultPath: {
                        success: () => {
                            this._game.characterManager.characterOlena.increaseSanity(5);
                            this._game.log.addTempLog('Olena encara os olhos imaginários na escuridão, recuperando um pouco de sua sanidade.', LogType.Result);
                        },
                        failure: () => {
                            this._game.characterManager.characterOlena.looseSanity(10);
                            this._game.characterManager.makeSomeoneInTheGroupGetStatus('Olena', 'Paranoia');
                            this._game.log.addTempLog('A presença invisível se torna insuportável para Olena, levando-a a um estado de paranoia constante.', LogType.Result);
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
                    this._game.characterManager.characterOlena.looseSanity(5);
                    this._game.log.addTempLog('Olena tenta ignorar os olhos na escuridão, mas a sensação de ser observada persiste, minando sua sanidade.', LogType.Result);
                }
            },
            EventType.Psychological,
            this._game.characterManager.characterOlena
        ));

        events.push(new Event(
            'Sussurros dos Mortos',
            'Olena ouve sussurros que parecem vir do além, trazendo mensagens que ela não consegue decifrar.',
            '',
            {
                buttonText: 'Esperança',
                skillCheck: true,
                skillCheckFields: {
                    difficulty: Difficulties.MEDIUM,
                    canGiveItems: false,
                    resultPath: {
                        success: () => {
                            this._game.characterManager.characterOlena.increaseSanity(10);
                            this._game.log.addTempLog('Olena se apega a uma esperança tênue ao interpretar os sussurros como um sinal positivo, recuperando parte de sua sanidade.', LogType.Result);
                        },
                        failure: () => {
                            this._game.characterManager.characterOlena.looseSanity(15);
                            this._game.characterManager.makeSomeoneInTheGroupGetStatus('Olena', 'Desespero');
                            this._game.log.addTempLog('Os sussurros se tornam um peso insuportável para Olena, mergulhando-a em um profundo desespero.', LogType.Result);
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
                    this._game.characterManager.characterOlena.looseSanity(7);
                    this._game.log.addTempLog('Olena cede ao desespero que os sussurros trazem, perdendo ainda mais de sua sanidade.', LogType.Result);
                }
            },
            EventType.Psychological,
            this._game.characterManager.characterOlena
        ));

        events.push(new Event(
            'Silêncio Mortal',
            'Olena se depara com um silêncio absoluto, um vazio que parece engolir todos os sons ao seu redor.',
            '',
            {
                buttonText: 'Pressão',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: () => {
                    this._game.characterManager.characterOlena.looseSanity(5);
                    this._game.log.addTempLog('O silêncio opressor faz com que Olena se sinta cada vez mais isolada, diminuindo sua sanidade.', LogType.Result);
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
                            this._game.characterManager.characterOlena.increaseSanity(5);
                            this._game.log.addTempLog('Olena mantém a calma diante do silêncio, conseguindo encontrar um ponto de equilíbrio em meio ao vazio.', LogType.Result);
                        },
                        failure: () => {
                            this._game.characterManager.characterOlena.looseSanity(10);
                            this._game.characterManager.makeSomeoneInTheGroupGetStatus('Olena', 'Depressão');
                            this._game.log.addTempLog('O vazio do silêncio consome Olena, levando-a a um estado de depressão profunda.', LogType.Result);
                        }
                    }
                },
                normalResultPath: null
            },
            EventType.Psychological,
            this._game.characterManager.characterOlena
        ));

        return events;
    }
}
