import { Item, ItemType } from '../entities/Item';

export class ItemSeeds {

    // First Aid Items
    public getAntibiotics(amount: number): Item {
        return new Item('Antibiotic', 'Take it to stop infection from spreading', amount, ItemType.FirstAid);
    }

    public getAntiseptic(amount: number): Item {
        return new Item('Antiseptic', 'Useful for cleaning wounds', amount, ItemType.FirstAid);
    }

    public getBandage(amount: number): Item {
        return new Item('Bandage', 'Bandage suitable for stopping blood loss or binding to constrict movement on an injury', amount, ItemType.FirstAid);
    }

    public getPainkillers(amount: number): Item {
        return new Item('Painkillers', 'Take them to reduce pain from injuries', amount, ItemType.FirstAid);
    }
}