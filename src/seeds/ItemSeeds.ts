import { Item, ItemType } from '../entities/Item';

export enum ItemsNames {
    FirstAid,
    Food
}

export class ItemSeeds {
    public static items: Item[] = [
        new Item('Bandages', ItemType.FirstAid, '❤️+50%', 10),
        new Item('Herbal Meds', ItemType.FirstAid, '❤️+50%', 5),
        new Item('Medications', ItemType.FirstAid, '❤️+50%', 15),
        new Item('Raw Food', ItemType.Food, '❤️+50%', 10),
        new Item('Vegetables', ItemType.Food, '❤️+50%', 5),
        new Item('Canned Food', ItemType.Food, '❤️+50%', 10),
        new Item('Herbs', ItemType.FirstAid, '❤️+50%', 15),
        new Item('Cigarette', ItemType.Food, '❤️+50%', 15),
        new Item('Beef jerky', ItemType.Food, '❤️+50%', 15),
        new Item('Bear meat', ItemType.Food, '❤️+50%', 15),
        new Item('Chocolate Bar', ItemType.Food, '❤️+50%', 20),
        new Item('Condensed milk', ItemType.Food, '❤️+50%', 15),
        new Item('Cup of coffee', ItemType.Food, '❤️+50%', 10),
        new Item('Cup of herbal tea', ItemType.Food, '❤️+50%', 10),
        new Item('Dog food', ItemType.Food, '❤️+50%', 15),
        new Item('Energy bar', ItemType.Food, '❤️+50%', 25),
        new Item('Water (unsafe)', ItemType.Food, '❤️+50%', 10),
        new Item('Granola bar', ItemType.Food, '❤️+50%', 15),
        new Item('Orange soda', ItemType.Food, '❤️+50%', 20)
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