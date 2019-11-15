import { Item } from './Item';

export enum EventType {
    Exploration,
    Combat
}

export class Event {
    name: string;
    description: string;
    type: EventType;
    items: Item[] = [];

    constructor(name: string, description: string, type: EventType, items?: Item[]) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.items = items;
    }

    willGiveItems(): boolean {
        return this.items ? this.items.length > 0 : false;
    }
}