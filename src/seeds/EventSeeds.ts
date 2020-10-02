import { Character } from '../entities/Character';
import { Event, EventType } from '../entities/Event';
import { Item } from '../entities/Item';
import { Game, GameStates } from '../Game';
import { ItemSeeds, ItemsNames } from '../seeds/ItemSeeds'

export class EventSeeds {
    private _events: Event[];
    private _game: Game;

    constructor() {
        this._game = Game.getInstance();

        this._events = [];
    }

    start() {
        this.events.push(new Event(
            'Wild Wolf Appeared',
            'He jumps furiously wanting blood!', 
            { 
                buttonText: 'Throw a stone',
                callback: () => {
                    this._game.log.addTempLog('You hit the rock and killed the wolf!');
                }
            },
            { 
                buttonText: 'Run like a chicken',
                callback: () => {
                    this._game.log.addTempLog('Did you get away');
                }
            },
            EventType.Combat,
            null
        ),
        new Event(
            'Strange woman',
            'She asks for some food', 
            { 
                buttonText: 'Give some food',
                callback: () => {
                    let itemExists: boolean = this._game.bagManager.checksIfAnItemExists('Food')

                    console.log(itemExists)
                    if (itemExists) {
                        this._game.bagManager.removeItem('Food')
                        this._game.log.addTempLog('She is very happy and thanks you');
                    } else {
                        this._game.log.addTempLog('You look for food in the bag and find nothing');
                        this._game.log.addTempLog('The woman says you are a liar because you have no food');
                        let character = this._game.characterManager.decreasesTheHealthOfSomeoneInTheGroup();
                        character.looseHealth(1);
                        this._game.log.addTempLog('The woman pulls out a gun and shoots ' + character.name);
                    }
                }
            },
            { 
                buttonText: 'Give her nothing',
                callback: () => {
                    this._game.log.addTempLog('She is very sad and says she will starve');
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
        ]

        const eventName: string = names[this._game.getRandomArbitrary(names.length - 1)];
        const exploreButtonText: string = exploreSynonyms[this._game.getRandomArbitrary(exploreSynonyms.length - 1)];
        const messageWhenYouFoundNothing: string = messagesWhenYouFoundNothing[this._game.getRandomArbitrary(messagesWhenYouFoundNothing.length - 1)];

        return new Event(
            eventName,
            'No sign of life', 
            { 
                buttonText: exploreButtonText,
                callback: () => {
                    const maxItems: number = 4;
                    let randomNumber: number = this._game.getRandomArbitrary(maxItems);

                    if (randomNumber <= 0) {
                        this._game.log.addTempLog(messageWhenYouFoundNothing);  
                    } else {
                        for (let i = 0; i < randomNumber; i++) {
                            let itemFounded: Item = ItemSeeds.getOneRandomItem();
                            var character: Character = this._game.characterManager.picksACharacterAtRandom();
                            this._game.log.addTempLog(character.name + ' have found ' + itemFounded.name);
                            this._game.bagManager.putItem(itemFounded);
                        }
                    }         
                }
            },
            { 
                buttonText: 'Ignore',
                callback: () => {
                    this._game.log.addTempLog('You just ignored');
                }
            },
            EventType.Place,
            null
        )
    }
}