import { Character } from '../entities/Character';
import { Game } from '../Game';
import { GameStates } from '../enums/GameStates';

export enum LogType {
    Result,
    StatusChange
}

export class LogManager {
    private _logListResult: Element;
    private _logListStatusChange: Element;
    private _travelBtn: Element;
    private _tempResultLogs: string[] = [];
    private _tempoStatusChangeLogs: string[] = []; 
    private _logs: string[] = [];
    private readonly _game: Game;

    constructor() {
        this._game = Game.getInstance();

        this._logListResult = document.querySelector("#log-list-result");
        this._logListStatusChange = document.querySelector("#log-list-status-change");

        this._travelBtn = document.querySelector("#log-back-character-btn");
        this._travelBtn.addEventListener('click', () => { this.onClickTravel() });
        
    }

    start(): void {
        this.showLogs();
    }

    showLogs(): void {
        let result_logs = '';
        for (let i = 0; i < this._tempResultLogs.length; i++) {
            result_logs += '<li>' + this._tempResultLogs[i] + '</li>';
        }

        this._logs = this._tempResultLogs;
        this._tempResultLogs = [];
        this._logListResult.innerHTML = result_logs;

        this._logs = this._tempoStatusChangeLogs;
        this._tempoStatusChangeLogs = [];
        this._logListStatusChange.innerHTML = this.createLogsForStatusChange();
        this._game.characterManager.savePreviousCharacters();
    }

    createLogsForStatusChange(): string {
        let previousCharacters = this._game.characterManager.previousCharacters;
        let currentCharacters = this._game.characterManager.characters;

        let status_change_logs = '';
        
        for (let i = 0; i < previousCharacters.length; i++) {
            let previousCharacter = previousCharacters[i];
            let currentCharacter = currentCharacters[i];

            if (!currentCharacter.isDead) {
                if (previousCharacter.health != currentCharacter.health || 
                    previousCharacter.hungry != currentCharacter.hungry ||
                    previousCharacter.stamina != currentCharacter.stamina) {
                    status_change_logs += '<li> ' + currentCharacter.name + ' ';

                    if (previousCharacter.health != currentCharacter.health) {
                        if (previousCharacter.health > currentCharacter.health) {
                            status_change_logs += '❤️ -' + (previousCharacter.health - currentCharacter.health) + '% ';
                        } else {
                            status_change_logs += '❤️ +' + (currentCharacter.health - previousCharacter.health) + '% ';
                        }
                    }

                    if (previousCharacter.hungry != currentCharacter.hungry) {
                        if (previousCharacter.hungry > currentCharacter.hungry) {
                            status_change_logs += '🥫 -' + (previousCharacter.hungry - currentCharacter.hungry) + '% ';
                        } else {
                            status_change_logs += '🥫 +' + (currentCharacter.hungry - previousCharacter.hungry) + '% ';
                        }
                    }

                    if (previousCharacter.stamina != currentCharacter.stamina) {
                        if (previousCharacter.stamina > currentCharacter.stamina) {
                            status_change_logs += '⚡ -' + (previousCharacter.stamina - currentCharacter.stamina) + '% ';
                        } else {
                            status_change_logs += '⚡ +' + (currentCharacter.stamina - previousCharacter.stamina) + '% ';
                        }
                    }

                    status_change_logs += '</li>';
                }
            }
        }

        return status_change_logs;
    }

    clearLogs(): void {
        this._logListResult.innerHTML = '';
        this._logListStatusChange.innerHTML = '';
    }

    onClickTravel() {
        let characters: Character[] = this._game.characterManager.getCharactersDead();

        for (let character of characters) {
            if (character.isDead && !character.buried) {
                this._game.stateManager.goToState(GameStates.RIP);
                return;
            }
        }

        this._game.stateManager.goToState(GameStates.TRAVEL);
    }

    isThereAnyTemporaryLog(): boolean {
        return this._tempResultLogs.length > 0 || this._tempoStatusChangeLogs.length > 0;
    }

    addTempLog(log: string, logType: LogType) {
        if (logType == LogType.Result) {
            this._tempResultLogs.push(log);
        } else if (logType == LogType.StatusChange) {
            this._tempoStatusChangeLogs.push(log);
        }

        this._game.addLogToFirebase(log);
    }
}