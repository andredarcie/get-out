import { Game } from '../Game';
import { Item, ItemType } from '../entities/Item';
import { Character } from '../entities/Character';
import { GameStates } from '../enums/GameStates';

export class BagManager {
    private _items: Item[] = [];
    private _itemListElement: Element;
    private _selectedItemElement: any;
    private _selectedItem: Item;
    private _bagCloseBtn: Element;
    private _bagThrowAwayBtn: HTMLElement;
    private readonly _game: Game;

    constructor() {
        
        this._game = Game.getInstance();

        this._itemListElement = document.querySelector('#bag-item-list');
        this._selectedItemElement = document.getElementById('bag-selected-item');
        this._bagCloseBtn = document.querySelector('#bag-close-btn');
        this._bagThrowAwayBtn = document.getElementById('bag-throw-away-btn');

        this._bagCloseBtn.addEventListener('click', () => { this.onClickBagClose() });
        this._bagThrowAwayBtn.addEventListener('click', () => { this.onClickThrowAway() });
    }

    start() {
        this.hideSelectedItem();
        this.showItems();
        this._bagThrowAwayBtn.style.display = 'none';
    }

    private onClickBagClose() {
        this._game.stateManager.goToState(GameStates.TRAVEL);
    }

    private onClickThrowAway() {
        this.removeOrDecreaseItem();
        this._itemListElement.innerHTML = '';
        this._selectedItemElement.style.display = 'none';
        this.showItems();
        this._bagThrowAwayBtn.style.display = 'none';
    }

    private hideSelectedItem() {
        this._selectedItemElement.innerHTML = '';
        this._selectedItemElement.style.display = 'none';
    }

    private showSelectedItem() {
        this._selectedItemElement.style.display = 'block';
    }

    private showItems() {
        this._itemListElement.innerHTML = '';

        if (this._items.length == 0) {
            this._itemListElement.innerHTML = 'Empty';
            return;
        }

        for (let item of this._items) {
            const li = document.createElement("li");
            const button = document.createElement("button");
            button.appendChild(document.createTextNode(item.name + ' (' + item.effect + ') ' + item.showAmount()));
            button.addEventListener('click', () => this.selectItem(item));
            li.appendChild(button);
            this._itemListElement.appendChild(li);
        }
    }

    putItem(itemToPut: Item): void {
        let existingItemIndex = this._items.findIndex(item => item.name == itemToPut.name);

        if (existingItemIndex >= 0) {
            this._items[existingItemIndex].increaseAmount();
        } else {
            this._items.push(itemToPut);
        }
    }

    private showCharacters() {
        for (const character of this._game.characters) {
            const li = document.createElement("li");
            const button = document.createElement("button");

            let buttonText = character.name;

            var paragraph = document.createElement("p");
            
            if (character.isDead) {
                button.disabled = true;
                paragraph.classList.add('line');
                paragraph.style.color = '#2c3e50';
            } else {
                switch (this._selectedItem.type) {
                    case ItemType.FirstAid:
                        buttonText += character.getHealth();
                        break;
                    case ItemType.Food:
                        buttonText += character.getHungry();
                        break;
                }
            }

            paragraph.appendChild(document.createTextNode(buttonText));
            button.appendChild(paragraph);

            button.addEventListener('click', () => this.useItem(character) );
            li.appendChild(button);
            this._itemListElement.appendChild(li);
        }
    }

    private selectItem(selectedItem: Item) {
        this._selectedItem = selectedItem;
        this._itemListElement.innerHTML = '';
        this._selectedItemElement.innerHTML = `Give ${this._selectedItem.name} ${this._selectedItem.effect} to:`;
        this.showSelectedItem();
        this.showCharacters();
        this._bagThrowAwayBtn.style.display = 'block';
    }

    private useItem(character: Character) {
        this.removeOrDecreaseItem();
        this.hideSelectedItem();
        this.showItems();

        switch (this._selectedItem.type) {
            case ItemType.FirstAid:
                character.increaseHealth(this._selectedItem.effectValue);
                break;
            case ItemType.Food:
                character.decreaseHungry(this._selectedItem.effectValue);
                break;
        }
        character.decreaseHungry(12);
        this._bagThrowAwayBtn.style.display = 'none';
    }

    private removeOrDecreaseItem() {
        if (this._selectedItem.amount > 1) {
            this._selectedItem.decreaseAmount();
        } else {
            this.removeItem(this._selectedItem.name);
        }
    }

    public removeItem(itemName: string): void {
        this._items = this._items.filter(item => item.name !== itemName);
    }

    public checksIfAnItemExists(itemName: string): boolean {
        let existingItemIndex = this._items.findIndex(item => item.name == itemName);
        return existingItemIndex  != -1 ? true : false;
    }

    isEmpty(): boolean {
        return this._items.length <= 0;
    }

    public showQuantityOfItems(): number {
        let itemCount: number = 0;

        for (let i = 0; i < this._items.length; i++) {
            itemCount += this._items[i].amount == 0 ? 1 : this._items[i].amount;
        }

        return itemCount;
    }
}