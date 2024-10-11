import { Status, StatusEffect } from '../entities/Status';

export class StatusSeeds {
    public static items: Status[] = [
        // Status Negativos (diminuição da sanidade)
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

        // Status Positivos (aumento da sanidade)
        new Status('Esperança', 10, StatusEffect.POSITIVE),
        new Status('Resiliência', 20, StatusEffect.POSITIVE),
        new Status('Clareza Mental', 15, StatusEffect.POSITIVE),
        new Status('Determinação', 25, StatusEffect.POSITIVE),
        new Status('Autoconfiança', 10, StatusEffect.POSITIVE),
        new Status('Ligação Familiar', 20, StatusEffect.POSITIVE),
        new Status('Superação do Medo', 30, StatusEffect.POSITIVE),
        new Status('Oásis Mental', 15, StatusEffect.POSITIVE),
        new Status('Companheirismo', 25, StatusEffect.POSITIVE),
        new Status('Gratidão', 10, StatusEffect.POSITIVE)
    ];

    public static getStatusByName(name: string): Status {
        return StatusSeeds.items.find(affliction => affliction.name == name);
    }
}