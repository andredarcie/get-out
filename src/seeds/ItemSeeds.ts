import { Item, ItemType } from '../entities/Item';

export enum ItemsNames {
    FirstAid,
    Food
}

export class ItemSeeds {
    public static items: Item[] = [
        new Item('First Aid', ItemType.FirstAid, '❤️ +50%'),
        new Item('Food', ItemType.Food, '🥫 +50%'),
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