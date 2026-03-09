# Get Out — Arquitetura do Projeto

## Visão Geral

Jogo narrativo de sobrevivência baseado em texto. Uma família de 4 pessoas (Dmytro, Olena, Mykola e Sofiia) tenta fugir 300 milhas até a fronteira. Cada hora de caminhada consome sanidade; eventos aleatórios forçam escolhas com ou sem teste de dados.

Stack: TypeScript + Parcel (bundler) + Canvas 2D + Web Audio API. Sem framework de UI.

---

## Estrutura de Arquivos

```
get-out/
├── index.html                  # Todas as páginas do jogo em um único HTML
├── package.json
├── css/
│   ├── normalize.css
│   └── style.css
├── img/
│   ├── characters/             # 4 imagens de personagens
│   ├── places/                 # 4 imagens de locais
│   └── icons/
└── src/
    ├── index.ts                # Entry point — instancia e chama Game.start()
    ├── Game.ts                 # Singleton central do jogo
    ├── entities/
    │   ├── Character.ts        # Personagem com sanidade e status
    │   ├── Event.ts            # Evento narrativo com escolhas
    │   ├── Item.ts             # Item de inventário
    │   ├── Status.ts           # Condição psicológica (aflição)
    │   ├── Clock.ts            # Relógio interno (formato 12h)
    │   └── Dice.ts             # Rolagem de dado 1d6
    ├── enums/
    │   ├── GameStates.ts       # 10 estados de jogo
    │   ├── Difficulties.ts     # 6 níveis de dificuldade
    │   └── Skills.ts           # 4 habilidades (não usadas ainda)
    ├── managers/
    │   ├── StateManager.ts     # Máquina de estados
    │   ├── EventManager.ts     # Exibição de eventos e escolhas
    │   ├── SkillCheckManager.ts# Teste de dados
    │   ├── DiceManager.ts      # Renderização e animação do dado
    │   ├── CharacterManager.ts # Gerencia os 4 personagens
    │   ├── LogManager.ts       # Página principal (status + caminhar)
    │   ├── BagManager.ts       # Inventário
    │   ├── ItemPickerManager.ts# Coleta de itens pós-evento
    │   ├── AudioManager.ts     # Efeitos sonoros e loops
    │   ├── LocalizationManager.ts # i18n (PT-BR / EN-US)
    │   ├── GameOverManager.ts  # Tela de fim de jogo
    │   ├── RipManager.ts       # Tela de morte de personagem
    │   ├── DialogManager.ts    # (stub)
    │   ├── MapManager.ts       # (stub)
    │   └── SkillUpManager.ts   # (stub)
    └── seeds/
        ├── EventSeeds.ts       # Coordenador de eventos
        ├── DmytroEventSeeds.ts # Eventos do Dmytro
        ├── MykolaEventSeeds.ts # Eventos do Mykola
        ├── OlenaEventSeeds.ts  # Eventos da Olena
        ├── SofiiaEventSeeds.ts # Eventos da Sofiia
        ├── ItemSeeds.ts        # 10 itens definidos
        └── AfflictionSeeds.ts  # 10 aflições definidas
```

---

## Padrão de Inicialização

```
index.ts
└── Game.getInstance().start()
    ├── new LocalizationManager()
    ├── new DiceManager("dice-canvas")   ← instância descartável (só chama start())
    ├── new BagManager()
    ├── new CharacterManager()           ← cria os 4 personagens
    ├── new EventManager()               ← carrega todos os eventos
    ├── new GameOverManager()
    ├── new SkillCheckManager()          ← cria o DiceManager real
    ├── new RipManager()
    ├── new Clock(8, true)               ← começa 08:00 AM
    ├── new LogManager()
    ├── new StateManager()
    ├── new ItemPickerManager()
    ├── new AudioManager()
    └── StateManager.goToState(LOG)      ← inicia o jogo
```

---

## Máquina de Estados

### Estados (`GameStates`)

| Estado | Página | Manager |
|--------|--------|---------|
| `LOG` | `#log-page` | LogManager |
| `EVENT` | `#event-page` | EventManager |
| `SKILLCHECK` | `#skill-check-page` | SkillCheckManager |
| `BAG` | `#bag-page` | BagManager |
| `ITEM_PICKER` | `#item-picker-page` | ItemPickerManager |
| `RIP` | `#rip-page` | RipManager |
| `GAME_OVER` | `#game-over-page` | GameOverManager |
| `DIALOG` | `#dialog-page` | *(stub)* |
| `MAP` | `#map-page` | *(stub)* |
| `SKILL_UP` | `#skill-up-page` | *(stub)* |

### Transições

