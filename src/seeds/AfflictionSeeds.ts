import { Affliction } from '../entities/Affliction';

export class AfflictionSeeds {
    public static items: Affliction[] = [
        new Affliction('Anxiety', 5),
        new Affliction('Blood loss', 30),
        new Affliction('Broken ribs', 25),
        new Affliction('Depressed', 5),
        new Affliction('Dysentery', 30),
        new Affliction('Fear', 10),
        new Affliction('Food poisoning', 20),
        new Affliction('Infection', 10),
        new Affliction('Pain', 5),
        new Affliction('Wounds', 15)
    ];

    public static getAfflictionByName(name: string): Affliction {
        return AfflictionSeeds.items.find(affliction => affliction.name == name);
    }

    public static getOneRandomAffliction(): Affliction {
        return AfflictionSeeds.items[AfflictionSeeds.getRandomArbitrary(0, AfflictionSeeds.items.length)];
    }

    private static getRandomArbitrary(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}