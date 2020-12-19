import { Status } from '../entities/Status';

export class StatusSeeds {
    public static items: Status[] = [
        new Status('Anxiety', 5),
        new Status('Blood loss', 30),
        new Status('Broken ribs', 25),
        new Status('Depressed', 5),
        new Status('Dysentery', 30),
        new Status('Fear', 10),
        new Status('Food poisoning', 20),
        new Status('Infection', 10),
        new Status('Pain', 5),
        new Status('Wounds', 15)
    ];

    public static getStatusByName(name: string): Status {
        return StatusSeeds.items.find(affliction => affliction.name == name);
    }

    public static getOneRandomStatus(): Status {
        return StatusSeeds.items[StatusSeeds.getRandomArbitrary(0, StatusSeeds.items.length)];
    }

    private static getRandomArbitrary(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}