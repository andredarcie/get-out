export class PageRegistry {
    public readonly log: HTMLElement;
    public readonly event: HTMLElement;
    public readonly skillCheck: HTMLElement;
    public readonly gameOver: HTMLElement;
    public readonly rip: HTMLElement;
    public readonly bag: HTMLElement;
    public readonly itemPicker: HTMLElement;
    public readonly dialog: HTMLElement;
    public readonly map: HTMLElement;
    public readonly skillUp: HTMLElement;

    constructor() {
        this.log      = document.getElementById("log-page")!;
        this.event    = document.getElementById("event-page")!;
        this.skillCheck  = document.getElementById("skill-check-page")!;
        this.gameOver = document.getElementById("game-over-page")!;
        this.rip      = document.getElementById("rip-page")!;
        this.bag      = document.getElementById("bag-page")!;
        this.itemPicker  = document.getElementById("item-picker-page")!;
        this.dialog   = document.querySelector("#dialog-page")!;
        this.map      = document.querySelector("#map-page")!;
        this.skillUp  = document.querySelector("#skill-up-page")!;
    }

    show(page: HTMLElement): void {
        page.style.display = 'flex';
    }

    hide(page: HTMLElement): void {
        page.style.display = 'none';
    }

    hideAll(): void {
        [this.log, this.event, this.skillCheck, this.gameOver, this.bag,
         this.rip, this.itemPicker, this.skillUp, this.dialog, this.map]
            .forEach(p => this.hide(p));
    }
}
