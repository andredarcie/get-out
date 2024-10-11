export class Status {
    constructor(
        public readonly name: string,
        public readonly healthPerHour: number,
        public readonly effect: StatusEffect
    ) {}
}

export enum StatusEffect {
    POSITIVE = 'Positive',
    NEGATIVE = 'Negative'
}
