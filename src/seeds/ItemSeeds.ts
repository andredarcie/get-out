import { Item, ItemType } from '../entities/Item';
import { StatusSeeds } from './AfflictionSeeds';

export enum ItemsNames {
    FirstAid,
    Food
}

export class ItemSeeds {
    public static items: Item[] = [
        // Itens para Status Negativos (diminuição da sanidade)
        new Item('Pílulas de Ansiedade', ItemType.FirstAid, StatusSeeds.getStatusByName('Ansiedade')),
        new Item('Fita Cassete de Meditação', ItemType.FirstAid, StatusSeeds.getStatusByName('Paranoia')),
        new Item('Café Enlatado', ItemType.Food, StatusSeeds.getStatusByName('Desespero')),
        new Item('Diário Antigo', ItemType.FirstAid, StatusSeeds.getStatusByName('Culpa')),
        new Item('Amuleto Protetor', ItemType.FirstAid, StatusSeeds.getStatusByName('Medo')),
        new Item('Fotografia Antiga', ItemType.FirstAid, StatusSeeds.getStatusByName('Alucinações')),
        new Item('Carta Velha', ItemType.FirstAid, StatusSeeds.getStatusByName('Isolamento')),
        new Item('Barra de Chocolate', ItemType.Food, StatusSeeds.getStatusByName('Depressão')),
        new Item('Kit de Primeiros Socorros', ItemType.FirstAid, StatusSeeds.getStatusByName('Trauma')),
        new Item('Barra Energética', ItemType.Food, StatusSeeds.getStatusByName('Pânico')),
    
        // Itens para Status Positivos (aumento da sanidade)
        new Item('Bilhete de Esperança', ItemType.FirstAid, StatusSeeds.getStatusByName('Esperança')),
        new Item('Caderno de Anotações', ItemType.FirstAid, StatusSeeds.getStatusByName('Resiliência')),
        new Item('Espelho de Bolso', ItemType.FirstAid, StatusSeeds.getStatusByName('Clareza Mental')),
        new Item('Amuleto de Ferro', ItemType.FirstAid, StatusSeeds.getStatusByName('Determinação')),
        new Item('Manual de Autoajuda', ItemType.FirstAid, StatusSeeds.getStatusByName('Autoconfiança')),
        new Item('Foto de uma Família', ItemType.FirstAid, StatusSeeds.getStatusByName('Ligação Familiar')),
        new Item('Amuleto da Superação', ItemType.FirstAid, StatusSeeds.getStatusByName('Superação do Medo')),
        new Item('Boneca de Pano', ItemType.FirstAid, StatusSeeds.getStatusByName('Oásis Mental')),
        new Item('Caixa de Suprimentos', ItemType.FirstAid, StatusSeeds.getStatusByName('Companheirismo')),
        new Item('Álbum de Fotos', ItemType.FirstAid, StatusSeeds.getStatusByName('Gratidão'))
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