import { Item } from '../entities/Item';
import { StatusSeeds } from './AfflictionSeeds';

export enum ItemsNames {
    FirstAid,
    Food
}

export class ItemSeeds {
    public static items: Item[] = [
        new Item('Comprimidos de Diazepam', StatusSeeds.getStatusByName('Ansiedade')),
        new Item('Seringa de Morfina', StatusSeeds.getStatusByName('Paranoia')),
        new Item('Lata de Cafeína Pura', StatusSeeds.getStatusByName('Desespero')),
        new Item('Diário Rasgado', StatusSeeds.getStatusByName('Culpa')),
        new Item('Crucifixo de Bolso', StatusSeeds.getStatusByName('Medo')),
        new Item('Foto Desgastada', StatusSeeds.getStatusByName('Alucinações')),
        new Item('Carta de Um Ente Querido', StatusSeeds.getStatusByName('Isolamento')),
        new Item('Cartela de Antidepressivos', StatusSeeds.getStatusByName('Depressão')),
        new Item('Kit de Primeiros Socorros Básico', StatusSeeds.getStatusByName('Trauma')),
        new Item('Comprimidos de Anfetamina', StatusSeeds.getStatusByName('Pânico'))
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