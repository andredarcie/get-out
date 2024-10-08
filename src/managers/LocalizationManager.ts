import { Game } from '../Game';
import * as EnUs from '../localization/en-us.json';
import * as PtBr from '../localization/pt-br.json';

export enum Language {
    EnUs,
    PtBr
}

export class LocalizationManager {
    private _currentLanguage: Language;
    private readonly _game: Game;

    constructor(language: Language) {
        this._game = Game.getInstance();
        this._currentLanguage = language;
    }

    public l(key: string): string {
        switch(this._currentLanguage) {
            case Language.EnUs:
                return EnUs[key];
            case Language.PtBr:
                return PtBr[key];
            default:
                return 'Localization Error';
        }
    }
}