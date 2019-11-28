import { Game, GameStates } from '../Game';
import { Item, ItemType } from '../entities/Item';
import { Character } from '../entities/Character';

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

    onClickBagClose() {
        this._game.goToState(GameStates.CAMP);
    }

    onClickThrowAway() {
        this.removeOrDecreaseItem();
        this._itemListElement.innerHTML = '';
        this.showItems();
        this._bagThrowAwayBtn.style.display = 'none';
    }

    hideSelectedItem() {
        this._selectedItemElement.innerHTML = '';
        this._selectedItemElement.style.display = 'none';
    }

    showSelectedItem() {
        this._selectedItemElement.style.display = 'block';
    }

    showItems() {
        this._itemListElement.innerHTML = '';

        if (this._items.length == 0) {
            this._itemListElement.innerHTML = 'Empty';
            return;
        }

        for (let i = 0; i < this._items.length; i++) {
            const li = document.createElement("li");
            const button = document.createElement("button");
            button.appendChild(document.createTextNode(this._items[i].getNameWithAmount()));
            button.addEventListener('click', () => this.selectItem(this._items[i]) );
            li.appendChild(button);
            this._itemListElement.appendChild(li);
        }
    }

    putItem(item: Item): void {
        let existingItemIndex = this._items.findIndex(item => item.name == item.name);

        if (existingItemIndex >= 0) {
            this._items[existingItemIndex].increaseAmount();
        } else {
            this._items.push(item);
        }
    }

    showCharacters() {
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
                    case ItemType.Food:
                            buttonText += ' ' + character.getHungry();
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

    selectItem(selectedItem: Item) {
        this._selectedItem = selectedItem;
        this._itemListElement.innerHTML = '';
        this._selectedItemElement.innerHTML = 'Give ' + this._selectedItem.name + ' to';
        this.showSelectedItem();
        this.showCharacters();
        this._bagThrowAwayBtn.style.display = 'block';
    }

    useItem(character: Character) {
        this.removeOrDecreaseItem();
        this.hideSelectedItem();
        this.showItems();
        character.decreaseHungry(12);
        this._bagThrowAwayBtn.style.display = 'none';
    }

    removeOrDecreaseItem() {
        if (this._selectedItem.amount > 1) {
            this._selectedItem.decreaseAmount();
        } else {
            this.removeItem(this._selectedItem);
        }
    }

    removeItem(itemToRemove: Item): void {
        this._items = this._items.filter(item => item.name !== itemToRemove.name);
    }
}