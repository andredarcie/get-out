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
            'Dmytro depara-se com os corpos de uma família, soterrados nos escombros de uma casa destruída. A visão traz um eco de dor e desolação, como se as paredes dilaceradas daquele lar sussurrassem segredos de vidas interrompidas. A imagem crava-se em sua mente, e o medo do mesmo destino para sua própria família transforma-se em um peso opressor, como se o céu desabasse sobre seus ombros.',
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
                            this._game.log.addTempLog('Dmytro encontra força em sua alma exausta, encarando o terror com uma chama trêmula de coragem, e por um instante, a escuridão recua, devolvendo-lhe um fragmento de paz.', LogType.Result);
                        },
                        failure: () => {
                            this._game.characterManager.characterDmytro.looseSanity(10);
                            this._game.characterManager.makeSomeoneInTheGroupGetStatus('Dmytro', 'Ansiedade');
                            this._game.log.addTempLog('A visão é um golpe demasiado cruel para sua mente já ferida, e a imagem dos corpos assombra cada recanto de seus pensamentos, lançando-o em um abismo de ansiedade.', LogType.Result);
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
                    this._game.log.addTempLog('Dmytro desvia o olhar, mas a sombra daqueles rostos segue-o, como uma cicatriz na memória, corroendo sua sanidade com a persistência de um veneno invisível.', LogType.Result);
                    this._game.log.addTempLog('Dmytro se ajoelha no solo frio, e lágrimas amargas escorrem de seus olhos enquanto ele é consumido por um lamento silencioso.', LogType.Result);
                }
            },
            EventType.Psychological,
            this._game.characterManager.characterDmytro
        ));

        events.push(new Event(
            'O Velho Espelho',
            'Dmytro encontra um espelho rachado, um fragmento do passado que reflete não apenas seu rosto cansado, mas os fantasmas daqueles que ele não conseguiu salvar. As fissuras no vidro parecem traçar as linhas de sua própria culpa, um labirinto sem saída que o aprisiona em suas falhas.',
            '',
            {
                buttonText: 'Pressão',
                skillCheck: false,
                skillCheckFields: null,
                normalResultPath: () => {
                    this._game.characterManager.characterDmytro.looseSanity(5);
                    this._game.log.addTempLog('Ao encarar o espelho, Dmytro sente-se afundar sob o peso de cada reflexo, cada rosto perdido que retorna para assombrá-lo, roubando-lhe mais um pouco de sua sanidade.', LogType.Result);
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
                            this._game.log.addTempLog('Dmytro desvia o olhar a tempo, fechando a porta para os espectros que o espelho convocava, recuperando uma pequena parte de si mesmo no processo.', LogType.Result);
                        },
                        failure: () => {
                            this._game.characterManager.characterDmytro.looseSanity(10);
                            this._game.characterManager.makeSomeoneInTheGroupGetStatus('Dmytro', 'Culpa');
                            this._game.log.addTempLog('O reflexo fragmentado invade sua mente, e Dmytro é incapaz de evitar a torrente de culpa que o consome, como um rio subterrâneo que devora a terra por dentro.', LogType.Result);
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
            'Dmytro ouve gritos ao longe, ecos de um massacre há muito ocorrido, mas que ainda ressoam como espectros em sua mente. Cada som é uma lâmina cortante, um chamado que rasga a calma da noite e o arrasta de volta às memórias que ele tenta enterrar.',
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
                            this._game.log.addTempLog('Dmytro enfrenta os gritos com uma força que ele não sabia possuir, transpondo as barreiras do medo e emergindo um pouco mais forte, como um sobrevivente que encontra luz em meio à devastação.', LogType.Result);
                        },
                        failure: () => {
                            this._game.characterManager.characterDmytro.looseSanity(15);
                            this._game.characterManager.makeSomeoneInTheGroupGetStatus('Dmytro', 'Trauma');
                            this._game.log.addTempLog('Os gritos são como garras invisíveis, cravando-se em sua mente, arrastando Dmytro para um vórtice de lembranças e pesadelos, até que tudo que resta é um trauma irreparável.', LogType.Result);
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
                    this._game.log.addTempLog('Dmytro tenta fugir dos gritos, mas eles se entrelaçam ao vento, assombrando seus passos e corroendo sua mente com uma persistência maligna.', LogType.Result);
                }
            },
            EventType.Psychological,
            this._game.characterManager.characterDmytro
        ));

        return events;
    }
}
