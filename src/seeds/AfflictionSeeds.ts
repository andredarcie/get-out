import { Status, StatusEffect } from '../entities/Status';

/**
 * Aflições drenam sanidade a cada hora de caminhada. Calibradas para
 * uma travessia de ~8 etapas: uma aflição adquirida cedo e não tratada
 * é uma espiral da morte — itens existem para quebrá-la.
 */
export class StatusSeeds {
    public static items: Status[] = [
        new Status('Ansiedade', 4, StatusEffect.NEGATIVE),
        new Status('Culpa', 4, StatusEffect.NEGATIVE),
        new Status('Medo', 4, StatusEffect.NEGATIVE),
        new Status('Depressão', 5, StatusEffect.NEGATIVE),
        new Status('Isolamento', 5, StatusEffect.NEGATIVE),
        new Status('Paranoia', 5, StatusEffect.NEGATIVE),
        new Status('Alucinações', 6, StatusEffect.NEGATIVE),
        new Status('Pânico', 6, StatusEffect.NEGATIVE),
        new Status('Desespero', 7, StatusEffect.NEGATIVE),
        new Status('Trauma', 8, StatusEffect.NEGATIVE),
    ];

    public static getStatusByName(name: string): Status {
        return StatusSeeds.items.find(affliction => affliction.name == name);
    }
}
