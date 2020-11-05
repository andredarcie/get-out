import { Item } from './Item';

export enum EventType {
    Exploration,
    Combat,
    Place
}

interface Choice {
    buttonText: string;
    callback: any;
}

export class Event {
    private _name: string;
    private _description: string;
    private _image: string;
    private _onYes: Choice;
    private _onNo: Choice;
    private _type: EventType;
    private _items: Item[] = [];

    constructor(name: string, description: string, image: string, onYes: Choice, onNo: Choice, type: EventType, items?: Item[]) {
        this._name = name;
        this._description = description;
        this._image = image;
        this._onYes = onYes;
        this._onNo = onNo;
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

    get onYes() {
        return this._onYes;
    }

    get onNo() {
        return this._onNo;
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