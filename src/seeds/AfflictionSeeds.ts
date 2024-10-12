import { Status, StatusEffect } from '../entities/Status';

export class StatusSeeds {
    public static items: Status[] = [
        new Status('Ansiedade', 10, StatusEffect.NEGATIVE),
        new Status('Paranoia', 20, StatusEffect.NEGATIVE),
        new Status('Desespero', 30, StatusEffect.NEGATIVE),
        new Status('Culpa', 15, StatusEffect.NEGATIVE),
        new Status('Medo', 15, StatusEffect.NEGATIVE),
        new Status('Alucinações', 25, StatusEffect.NEGATIVE),
        new Status('Isolamento', 20, StatusEffect.NEGATIVE),
        new Status('Depressão', 10, StatusEffect.NEGATIVE),
        new Status('Trauma', 35, StatusEffect.NEGATIVE),
        new Status('Pânico', 25, StatusEffect.NEGATIVE),
    ];

    public static getStatusByName(name: string): Status {
        return StatusSeeds.items.find(affliction => affliction.name == name);
    }
}