```
LOG ──[walk]──────────────────► EVENT
     │                              │
     │                    [com skillCheck]
     │                              │
     │                         SKILLCHECK
     │                         /        \
     │                    [sucesso]  [falha]
     │                       │          │
     │              [canGiveItems?]      │
     │                  │       └──────►│
     │             ITEM_PICKER          │
     │                  │               │
     └──────────────────┴───────────────► LOG
                                         │
                              [personagem morto?]
                                         │
                                        RIP ──[enterrar]──► LOG

LOG ──[distância ≤ 0 ou Dmytro morto]──► GAME_OVER (terminal)
```

### Regras

- `GAME_OVER` é terminal: `goToState()` retorna imediatamente se o estado atual for `GAME_OVER`
- `hideAllPages()` é chamado a cada transição antes de mostrar a nova página
- Cada estado chama `manager.start()` ao ser ativado

---

## Entidades

### Character

```typescript
class Character {
    _name: string
    _kinship: string          // "you" | "wife" | "son" | "daughter"
    _sanity: number           // 0–100
    _status: Status | null    // aflição atual
    _isDead: boolean
    _buried: boolean
}
```

| Personagem | Kinship |
|------------|---------|
| Dmytro | `"you"` (morte → GAME_OVER) |
| Olena | `"wife"` |
| Mykola | `"son"` |
| Sofiia | `"daughter"` |

**Regras de sanidade:**
- `looseSanity(n)` reduz sanidade (mínimo 0)
- `sanity ≤ 0` → `isDead = true`; se `kinship == "you"` → `GAME_OVER`
- `walkOneHour()` aplica `status.healthPerHour` de dano se tiver aflição

---

### Status (Aflição)

10 aflições, todas negativas:

| Nome | Dano/hora |
|------|-----------|
| Ansiedade | 10 |
| Depressão | 10 |
| Culpa | 15 |
| Medo | 15 |
| Paranoia | 20 |
| Isolamento | 20 |
| Pânico | 25 |
| Alucinações | 25 |
| Desespero | 30 |
| Trauma | 35 |

---

### Event / Choice

```typescript
class Event {
    title: string
    description: string
    image: string
    firstChoice: Choice
    secondChoice: Choice
    type: EventType           // Exploration | Combat | Place | Psychological
    character: Character      // de quem é o evento
    items?: Item[]
}

interface Choice {
    buttonText: string
    skillCheck: boolean
    skillCheckFields?: {
        difficulty: Difficulties
        difficult?: Difficult     // preenchido pelo DiceManager
        canGiveItems: boolean
        resultPath: {
            success: () => void
            failure: () => void
        }
    }
    normalResultPath?: () => void
}
```

---

### Item

10 itens, um para cada aflição:

| Item | Cura |
|------|------|
| Comprimidos de Diazepam | Ansiedade |
| Cartela de Antidepressivos | Depressão |
| Diário Rasgado | Culpa |
| Crucifixo de Bolso | Medo |
| Seringa de Morfina | Paranoia |
| Foto Desgastada | Alucinações |
| Carta de Um Ente Querido | Isolamento |
| Comprimidos de Anfetamina | Pânico |
| Lata de Cafeína Pura | Desespero |
| Kit de Primeiros Socorros | Trauma |

Usar item → `character.removeStatus()` → `item.decreaseAmount()` (remove se chegar a 0).

---

## Fluxo da Caminhada

```
LogManager.onClickWalkBtn()
├── Game.passOneHour()                   → avança relógio, incrementa dia ao meio-dia
├── walkOneHour()
│   ├── para cada personagem vivo:
│   │   ├── character.walkOneHour()      → perde sanidade pelo status atual
│   │   └── se sanidade ≤ 0:
│   │       └── isDead = true
│   │           └── se kinship == "you": GAME_OVER
│   └── distance -= 2
│       └── se distance ≤ 0: GAME_OVER
└── se há personagem morto não enterrado:
    └── goToState(RIP)
    else: goToState(EVENT)
```

---

## Fluxo do Teste de Dados (Skill Check)

```
EventManager.selectChoice(choice)         ← usuário clica em escolha com skillCheck
└── goToState(SKILLCHECK)

SkillCheckManager.start()
├── exibe valor mínimo necessário
├── DiceManager.animateDice()             ← inicia animação do dado
└── setTimeout(100ms) → startDiceRoll()

startDiceRoll()
├── AudioManager.playDiceSound()
└── setTimeout(500ms) → stopShakeDice()

stopShakeDice(dice)
├── Dice.roll()                           ← gera número 1–6
├── DiceManager.stopDice(value)           ← exibe face final
└── avalia resultado:
    ├── roll == 6 → CRITICAL SUCCESS
    ├── roll == 1 → CRITICAL FAILURE
    ├── roll >= expectedValue → SUCCESS → choice.resultPath.success()
    └── roll < expectedValue → FAILURE  → choice.resultPath.failure()
        └── se SUCCESS + canGiveItems: goToState(ITEM_PICKER)
        else: goToState(LOG)
```

