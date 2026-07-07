export class PageRegistry {
    public readonly intro: HTMLElement;
    public readonly log: HTMLElement;
    public readonly event: HTMLElement;
    public readonly skillCheck: HTMLElement;
    public readonly gameOver: HTMLElement;
    public readonly rip: HTMLElement;
    public readonly bag: HTMLElement;
    public readonly itemPicker: HTMLElement;
    public readonly map: HTMLElement;

    constructor() {
        this.intro    = document.getElementById("intro-page")!;
        this.log      = document.getElementById("log-page")!;
        this.event    = document.getElementById("event-page")!;
        this.skillCheck  = document.getElementById("skill-check-page")!;
        this.gameOver = document.getElementById("game-over-page")!;
        this.rip      = document.getElementById("rip-page")!;
        this.bag      = document.getElementById("bag-page")!;
        this.itemPicker  = document.getElementById("item-picker-page")!;
        this.map      = document.querySelector("#map-page")!;
    }

    show(page: HTMLElement): void {
        page.style.display = 'flex';
    }

    hide(page: HTMLElement): void {
        page.style.display = 'none';
    }

    hideAll(): void {
        [this.intro, this.log, this.event, this.skillCheck, this.gameOver,
         this.bag, this.rip, this.itemPicker, this.map]
            .forEach(p => this.hide(p));
    }
}
