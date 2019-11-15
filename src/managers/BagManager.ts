import { Game, GameStates } from '../Game';
import { Item } from '../entities/Item';

export class BagManager {
    items: Item[] = [];
    itemListElement: Element;
    selectedItemElement: any;
    selectedItem: Item;
    bagCloseBtn: Element;

    constructor() {
        this.itemListElement = document.querySelector('#bag-item-list');
        this.selectedItemElement = document.getElementById('bag-selected-item');
        this.bagCloseBtn = document.querySelector('#bag-close-btn');

        this.bagCloseBtn.addEventListener('click', () => { this.onClickBagClose() });
    }

    start() {
        this.hideSelectedItem();
        this.showItems();
    }

    onClickBagClose() {
        Game.goToState(GameStates.CAMP);
    }

    hideSelectedItem() {
        this.selectedItemElement.style.display = 'none';
    }

    showSelectedItem() {
        this.selectedItemElement.style.display = 'block';
    }

    showItems() {
        this.itemListElement.innerHTML = '';

        if (this.items.length == 0) {
            this.itemListElement.innerHTML = 'Empty';
            return;
        }

        for (let i = 0; i < this.items.length; i++) {
            const li = document.createElement("li");
            const button = document.createElement("input");
            button.type = "button";
            button.value = this.items[i].getNameWithAmount();
            button.addEventListener('click', () => this.selectItem(this.items[i]) );
            li.appendChild(button);
            this.itemListElement.appendChild(li);
        }
    }

    putItem(item: Item): void {
        let existingItemIndex = this.items.findIndex(item => item.getName() == item.getName());

        if (existingItemIndex >= 0) {
            this.items[existingItemIndex].increaseAmount();
        } else {
            this.items.push(item);
        }
    }

    showCharacters() {
        for (let i = 0; i < Game.characters.length; i++) {
            const li = document.createElement("li");
            const button = document.createElement("input");
            button.type = "button";
            button.value = Game.characters[i].name;
            button.addEventListener('click', () => this.selectCharacter(i) );
            li.appendChild(button);
            this.itemListElement.appendChild(li);
        }
    }

    selectItem(selectedItem: Item) {
        this.selectedItem = selectedItem;
        this.itemListElement.innerHTML = '';
        this.selectedItemElement.innerHTML = 'Give ' + this.selectedItem.getName() + ' to';
        this.showSelectedItem();
        this.showCharacters();
    }

    selectCharacter(i: number) {
        if (this.selectedItem.getAmount() > 1) {
            this.selectedItem.decreaseAmount();
        } else {
            this.removeItem(this.selectedItem);
        }

        this.itemListElement.innerHTML = '';
        this.selectedItemElement.innerHTML = '';
        this.hideSelectedItem();
        this.showItems();
        Game.characters[i].looseHealth(1);
    }

    removeItem(itemToRemove: Item): void {
        this.items = this.items.filter(item => item.getName() !== itemToRemove.getName());
    }
}