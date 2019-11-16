import { Item } from './Item';

export enum EventType {
    Exploration,
    Combat
}

export class Event {
    private _name: string;
    private _description: string;
    private _type: EventType;
    private _items: Item[] = [];

    constructor(name: string, description: string, type: EventType, items?: Item[]) {
        this._name = name;
        this._description = description;
        this._type = type;
        this._items = items;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
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