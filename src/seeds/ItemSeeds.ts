import { Item } from '../entities/Item';
import { StatusSeeds } from './AfflictionSeeds';

/**
 * Cada item alivia exatamente uma aflição. Encontrar o item certo
 * para a aflição certa é o coração da economia de recursos do jogo.
 */
export class ItemSeeds {
    private static readonly _blueprints: Array<{ name: string, cures: string }> = [
        { name: 'Diazepam', cures: 'Ansiedade' },
        { name: 'Morfina', cures: 'Paranoia' },
        { name: 'Cafeína', cures: 'Desespero' },
        { name: 'Diário', cures: 'Culpa' },
        { name: 'Crucifixo', cures: 'Medo' },
        { name: 'Foto antiga', cures: 'Alucinações' },
        { name: 'Carta', cures: 'Isolamento' },
        { name: 'Antidepressivos', cures: 'Depressão' },
        { name: 'Curativos', cures: 'Trauma' },
        { name: 'Anfetamina', cures: 'Pânico' },
    ];

    public static getOneRandomItem(): Item {
        const blueprint = this._blueprints[this.getRandomArbitrary(0, this._blueprints.length)];
        const item = new Item(blueprint.name, StatusSeeds.getStatusByName(blueprint.cures));
        item.amount = 1;
        return item;
    }

    private static getRandomArbitrary(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}
