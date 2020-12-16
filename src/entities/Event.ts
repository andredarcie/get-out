import { Item } from './Item';
import { Skills } from '../enums/Skills';
import { Difficulties } from '../enums/Difficulties';
import { Difficult } from '../managers/DiceManager';

export enum EventType {
    Exploration,
    Combat,
    Place
}

export interface Choice {
    buttonText: string;
    skillCheck: boolean;
    skillCheckFields: SkillCheckFields | null;
    normalResultPath: any | null;
}

export interface SkillCheckFields {
    difficulty: Difficulties;
    difficult?: Difficult;
    skillToCheck: Skills;
    canGiveItems: boolean;
    resultPath: SkillCheckResult | null;
}

interface SkillCheckResult {
    success: any,
    failure: any
}

export class Event {
    private _title: string;
    private _subtitle: string;
    private _description: string;
    private _image: string;
    private _choices: Choice[] = [];
    private _type: EventType;
    private _items: Item[] = [];

    constructor(title: string, subtitle: string, description: string, image: string, choices: Choice[], type: EventType, items?: Item[]) {
        this._title = title;
        this._subtitle = subtitle;
        this._description = description;
        this._image = image;

        if (choices.length > 4) {
            throw new RangeError('Four is the limit of choices per event');
        }

        this._choices = choices;
        this._type = type;
        this._items = items;
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

    get choices() {
        return this._choices;
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