import { Event } from '../entities/Event';
import { Game } from '../Game';
import { GameStates } from '../enums/GameStates';
import { EventSeeds } from '../seeds/EventSeeds';

type MapNodeKind = 'camp' | 'event' | 'border';

interface MapNode {
    id: string;
    label: string;
    eventTitle: string | null;
    kind: MapNodeKind;
    left: number;
    top: number;
    connections: string[];
}

const MAP_NODES: MapNode[] = [
    { id: 'camp', label: 'Estação', eventTitle: null, kind: 'camp', left: 50, top: 4, connections: ['a1', 'a2'] },

    { id: 'a1', label: 'Hospital 2', eventTitle: 'Olhos no Escuro', kind: 'event', left: 28, top: 13, connections: ['b1', 'b2'] },
    { id: 'a2', label: 'Bloco Kurchatov', eventTitle: 'Rostos nos Escombros', kind: 'event', left: 72, top: 13, connections: ['b2', 'b3'] },

    { id: 'b1', label: 'Maternidade', eventTitle: 'Sussurros dos Mortos', kind: 'event', left: 18, top: 23, connections: ['c1', 'c2'] },
    { id: 'b2', label: 'Correios', eventTitle: 'O Velho Espelho', kind: 'event', left: 50, top: 23, connections: ['c1', 'c2'] },
    { id: 'b3', label: 'Escola 4', eventTitle: 'Gritos Fantasmas', kind: 'event', left: 82, top: 23, connections: ['c1', 'c2'] },

    { id: 'c1', label: 'Piscina Lazúrna', eventTitle: 'Silêncio Mortal', kind: 'event', left: 28, top: 34, connections: ['d1', 'd2', 'd3'] },
    { id: 'c2', label: 'Casa 17', eventTitle: 'Casa Abandonada', kind: 'event', left: 72, top: 34, connections: ['d2', 'd3'] },

    { id: 'd1', label: 'Farmácia Velha', eventTitle: 'Farmácia Destruída', kind: 'event', left: 18, top: 45, connections: ['e1', 'e2'] },
    { id: 'd2', label: 'Creche Solnyshko', eventTitle: 'Eco de Choro', kind: 'event', left: 50, top: 45, connections: ['e1', 'e2'] },
    { id: 'd3', label: 'Jardim Lastivka', eventTitle: 'Rostos Esquecidos', kind: 'event', left: 82, top: 45, connections: ['e1', 'e2'] },

    { id: 'e1', label: 'Parque do Rio', eventTitle: 'Companheiro Imaginário', kind: 'event', left: 28, top: 58, connections: ['f1', 'f2'] },
    { id: 'e2', label: 'Praça da Cultura', eventTitle: 'Sombras no Horizonte', kind: 'event', left: 72, top: 58, connections: ['f2', 'f3'] },

    { id: 'f1', label: 'Passarela Férrea', eventTitle: 'Caminho Sem Volta', kind: 'event', left: 18, top: 71, connections: ['g1', 'g2'] },
    { id: 'f2', label: 'Roda-Gigante', eventTitle: 'Esperança Quebrada', kind: 'event', left: 50, top: 71, connections: ['g1', 'g2'] },
    { id: 'f3', label: 'Valeta Sul', eventTitle: 'Mochila no Caminho', kind: 'event', left: 82, top: 71, connections: ['g1', 'g2'] },

    { id: 'g1', label: 'Viaduto Leste', eventTitle: 'Veículo Abandonado', kind: 'event', left: 28, top: 84, connections: ['border'] },
    { id: 'g2', label: 'Palácio Energetik', eventTitle: null, kind: 'camp', left: 72, top: 84, connections: ['border'] },

    { id: 'border', label: 'Fronteira Norte', eventTitle: null, kind: 'border', left: 50, top: 95, connections: [] },
];

export const MAP_EXPLORABLE_LOCATION_COUNT = MAP_NODES.filter((node) => node.kind === 'event').length;

export class MapManager {
    private readonly _game: Game;
    private readonly _pageTitle: HTMLElement;
    private readonly _pageContent: HTMLElement;
    private readonly _pageActions: HTMLElement;
    private readonly _backButton: HTMLButtonElement;

    constructor() {
        this._game = Game.getInstance();
        this._pageTitle = document.getElementById('map-page-title')!;
        this._pageContent = document.getElementById('map-page-content')!;
        this._pageActions = document.getElementById('map-page-actions')!;
        this._backButton = document.getElementById('map-back-btn') as HTMLButtonElement;
        this._backButton.addEventListener('click', () => this.onBack());
    }

    public get totalLocations(): number {
        return MAP_EXPLORABLE_LOCATION_COUNT;
    }

    public start(): void {
        this._pageTitle.textContent = 'Mapa de Fuga';
        this._pageContent.innerHTML = this.buildMapMarkup();
        this._pageActions.style.display = 'block';
        this.bindNodeEvents();
    }

