# Get Out — registro de progresso

Original prompt: faça testes no jogo getout [$develop-web-game](C:\\Users\\andre\\.codex\\skills\\develop-web-game\\SKILL.md)

- 2026-03-19: Skill `develop-web-game` carregado.
- 2026-03-19: Projeto identificado como jogo TypeScript/Parcel com interface DOM multi-página.
- 2026-03-19: `progress.md` criado; instrumentação `window.render_game_to_text` adicionada em `src/index.ts`.
- 2026-03-19: Bugs corrigidos: listener ausente do `Take All`; `AbortError` de áudio em cliques rápidos.

## 2026-07-06 — Revisão completa: começo, meio e fim

Pedido: terminar o jogo com game design completo — estrutura em três atos,
narrativa emocional, todos os sistemas fechados.

### Estrutura narrativa
- **Prólogo novo** (`intro-page` + `IntroManager`): ambientação (fevereiro de 2022,
  família fugindo por uma cidade fantasma até a fronteira norte) e entradas
  iniciais no diário.
- **Três atos** exibidos na barra de jornada por profundidade do mapa (8 etapas):
  Ato I — A Cidade Morta, Ato II — A Longa Descida, Ato III — A Última Milha.
- **Clímax novo**: nó `border` dispara o evento "A Travessia" (rio congelado com
  skill check Difícil, ou espera na madrugada com custo garantido). Falha no rio
  não nega a travessia — cobra 20 de sanidade de Dmytro e de um sobrevivente.
- **Refúgio no Palácio Energetik** (nó g2): momento de esperança antes do fim —
  descansar (+10 para todos) ou vasculhar (itens).
- **Epílogos dinâmicos** (`GameOverManager`): vitória perfeita (4/4), vitória
  amarga (nomeia os mortos + memorial), travessia solitária; derrota com etapa
  em que a jornada parou. Estatísticas: dia, lugares explorados, sobreviventes.
- **16 eventos reescritos** com prosa ancorada nos lugares do mapa e arcos por
  personagem: Dmytro (culpa), Olena (vigilância/fé), Mykola (infância
  interrompida), Sofiia (memória/esperança).

### Sistemas completados
- **Luto**: morte de familiar custa 10 de sanidade aos sobreviventes (piso 5,
  luto nunca mata). Morte de Dmytro = derrota.
- **Acampar**: novo botão, liberado uma vez após cada exploração; +10 para quem
  está são, aflição cobra drenagem ×2 durante a noite; avança 7 horas.
- **Críticos com efeito real**: sucesso crítico remove a aflição do personagem
  (ou +5); falha crítica custa −5 extra.
- **Itens**: bug de instância compartilhada corrigido (clones), item só pode ser
  usado em quem tem a aflição correspondente, pilhas contadas corretamente.
- **Dado**: probabilidades reais exibidas (83/67/50/33/17%), nomes de
  dificuldade em PT.
- **RIP**: dados reais dos personagens (nome, ano de nascimento — 2022),
  citações personalizadas; após o enterro, evento pendente reabre.
- **Roteamento de morte**: RIP imediato após evento/acampamento, sem mensagens
  de game over falsas.
- **Aflições rebalanceadas**: 3–6/hora (antes 10–35, letal demais).
- **Removidos sistemas mortos**: distância/milestones, Dialog/SkillUp stubs,
  enum Skills, doença não usada. UI 100% PT-BR. Dia/hora no diário.

### Verificação
- `scripts/e2e-full-run.js` (Playwright, requer `npx parcel index.html --port 1234`):
  4 cenários, 51 verificações — vitória completa, derrota, luto/RIP/evento
  pendente, vitória amarga com falha no rio. **51/51 passando.**
- Typecheck `tsc --noEmit` (sem strict, padrão do projeto): limpo.
- Build de produção Parcel: ok.
- Bugs reais encontrados pelos testes e corrigidos: ordem de inicialização do
  `ItemPickerManager.start()` (personagem usado antes de resolvido).

## 2026-07-06 — Redesign minimalista (estilo Ord.)

Pedido: reduzir o texto ao mínimo, no estilo do jogo Ord. (histórias contadas
em ~3 palavras: situação → duas escolhas → consequência), mantendo o estilo
visual e todas as mecânicas.

- **Eventos**: títulos de uma palavra com ponto final ("Olhos.", "Escombros.",
  "Sasha.", "Fronteira."), descrições de 2–5 palavras ("O hospital observa."),
  escolhas de 1–2 palavras ("Encarar" / "Apressar").
