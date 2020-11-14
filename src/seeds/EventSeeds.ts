import { Character } from '../entities/Character';
import { Event, EventType } from '../entities/Event';
import { Item } from '../entities/Item';
import { Game } from '../Game';
import { ItemSeeds } from '../seeds/ItemSeeds'
import { LogType } from '../managers/LogManager';
import { DiceManager } from '../managers/DiceManager';
import { Dice } from '../entities/Dice';

export class EventSeeds {
    private _events: Event[];
    private _game: Game;
    private _imageUrlList: string[] = [];

    constructor() {
        this._game = Game.getInstance();

        for (let i = 0; i < 8; i++) {
            this._imageUrlList[i] = (document.getElementById("event-page-image-" + (i + 1)) as HTMLImageElement).src;
        }

        this._events = [];
    }

    start() {
        this.events.push(new Event(
            'Wild Wolf Appeared',
            'He jumps furiously wanting blood!', 
            '',
            { 
                buttonText: 'Throw a stone',
                callback: () => {
                    this._game.log.addTempLog('You hit the rock and killed the wolf!', LogType.Result);
                }
            },
            { 
                buttonText: 'Run like a chicken',
                callback: () => {
                    this._game.log.addTempLog('Did you get away', LogType.Result);
                }
            },
            EventType.Combat,
            null
        ));
    }

    get events() {
        return this._events;
    }

    public getPlaceEvent() {
        let names: string[] = [
            'Abandoned warehouse',
            'Strange building',
            'Very old house',
            'Abandoned supermarket',
            'Bus stop',
            'Abandoned hospital',
            'Abandoned Department Store',
            'Strange Fire department',
            'Musem',
            'Very old Mall',
            'School',
            'Movie Theater',
            'Very old Video Store',
            'Abandoned Police Station'
        ];

        let exploreSynonyms: string[] = [
            'Explore',
            'Inspect',
            'Investigate',
            'Search',
            'Take a look at'
        ];

        let messagesWhenYouFoundNothing: string[] = [
            'You didnt find anything useful',
            'You find a lot of useless garbage',
            'Nothing important was found',
            'Unfortunately this place was totally empty',
            'Looks like someone already got everything they had here',
            'All things are burned, nothing can be recovered'
        ];

        const eventName: string = names[this._game.getRandomArbitrary(names.length - 1)];
        const exploreButtonText: string = exploreSynonyms[this._game.getRandomArbitrary(exploreSynonyms.length - 1)];
        const messageWhenYouFoundNothing: string = messagesWhenYouFoundNothing[this._game.getRandomArbitrary(messagesWhenYouFoundNothing.length - 1)];
        const imageUrl: string = this._imageUrlList[this._game.getRandomArbitrary(this._imageUrlList.length - 2)];

        return new Event(
            eventName,
            'No sign of life', 
            imageUrl,
            { 
                buttonText: exploreButtonText,
                callback: () => {
                    const maxItems: number = 4;
                    let randomNumber: number = this._game.getRandomArbitrary(maxItems);

                    if (randomNumber <= 0) {
                        this._game.log._successResult.style.display = 'none';
                        this._game.log._failureResult.style.display = 'inline';
                        this._game.log.addTempLog(messageWhenYouFoundNothing, LogType.Result);  
                    } else {
                        this._game.log._successResult.style.display = 'inline';
                        this._game.log._failureResult.style.display = 'none';
                        for (let i = 0; i < randomNumber; i++) {
                            let itemFounded: Item = ItemSeeds.getOneRandomItem();
                            var character: Character = this._game.characterManager.picksACharacterAtRandom();
                            this._game.log.addTempLog(character.name + ' have found ' + itemFounded.name, LogType.Result);
                            this._game.bagManager.putItem(itemFounded);
                        }
                    }         
                }
            },
            { 
                buttonText: 'Ignore',
                callback: () => {
                    this._game.log.addTempLog('You just ignored', LogType.Result);
                }
            },
            EventType.Place,
            null
        )
    }

    public getCombatEvent() {
        let enemies: string[] = [
            'Wolf',
            'Timberwolf',
            'Bear',
            'Mercenary',
            'Bandit'
        ];

        let dice = new Dice();

        const enemy: string = enemies[this._game.getRandomArbitrary(enemies.length - 1)];
        let diceManager = new DiceManager();
        let enemyDificultie = 10;
        diceManager.getDifficultLevel(enemyDificultie);

        return new Event(
            'Furious wolf appeared!',
            'You are in trouble',
            this._imageUrlList[6],
            {
                buttonText: 'Fight [' + diceManager.getDifficultLevel(enemyDificultie) + ': ' + enemyDificultie + ']',
                callback: () => {
                    // Capacidade do ethan 2
                    let ethanStrength = 6;

                    let diceOneNumber = dice.roll();
                    let diceTwoNumber = dice.roll();
                    let final = diceOneNumber + diceTwoNumber + ethanStrength;

                    if (diceOneNumber + diceTwoNumber == 12) {
                        this._game.log.setCriticalSuccess();
                        this._game.log.addTempLog('Dices: (' + diceOneNumber + '/6) + (' + diceTwoNumber + '/6)', LogType.Result);
                        this._game.log.addTempLog('You defeated the wolf easily', LogType.Result);
                        return;
                    }

                    if (diceOneNumber + diceTwoNumber == 2) {
                        this._game.log.setCriticalFailure();
                        this._game.log.addTempLog('Dices: (' + diceOneNumber + '/6) + (' + diceTwoNumber + '/6)', LogType.Result);
                        this._game.log.addTempLog('The wolf left you devastated', LogType.Result);
                        this._game.characterManager.decreasesTheHealthOfSomeoneInTheGroup();
                        this._game.characterManager.decreasesTheHealthOfSomeoneInTheGroup();
                        return;
                    }
                    
                    this._game.log.addTempLog('Expected: ' + enemyDificultie, LogType.Result);
                    this._game.log.addTempLog('Dices: (' + diceOneNumber + '/6) + (' + diceTwoNumber + '/6) + Strength: ' + ethanStrength + ' = ' + final, LogType.Result);

                    if (final >= enemyDificultie) {
                        this._game.log.setSuccess();
                        this._game.log.addTempLog('With a lot of struggle you beat the wolf', LogType.Result);
                    } else {
                        this._game.log.setFailure();
                        this._game.log.addTempLog('The wolf has hurt you', LogType.Result);
                        this._game.characterManager.decreasesTheHealthOfSomeoneInTheGroup();
                    }
                }
            },
            {
                buttonText: 'Try to escape',
                callback: () => {
                    this._game.log.addTempLog('You just ignored', LogType.Result);
                }
            },
            EventType.Combat,
            null
        );
    }

    public getMileStoneEvent(): Event {
        return new Event('Milestone Reached! ',
        this._game.distanceToTheBorder + ' miles to the border',
        this._imageUrlList[7],
        {
            buttonText: 'Back to travel',
            callback: () => {}
        },
        {
            buttonText: 'Back to travel',
            callback: () => {}
        },
        EventType.Exploration, null
        );
    }
}