### Dificuldades

| Enum | Valor mínimo | Texto | Cor |
|------|-------------|-------|-----|
| TRIVIAL | 1 | Trivial | Verde |
| EASY | 2 | Easy | Verde |
| MEDIUM | 3 | Medium | Verde |
| CHALLENGING | 4 | Challenging | Amarelo |
| VERY_HARD | 5 | Very Hard | Vermelho |
| IMPOSSIBILE | 6 | Impossibile | Vermelho |

---

## Sistema de Eventos

### Seleção de Evento

```
EventManager.start()
├── checkForMileStone()       → milestone em 250, 200, 150, 100, 50 milhas
│   └── se atingido: getMileStoneEvent()
└── getPlaceEvent()
    ├── filtra eventos ainda não disparados
    ├── escolhe aleatoriamente
    └── marca como disparado
```

### Eventos por Personagem (~3 por personagem)

| Personagem | Temas |
|------------|-------|
| Dmytro | Culpa, espelhos, gritos fantasmas |
| Mykola | Eco de choro, amigo imaginário, mente quebrada |
| Olena | Olhos no escuro, sussurros dos mortos, desespero |
| Sofiia | Rostos esquecidos, sombras, medo |

---

## Sistema de Áudio

```typescript
class AudioManager {
    audioEffects: HTMLAudioElement     // efeitos pontuais
    audioBackground: HTMLAudioElement  // sons em loop
    sounds: Map<string, URL>
}
```

| Método | Som | Momento |
|--------|-----|---------|
| `playButtonSound()` | button1.wav | Clique em botão |
| `playDiceSound()` | dice.mp3 | Rolagem do dado |
| `playSuccessSound()` | success.wav | Sucesso no teste |
| `playFailSound()` | fail.mp3 | Falha no teste |
| `playTakeItemSound()` | take-item.wav | Pegar item |
| `playThrowSound()` | throw.wav | Descartar item |
| `playRainSound()` | rain.mp3 | Caminhar (loop) |
| `playWriteSound()` | write.wav | Entrada no log |

---

## Sistema de Log

`LogManager` mantém uma fila de logs temporários exibidos em sequência com delay de 300ms entre entradas. Cada entrada dispara `playWriteSound()`.

Tipos de log gerados:
- Mudança de sanidade de personagens
- Resultado de eventos e escolhas
- Itens coletados ou usados
- Mortes de personagens

---

## Condições de Fim

| Condição | Resultado |
|----------|-----------|
| `distance ≤ 0` | GAME_OVER (vitória) |
| `Dmytro.sanity ≤ 0` | GAME_OVER (derrota) |
| Outro personagem morre | RIP → continua o jogo sem aquele personagem |

---

## Páginas HTML e seus Elementos Principais

| Página | Elementos importantes |
|--------|----------------------|
| `#log-page` | `#travelled-distance`, `#progress-bar`, `#walk-btn`, `#bag-btn`, campos de personagem |
| `#event-page` | `#event-page-title`, `#event-page-description`, `#event-page-image`, `#event-page-choices-btn-list` |
| `#skill-check-page` | `#dice-canvas`, `#skill-check-expected`, `#skill-check-result-label`, `#skill-check-back-btn` |
| `#bag-page` | Lista de itens, botões de usar/descartar, seleção de personagem |
| `#item-picker-page` | Itens encontrados, inventário atual, botões de pegar/deixar |
| `#rip-page` | Imagem do personagem, nome, datas |
| `#game-over-page` | Mensagem, botão de reiniciar |

---

## Relacionamento entre Classes

```
Game (singleton)
├── StateManager          → controla qual página está ativa
├── CharacterManager      → array de 4 Characters
│   └── Character[]       → Dmytro, Olena, Mykola, Sofiia
├── EventManager          → usa EventSeeds, CharacterManager
│   └── EventSeeds        → DmytroEvents, MykolaEvents, OlenaEvents, SofiiaEvents
├── SkillCheckManager     → usa DiceManager, AudioManager, Game.skillCheckResult
│   ├── DiceManager       → canvas 2D do dado
│   └── Dice              → Math.random() 1–6
├── LogManager            → usa CharacterManager, AudioManager
├── BagManager            → usa Item[], Character
├── ItemPickerManager     → usa ItemSeeds, BagManager
├── AudioManager          → HTMLAudioElement × 2
├── RipManager            → usa CharacterManager
├── GameOverManager       → independente
└── LocalizationManager   → JSON de tradução
```
