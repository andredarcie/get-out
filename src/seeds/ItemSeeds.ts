import { Item, ItemType } from '../entities/Item';

export enum ItemsNames {
    Antibiotic,
    Antiseptic,
    Bandage,
    Painkillers,
    BeefJerky
}

export class ItemSeeds {
    public static items: Item[] = [
        new Item('First Aid', ItemType.FirstAid),
        new Item('Food', ItemType.Food),
        new Item('Drink', ItemType.Drink)
    ];

    public static getItens(name: ItemsNames, amount: number): Item {
        this.items[name].amount = amount;
        return this.items[name];
    }

    public static getOneRandomItem(): Item {
        return ItemSeeds.items[ItemSeeds.getRandomArbitrary(0, ItemSeeds.items.length)];
    }

    private static getRandomArbitrary(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}