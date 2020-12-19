import { Item, ItemType } from '../entities/Item';
import { StatusSeeds } from './AfflictionSeeds';

export enum ItemsNames {
    FirstAid,
    Food
}

export class ItemSeeds {
    public static items: Item[] = [
        new Item('Bandages', ItemType.FirstAid, 10, [StatusSeeds.getStatusByName('Blood ribs'), 
                                                     StatusSeeds.getStatusByName('Broken ribs')]),
        new Item('Herbal Meds', ItemType.FirstAid, 5, [StatusSeeds.getStatusByName('Anxiety')]),
        new Item('Antibiotics', ItemType.FirstAid, 15, [StatusSeeds.getStatusByName('Infection'), 
                                                        StatusSeeds.getStatusByName('Food poisoning'), 
                                                        StatusSeeds.getStatusByName('Dysentery')]),
        new Item('Antiseptic', ItemType.FirstAid, 15, [StatusSeeds.getStatusByName('Wounds')]),
        new Item('Painkillers', ItemType.FirstAid, 15, [StatusSeeds.getStatusByName('Pain'), 
                                                        StatusSeeds.getStatusByName('Broken ribs')]),
        new Item('Raw Food', ItemType.Food, 10),
        new Item('Vegetables', ItemType.Food, 5),
        new Item('Canned Food', ItemType.Food, 10),
        new Item('Cigarette', ItemType.Food, 15),
        new Item('Beef jerky', ItemType.Food, 15),
        new Item('Bear meat', ItemType.Food, 15),
        new Item('Chocolate Bar', ItemType.Food, 20),
        new Item('Condensed milk', ItemType.Food, 15),
        new Item('Cup of coffee', ItemType.Food, 10),
        new Item('Cup of herbal tea', ItemType.Food, 10),
        new Item('Dog food', ItemType.Food, 15),
        new Item('Energy bar', ItemType.Food, 25),
        new Item('Water (unsafe)', ItemType.Food, 10),
        new Item('Granola bar', ItemType.Food, 15),
        new Item('Orange soda', ItemType.Food, 20)
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