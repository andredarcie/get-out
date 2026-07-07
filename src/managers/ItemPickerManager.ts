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
    private _itemsFoundTitle: HTMLElement;
    private _yourItemsTitle: HTMLElement;
    private _pageMessageElement: HTMLElement;
    private _myItemsMax: number = 2;
    private _takeAllBtn: HTMLButtonElement;
    public itemsFound: number = 4;
    private _continueBtn: HTMLButtonElement;
    private character: Character;

    constructor() {
        this._game = Game.getInstance();

        this._continueBtn = document.querySelector('#item-picker-page-continue-btn')!;
        this._continueBtn.addEventListener('click', () => { this.onContinueBtn() });
        this._itemsToPickListElement = document.querySelector('#item-picker-page-items-to-pick');
        this._itemsFoundTitle = document.querySelector('#items-found-title')!;
        this._pageMessageElement = document.querySelector('#item-picker-page-message')!;
        this._myItemsListElement = document.querySelector('#item-picker-page-item-my-items');
        this._yourItemsTitle = document.querySelector('#your-items-title')!;
        this._takeAllBtn = document.querySelector('#item-picker-page-take-all-btn')!;
        this._takeAllBtn.addEventListener('click', () => { this.onTakeAllBtn() });
    }

    public start(): void {
        this.character = this.resolveSearchingCharacter();
        this.showPageMessage();
        this._itemsToPick = [];
        this._myItems = [];

        for (let i = 0; i < this.itemsFound; i++) {
            let itemFounded: Item = ItemSeeds.getOneRandomItem();
            this.addItemToPick(itemFounded);
        }

        this.showItems();
    }

    /**
     * Quem vasculha é o personagem do evento atual — é a história dele.
     * Se ele não estiver mais entre os vivos, outro assume.
     */
    private resolveSearchingCharacter(): Character {
        const eventCharacter = this._game.eventManager.currentEvent?.character;
        if (eventCharacter && !eventCharacter.isDead) {
            return eventCharacter;
        }
        return this._game.characterManager.picksACharacterAtRandom();
    }

    private showPageMessage() {
        this._itemsFoundTitle.style.display = 'none';
        this._continueBtn.style.display = 'none';
        this._itemsToPickListElement.style.display = 'none';
        this._myItemsListElement.style.display = 'none';
        this._yourItemsTitle.style.display = 'none';
        this._takeAllBtn.style.display = 'none';

        this._pageMessageElement.textContent = `${this.character.name} vasculha...`;
        this._pageMessageElement.style.display = 'block';

        setTimeout(() => this.showPageElements(), 1500);
    }

    private showPageElements() {
        this._game.audioManager.playItemFoundSound();
        this._itemsFoundTitle.style.display = 'block';
        this._continueBtn.style.display = 'block';
        this._itemsToPickListElement.style.display = 'block';
        this._myItemsListElement.style.display = 'block';
        this._yourItemsTitle.style.display = 'block';
        this._takeAllBtn.style.display = 'block';

        this._pageMessageElement.style.display = 'none';
    }

    private showItems() {
        if (this._itemsToPick.length <= (this._myItemsMax - this.countMyItems())) {
            this._takeAllBtn.disabled = false;
        } else {
            this._takeAllBtn.disabled = true;
        }

        this.showItemsToPick();
        this.showMyItems();
    }

    private countMyItems(): number {
        return this._myItems.reduce((total, item) => total + Math.max(1, item.amount), 0);
    }

    private countItemsToPick(): number {
        return this._itemsToPick.reduce((total, item) => total + Math.max(1, item.amount), 0);
    }

    private showItemsToPick() {
        this._itemsToPickListElement.innerHTML = '';

        for (let item of this._itemsToPick) {
            const li = document.createElement("li");
            const button = document.createElement("button");
            button.appendChild(document.createTextNode(item.name + ' → ' + item.status.name + item.showAmount()));
            button.addEventListener('click', () => this.selectItemToPick(item));

            if (this.countMyItems() >= this._myItemsMax) {
                button.disabled = true;
            }

            li.appendChild(button);
            this._itemsToPickListElement.appendChild(li);
        }
    }

    private showMyItems() {
        this._yourItemsTitle.innerHTML = `Levar (${this.countMyItems()}/${this._myItemsMax})`;
        this._myItemsListElement.innerHTML = '';

        for (let item of this._myItems) {
            const li = document.createElement("li");
            const button = document.createElement("button");
            button.appendChild(document.createTextNode(item.name + ' → ' + item.status.name + item.showAmount()));
            button.addEventListener('click', () => this.selectItemMyItem(item));
            li.appendChild(button);
            this._myItemsListElement.appendChild(li);
        }
    }

    private selectItemToPick(selectedItem: Item) {
        this._game.audioManager.playTakeItemSound();
        this.moveOneItem(selectedItem, this._itemsToPick, (item) => this.addMyItem(item));
        this.showItems();
    }

    private selectItemMyItem(selectedItem: Item) {
        this._game.audioManager.playThrowSound();
        this.moveOneItem(selectedItem, this._myItems, (item) => this.addItemToPick(item));
        this.showItems();
    }

    /**
     * Move uma unidade do item entre as listas, preservando pilhas.
     */
    private moveOneItem(selectedItem: Item, fromList: Item[], addTo: (item: Item) => void): void {
        if (selectedItem.amount > 1) {
            selectedItem.decreaseAmount();
        } else {
            const index = fromList.indexOf(selectedItem);
            if (index >= 0) fromList.splice(index, 1);
        }

        const single = new Item(selectedItem.name, selectedItem.status);
        single.amount = 1;
        addTo(single);
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
        this._game.audioManager.playButtonSound();
        for (let i = 0; i < this._myItems.length; i++) {
            this._game.bagManager.putItem(this._myItems[i]);
            this._game.log.addTempLog(`${this.character.name}: +${this._myItems[i].name}${this._myItems[i].showAmount()}`, LogType.Result);
        }

        this._game.stateManager.goToState(this._game.eventManager.resolveNextState());
    }

    private onTakeAllBtn(): void {
        if (this.countItemsToPick() > (this._myItemsMax - this.countMyItems())) {
            return;
        }

        this._game.audioManager.playTakeItemSound();

        const itemsToMove = [...this._itemsToPick];
        this._itemsToPick = [];
        itemsToMove.forEach((item) => {
            let existingItemIndex = this._myItems.findIndex(myItem => myItem.name == item.name);
            if (existingItemIndex >= 0) {
                for (let i = 0; i < Math.max(1, item.amount); i++) {
                    this._myItems[existingItemIndex].increaseAmount();
                }
            } else {
                this._myItems.push(item);
            }
        });
        this.showItems();
    }
}
