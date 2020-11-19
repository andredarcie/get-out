import { Game } from '../Game';
import { Item } from '../entities/Item';
import { ItemSeeds } from '../seeds/ItemSeeds'
import { GameStates } from '../enums/GameStates';
import { LogType } from '../managers/LogManager';
import { Character } from '../entities/Character';

export class ItemPickerManager {
    private readonly _game: Game;
    private _itemsToPickListElement: any;
    private _myItemsListElement: any;
    private _itemsToPick: Item[] = [];
    private _myItems: Item[] = [];
    private _yourItemsTitle: HTMLElement;
    private _myItemsMax: number = 2;
    private _takeAllBtn: HTMLButtonElement;
    public itemsFound: number = 4;
    private _continueBtn: HTMLButtonElement;
    private character: Character;

    constructor() {
        this._game = Game.getInstance();

        this._continueBtn = document.querySelector('#item-picker-page-continue-btn');
        this._continueBtn.addEventListener('click', () => { this.onContinueBtn() });
        this._itemsToPickListElement = document.querySelector('#item-picker-page-items-to-pick');
        this._myItemsListElement = document.querySelector('#item-picker-page-item-my-items');
        this._yourItemsTitle = document.querySelector('#your-items-title');
        this._takeAllBtn = document.querySelector('#item-picker-page-take-all-btn');
    }

    public start(): void {
        this._itemsToPick = [];
        this._myItems = [];
        
        this.character = this._game.characterManager.picksACharacterAtRandom();

        for (let i = 0; i < this.itemsFound; i++) {
            let itemFounded: Item = ItemSeeds.getOneRandomItem();
            this.addItemToPick(itemFounded);
        }

        this.showItems();
    }

    private showItems() {
        if (this._itemsToPick.length <= (this._myItemsMax - this._myItems.length)) {
            this._takeAllBtn.disabled = false;
        } else {
            this._takeAllBtn.disabled =true;
        }

        this.showItemsToPick();
        this.showMyItems();
    }

    private showItemsToPick() {
        this._itemsToPickListElement.innerHTML = '';

        for (let item of this._itemsToPick) {
            const li = document.createElement("li");
            const button = document.createElement("button");
            button.appendChild(document.createTextNode(item.name + ' (' + item.effect + ') ' + item.showAmount()));
            button.addEventListener('click', () => this.selectItemToPick(item));

            if (this._myItems.length >= this._myItemsMax) {
                button.disabled = true;
            }

            li.appendChild(button);
            this._itemsToPickListElement.appendChild(li);
        }
    }

    private showMyItems() {
        this._yourItemsTitle.innerHTML = 'Your items - (' + this._myItems.length + '/' + this._myItemsMax + ')';
        this._myItemsListElement.innerHTML = '';

        for (let item of this._myItems) {
            const li = document.createElement("li");
            const button = document.createElement("button");
            button.appendChild(document.createTextNode(item.name + ' (' + item.effect + ') ' + item.showAmount()));
            button.addEventListener('click', () => this.selectItemMyItem(item));
            li.appendChild(button);
            this._myItemsListElement.appendChild(li);
        }
    }

    private selectItemToPick(selectedItem: Item) {
        this.removeItemToPick(selectedItem.name);
        this.addMyItem(selectedItem);
        this.showItems();
    }

    private selectItemMyItem(selectedItem: Item) {
        this.removeMyItem(selectedItem.name);
        this.addItemToPick(selectedItem);
        this.showItems();
    }

    public removeItemToPick(itemName: string): void {
        this._itemsToPick = this._itemsToPick.filter(item => item.name !== itemName);
    }

    public removeMyItem(itemName: string): void {
        this._myItems = this._myItems.filter(item => item.name !== itemName);
    }

    addItemToPick(itemToPut: Item): void {
        let existingItemIndex = this._itemsToPick.findIndex(item => item.name == itemToPut.name);

        if (existingItemIndex >= 0) {
            this._itemsToPick[existingItemIndex].increaseAmount();
        } else {
            this._itemsToPick.push(itemToPut);
        }
    }

    addMyItem(itemToPut: Item): void {
        let existingItemIndex = this._myItems.findIndex(item => item.name == itemToPut.name);

        if (existingItemIndex >= 0) {
            this._myItems[existingItemIndex].increaseAmount();
        } else {
            this._myItems.push(itemToPut);
        }
    }

    private onContinueBtn() {
        for (let i = 0; i < this._myItems.length; i++) {
            this._game.bagManager.putItem(this._myItems[i]);
            this._game.log.addTempLog(this.character.name + ' picked up ' + this._myItems[i].name, LogType.Result);
        }

        this._game.stateManager.goToState(GameStates.LOG);
    }
}