- **Consequências no diário**: formato `Nome: Palavra. ±N` ("Olena: Paranoia.
  −10", "Dmytro: força. +5"). Luto: "Olena se foi." / "Luto. −10 nos vivos."
- **Prólogo**: palavras empilhadas com fade escalonado — "Guerra. / Uma cidade
  morta. / Quatro nomes. / Uma fronteira. / Juntos. Ou não."
- **Epílogos**: "Quatro partiram. Quatro chegaram." / "«Como?» — «Juntos.»";
  amargo: "Olena ficou. Um lugar vazio à mesa." + memorial; derrota: "A cidade
  guarda os nomes."
- **Botões de check**: só "Encarar · 67%" (cor ainda indica dificuldade; o dado
  esperado comunica o alvo visualmente).
- **UI**: "Diário.", "Mapa.", "O Dado.", "Bolsa.", "Achados.", "Descanse.",
  botões "Seguir/Acampar/Bolsa (n)/Tudo/De novo". Itens com nomes curtos
  ("Diazepam → Ansiedade"). Sanidade exibida só como "85%".
- **Mecânicas intactas**: mesmos valores, mesmos sistemas; `eventTitle` dos nós
  do mapa atualizado para os novos títulos.
- CSS: `.intro-word` (fade escalonado), descrição de evento centrada em fonte
  display maior.
- Verificação: e2e atualizado para os novos textos — **51/51 passando**;
  screenshots em `test-artifacts/shot-*.png`; typecheck e build ok.

## 2026-07-06 — Remoção do acampamento + grade de personagens

- **Acampamento removido por completo** (pedido do usuário): botão, lógica no
  `LogManager`, flag `canCamp` no `GameState`, chamada no `MapManager`,
  `afflictionDrain` no `Character` e instrumentação. Recuperação de sanidade
  agora vem só de sucessos em eventos e do refúgio no Palácio — jornada mais
  tensa por design.
- **Personagens em grade 2×2** no diário (antes: lista de 4 linhas): cards
  compactos com borda e fundo `--c-surface`, retrato 36px, otimizando o espaço
  vertical da tela.
- Verificação: e2e ajustado (A6 vira "não há botão de acampar"; checks de
  acampamento removidos) — **47/47 passando**; screenshot
  `test-artifacts/shot-log-grid.png`; typecheck e build ok.

## 2026-07-06 — Playtest de dificuldade e rebalanceamento

Pedido: jogar de verdade e verificar se o jogo é desafiador — boa estratégia
deve zerar, má estratégia deve falhar.

- **Driver de playtest** (`scripts/playtest.js`, dados reais, sem RNG forçado):
  política GOOD (escolhas seguras, rota por itens/Palácio, usa bolsa, espera na
  fronteira) vs BAD (aposta no dado em tudo, ignora itens/descanso, cruza o gelo).
  Uso: `node scripts/playtest.js <GOOD|BAD> <n>` com o dev server de pé.
- **Diagnóstico no balanceamento antigo**: BAD venceu 6/6 com 0 mortes — o jogo
  não era desafiador (falhas −10/−15 irrisórias num pool de 100).
- **Rebalanceamento**: falha Médio −15, Difícil −20; falha crítica −10 extra;
  aflições 4–8/h de caminhada (espiral da morte se não curar); gelo da fronteira
  −25 em Dmytro + 1 sobrevivente; "Esperar" na fronteira virou teste Médio
  (sucesso cruza limpo, falha −15 em todos) — o final sempre rola dados.
- **Resultado (16 runs BAD, 12 runs GOOD, dados reais)**: GOOD 12/12 vitórias
  (sanidade final 75–100); BAD 4 derrotas (Dmytro morto no gelo ou na estrada
  pela espiral de Trauma) e 7 das 12 vitórias com alguém abaixo de 50.
- **Bug real corrigido pelo playtest**: exceção no `AudioContext` podia travar a
  rolagem do dado (o timeout do resultado era agendado depois do som) — som do
  dado agora é agendado depois do resultado e todo o `AudioManager` é à prova de
  falhas (try/catch → `noSound`).
- e2e atualizado (A11: 75; D8: 65) — **47/47 passando**; typecheck e build ok.

## 2026-07-06 — Estratégia sobre sorte: redesign do sistema de decisão

Pedido: o jogo deve motivar estratégia de verdade (não só dado), com uma
estratégia clara de vitória e uma clara de derrota.

- **Diagnóstico**: a estratégia dominante era degenerada — "nunca role o dado"
  vencia 100% sem interagir com nada (evitar custava −5 fixo, sem risco).
  Itens eram inúteis para o jogador cauteloso.
- **Novas regras** (validadas por Monte Carlo em `scripts/balance-sim.js`,
  20 mil runs/política, antes de aplicar ao código):
  - **Fadiga**: −4 em todos a cada etapa — a estrada em si drena; passividade
    não é grátis (`Character.FATIGUE_PER_HOUR`).
  - **Evitar abala o grupo**: −10 no personagem, −4 nos demais
    (`CharacterManager.applyAvoidCost`).
  - **Sucesso é a fonte de recuperação**: Médio +15, Difícil +20.
  - **Falha**: Médio −18, Difícil −32; **rolar já aflito agrava em 50%**
    (`applyCheckFailure`); crítico −12 extra / crítico bom +10 ou cura aflição.
  - **Luto −25**; **gelo da fronteira −45** em Dmytro + 1; Palácio +15.
  - **Epílogo em camadas** por sanidade média: "Inteiros." / "Cansados. Vivos."
    / "No que restou de vocês."
- **Estratégia clara de vitória (SMART)**: rolar o Médio com quem está saudável
  (nunca com Dmytro, nunca o Difícil, nunca aflito), pegar/usar itens, descansar
  no Palácio, esperar na fronteira → **100% vitória** (sim e browser), chegando
  com 61–87 de sanidade.
- **Estratégia clara de derrota (GAMBLER)**: rolar tudo, ignorar itens/descanso,
  cruzar o gelo → **~50% derrota** (53% sim; 4/10 browser) e 10 mortes de
  família em 10 runs; vitórias raspando.
- **Evitar tudo (TURTLE)**: sobrevive (defeat exige Dmytro a 0), mas chega em
  pedaços (30–57) — o pior final de vitória. Passividade tem preço visível.
- `scripts/playtest.js` agora aceita SMART | TURTLE | GAMBLER.
- e2e atualizado (A11: 66; A16: 82; C2: 75; D8: 26; cura de teste na Olena no
  cenário A) — **47/47 passando**; typecheck e build ok.

## 2026-07-07 — Fotos reais dos lugares do mapa (estilo Chernobyl, P&B)

Pedido: baixar fotos reais e gratuitas de ambientes para cada lugar do mapa
(ambientação Pripyat/Chernobyl, cidade abandonada), respeitando o tamanho e em
preto e branco, e usá-las no jogo.

- **Fonte**: Wikimedia Commons (licenças livres — CC0/CC BY/CC BY-SA), buscadas
  via API. Reprodutível: `scripts/fetch-place-images.mjs` (busca genérica) +
  `scripts/fetch-specific-images.mjs` (3 escolhas manuais que a busca não achou).
- **18 lugares** — uma foto por nó de evento do mapa. Muitos são marcos reais de
  Pripyat: Hospital Nº126, piscina Azure, Palácio Energetik, roda-gigante, mural
  de Gagárin dos Correios, creche com brinquedos. Casos sem match em Pripyat
  usaram análogos coerentes (enfermaria abandonada = Maternidade; supermercado
  saqueado de Pripyat = Farmácia; Lada destruído na neve = "Carro"; rio congelado
  = Fronteira).
- **Processamento** (ffmpeg): escala de cinza (`format=gray`), corte "cover" para
  **640×480 (4:3)** — mesmo padrão das imagens antigas; sobre isso o CSS ainda
  aplica `grayscale/contrast/brightness/sepia` da moldura Polaroid.
- **Fiação**: `EventManager._images` reescrito com 18 chaves `place*`; cada um dos
  18 eventos (Dmytro/Mykola/Olena/Sofiia/Story) aponta para a foto do seu lugar.
  Placeholders antigos (`barn`, `geyser`, `img2..7`, `imgC`, `theme-park`, etc.)
  removidos — 11 arquivos órfãos apagados de `img/places/` após confirmar zero
  referências no repo.
- **Créditos**: `img/places/ATTRIBUTIONS.md` (autor, licença e link do Commons
  por arquivo) — exigência das licenças CC BY/BY-SA.
- **Verificação**: build de produção Parcel ok (as 18 fotos resolvem e entram no
  bundle); tour Playwright `scripts/shot-place-images.js` percorre o mapa e
  fotografa os eventos no jogo — imagens revelam na moldura em P&B
  (`test-artifacts/tour-*.png`).