    private onBack(): void {
        this._game.audioManager.playButtonSound();
        this._game.stateManager.goToState(GameStates.LOG);
    }

    private bindNodeEvents(): void {
        this._pageContent.querySelectorAll<HTMLButtonElement>('[data-node-id]').forEach((button) => {
            button.addEventListener('click', () => {
                const nodeId = button.dataset.nodeId;
                if (!nodeId) return;

                this.onSelectNode(nodeId);
            });
        });
    }

    private onSelectNode(nodeId: string): void {
        const selectedNode = this.getNodeById(nodeId);
        if (!selectedNode || !this.canMoveToNode(selectedNode)) return;

        this._game.audioManager.playButtonSound();
        this._game.state.markTraversedMapEdge(this._game.state.currentMapNodeId, selectedNode.id);
        this._game.state.setCurrentMapNode(selectedNode.id);

        if (selectedNode.kind === 'border') {
            this._game.state.setGameOverMessage('A família atravessou a fronteira depois de encarar tudo que havia pelo caminho.', true);
            this._game.stateManager.goToState(GameStates.GAME_OVER);
            return;
        }

        if (selectedNode.kind !== 'event') {
            this._game.stateManager.goToState(GameStates.MAP);
            return;
        }

        if (this._game.state.hasExploredLocation(selectedNode.id)) {
            this._game.stateManager.goToState(GameStates.MAP);
            return;
        }

        const event = this.getEventForNode(selectedNode);
        if (!event) return;

        this._game.state.markLocationExplored(selectedNode.id);
        this._game.eventManager.queueEvent(event);
        this._game.logManager.travelToSelectedLocation();
    }

    private buildMapMarkup(): string {
        const currentNodeId = this._game.state.currentMapNodeId;
        const edges = this.buildEdgeSvgMarkup();
        const nodes = MAP_NODES.map((node) => this.buildNodeMarkup(node, currentNodeId)).join('');

        return `
            <div class="map-sheet map-sheet--tree">
                <div class="map-graph map-graph--tree">
                    ${edges}
                    ${nodes}
                </div>
            </div>
        `;
    }

    private buildNodeMarkup(node: MapNode, currentNodeId: string): string {
        const isCurrent = node.id === currentNodeId;
        const isVisited = node.kind === 'event' && this._game.state.hasExploredLocation(node.id);
        const isTraversed = this._game.state.hasTraversedMapNode(node.id);
        const canMove = this.canMoveToNode(node);

        const stateClass = isCurrent
            ? 'current'
            : node.kind === 'border'
                ? canMove ? 'border-available' : 'border-locked'
                : isTraversed
                    ? 'traversed'
                : isVisited
                    ? 'locked'
                    : canMove
                        ? 'available'
                        : 'unreachable';

        const disabled = isCurrent || !canMove ? 'disabled' : '';

        return `
            <div class="map-node map-node--${node.kind} map-node--${stateClass}" style="left:${node.left}%; top:${node.top}%;">
                <button class="map-node-button" data-node-id="${node.id}" ${disabled} aria-label="${node.label}">
                    <span class="map-node-dot"></span>
                </button>
                <div class="map-node-label">${node.label}</div>
            </div>
        `;
    }

    private buildEdgeSvgMarkup(): string {
        const rendered = new Set<string>();
        const lines: string[] = [];

        MAP_NODES.forEach((node) => {
            node.connections.forEach((targetId) => {
                const key = [node.id, targetId].sort().join(':');
                if (rendered.has(key)) return;

                const target = this.getNodeById(targetId);
                if (!target) return;

                rendered.add(key);
                const traveledClass = this._game.state.hasTraversedMapEdge(node.id, target.id)
                    || this._game.state.hasTraversedMapEdge(target.id, node.id)
                    ? ' map-edge-line--traversed'
                    : '';
                lines.push(`<line class="map-edge-line${traveledClass}" x1="${node.left}" y1="${node.top}" x2="${target.left}" y2="${target.top}" />`);
            });
        });

        return `
            <svg class="map-edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                ${lines.join('')}
            </svg>
        `;
    }

    private canMoveToNode(node: MapNode): boolean {
        if (node.id === this._game.state.currentMapNodeId) return false;

        const currentNode = this.getNodeById(this._game.state.currentMapNodeId);
        if (!currentNode || !currentNode.connections.includes(node.id)) return false;

        return true;
    }

    private getEventForNode(node: MapNode): Event | null {
        if (!node.eventTitle) return null;

        const eventSeeds = new EventSeeds();
        eventSeeds.start();
        return eventSeeds.events.find((event) => event.title === node.eventTitle) ?? null;
    }

    private getNodeById(nodeId: string): MapNode | undefined {
        return MAP_NODES.find((node) => node.id === nodeId);
    }
}
