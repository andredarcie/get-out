import { Item } from './Item';
import { Skills } from '../enums/Skills';
import { Difficulties } from '../enums/Difficulties';
import { Difficult } from '../managers/DiceManager';
import { Character } from './Character';

export enum EventType {
    Exploration,
    Combat,
    Place,
    Psychological
}

export interface Choice {
    buttonText: string;
    skillCheck: boolean;
    skillCheckFields: SkillCheckFields | null;
    normalResultPath: any;
}

export interface SkillCheckFields {
    difficulty: Difficulties;
    difficult?: Difficult;
    canGiveItems: boolean;
    resultPath: SkillCheckResult | null;
}

interface SkillCheckResult {
    success: any,
    failure: any
}

export class Event {
    private _title: string;
    private _description: string;
    private _image: string;
    public firstChoice: Choice;
    public secondChoice: Choice;
    private _type: EventType;
    private _items: Item[] = [];
    private _character: Character;

    constructor(title: string, description: string, 
                image: string, firstChoice: Choice, secondChoice: Choice,
                type: EventType, character: Character, items?: Item[]) {
        this._title = title;
        this._description = description;
        this._image = image;

        this.firstChoice = firstChoice;
        this.secondChoice = secondChoice;

        this._type = type;
        this._items = items ?? [];

        this._character = character;
    }

    get title() {
        return this._title;
    }

    get subtitle() {
        return this._subtitle;
    }

    get description() {
        return this._description;
    }

    get image() {
        return this._image;
    }

    get type() {
        return this._type;
    }

    get items() {
        return this._items;
    }

    willGiveItems(): boolean {
        return this._items ? this._items.length > 0 : false;
    }
}