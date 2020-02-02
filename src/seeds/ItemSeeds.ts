import { Item, ItemType } from '../entities/Item';

export enum ItemsNames {
    Antibiotic,
    Antiseptic,
    Bandage,
    Painkillers,
    BeefJerky
}

export class ItemSeeds {
    public static itens: Item[] = [
        // First Aid Items:
        new Item('Antibiotic', 'Take it to stop infection from spreading', ItemType.FirstAid),
        new Item('Antiseptic', 'Useful for cleaning wounds', ItemType.FirstAid),
        new Item('Bandage', 'Bandage suitable for stopping blood loss or binding to constrict movement on an injury', ItemType.FirstAid),
        new Item('Painkillers', 'Take them to reduce pain from injuries', ItemType.FirstAid),
        // Food Items:
        new Item('Beef Jerky', 'Tasty and pretty much lasts forever', ItemType.Food),
        new Item('Candy Bar', 'Chocolate and nuts', ItemType.Food),
        new Item('Condensed Milk', 'Sweetened, thickened milk in a can', ItemType.Food),
        new Item('Dog Food', 'Smells bad, but eating it is better than starving', ItemType.Food),
        new Item('Energy Bar', 'Energy in a bar. Chocolate, nuts, healthy stuff', ItemType.Food),
        new Item('Granola Bar', 'Dry and crunchy', ItemType.Food),
        new Item('Peanut Butter', 'Jar of creamy peanut butter', ItemType.Food),
        new Item('Pinnacle Peaches', 'High quality peaches, halved', ItemType.Food),
        new Item('Pork and Beans', 'Beans in Molasses, with bits of what looks like pork', ItemType.Food),
        new Item('Salty Crackers', 'Dried, salty crackers. Will make you thirsty', ItemType.Food),
        new Item('Tomato Soup', 'A rich sweet-smelling soup', ItemType.Food),
        new Item('Tin of Sardines', 'Fish which have been processed, sealed in an airtight container', ItemType.Food),
        // Drink Items:
        new Item('Potable Water', 'It will recover the Thirst meter when drank', ItemType.Drink),
        new Item('Unsafe Water', 'Drinking unsafe water can make you sick with dysentry', ItemType.Drink),
        new Item('Orange Soda', 'Sweet carbonated drink. Full of high-fructose corn syrup', ItemType.Drink),
        new Item('Herbal Tea', 'Fives calories and reduces thirst, and can be consumed hot to raise warmth', ItemType.Drink),
        new Item('Coffee', 'It temporally boosts your energy meter and your warmth', ItemType.Drink),
    ];

    public static getItens(name: ItemsNames, amount: number): Item {
        this.itens[name].amount = amount;
        return this.itens[name];
    }

    public static getOneRandomItem(): Item {
        return ItemSeeds.itens[ItemSeeds.getRandomArbitrary(0, ItemSeeds.itens.length)];
    }

    private static getRandomArbitrary(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}