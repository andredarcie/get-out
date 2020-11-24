import { Item } from './Item';

export enum EventType {
    Exploration,
    Combat,
    Place
}

export interface Choice {
    buttonText: string;
    skillCheck: boolean;
    skillCheckResultPath: SkillCheckResult | null,
    normalResultPath: any | null;
}

interface SkillCheckResult {
    success: any,
    criticialSuccess: any,
    failure: any,
    criticalFailure: any
}

export class Event {
    private _name: string;
    private _description: string;
    private _image: string;
    private _choices: Choice[] = [];
    private _type: EventType;
    private _items: Item[] = [];

    constructor(name: string, description: string, image: string, choices: Choice[], type: EventType, items?: Item[]) {
        this._name = name;
        this._description = description;
        this._image = image;
        this._choices = choices;
        this._type = type;
        this._items = items;
    }

    get name() {
        return this._name;
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