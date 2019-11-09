export enum EventType {
    Exploration,
    Combat
}

export class Event {
    name: string;
    description: string;
    type: EventType;

    constructor(name: string, description: string, type: EventType) {
        this.name = name;
        this.description = description;
        this.type = type;
    }
}