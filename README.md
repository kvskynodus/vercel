# catholic-force — C.F.G Force Store

Loja virtual de suplementos, roupas e acessórios de academia, feita com **HTML, CSS e JavaScript puros** (sem framework, sem build, sem servidor). O layout foi feito a partir de um protótipo no Figma e funciona em três tamanhos: **celular**, **tablet** e **desktop**.

Este README explica **todas as linhas** dos três arquivos do projeto. Os números entre parênteses (ex.: `L12`) são os números de linha de cada arquivo, para você abrir o arquivo ao lado e acompanhar.

---

## Sumário

1. [Como rodar o projeto](#1-como-rodar-o-projeto)
2. [Estrutura de arquivos](#2-estrutura-de-arquivos)
3. [Visão geral: como as peças se conectam](#3-visão-geral-como-as-peças-se-conectam)
4. [index.html — linha por linha](#4-indexhtml--linha-por-linha)
5. [style.css — linha por linha](#5-stylecss--linha-por-linha)
6. [script.js — linha por linha](#6-scriptjs--linha-por-linha)
7. [Fluxos completos (o que acontece quando o usuário clica)](#7-fluxos-completos-o-que-acontece-quando-o-usuário-clica)
8. [Limitações conhecidas e ideias de melhoria](#8-limitações-conhecidas-e-ideias-de-melhoria)
9. [Glossário rápido](#9-glossário-rápido)

---

## 1. Como rodar o projeto

1. Baixe/clone a pasta.
2. Abra o arquivo `index.html` no navegador (duplo clique já funciona).
3. (Opcional) Crie uma pasta `img/` ao lado do `index.html` com as fotos dos produtos e do banner. Os nomes esperados são:

| Arquivo              | Usado em                           |
|----------------------|------------------------------------|
| `banner.png`         | Banner "Oferta do dia" da home     |
| `whey.png`           | Whey Protein Isolado 900g          |
| `whey-concentrado.png` | Whey Concentrado 1kg             |
| `whey-hidrolisado.png` | Whey Hidrolisado 900g            |
| `proteina-vegana.png`| Proteína Vegana C.F.G 900g         |
| `beef-protein.png`   | Beef Protein Carnívoro 900g        |
| `albumina.png`       | Albumina Premium 500g              |
| `creatina.png`       | Creatina Monohidratada 300g        |
| `pretreino.png`      | Pré-Treino Apocalypse 300g         |
| `camiseta.png`       | Camiseta de Compressão C.F.G       |
| `coqueteleira.png`   | Coqueteleira Inox C.F.G            |

Se uma imagem não existir, o site **não quebra**: a imagem é escondida e aparece só o fundo rosa-escuro do card (veja `tagImagem` no JavaScript).

---

## 2. Estrutura de arquivos

```
catholic-force/
├── index.html   → a estrutura (o "esqueleto") de todas as telas
├── style.css    → a aparência (cores, tamanhos, layout, responsividade)
├── script.js    → o comportamento (dados dos produtos, carrinho, navegação)
├── README.md    → este arquivo
└── img/         → (opcional, não está no repositório) fotos dos produtos
```

---

## 3. Visão geral: como as peças se conectam

- O site é uma **SPA simples** (Single Page Application = aplicação de página única): existe **um só arquivo HTML**, e dentro dele há **5 "telas"** (`<section class="tela">`): Início, Categorias, Detalhes do Produto, Carrinho e Perfil.
- **Só uma tela aparece por vez.** O CSS esconde todas (`.tela { display: none }`) e mostra apenas a que tem a classe `ativa` (`.tela.ativa { display: block }`).
- O JavaScript troca qual tela tem a classe `ativa` (função `mostrarTela`). Por isso a página nunca recarrega.
- Os **produtos não estão escritos no HTML**. Eles ficam numa lista no JavaScript (`produtos`) e o JS **gera o HTML dos cards** e coloca dentro das `<div>` vazias (`#lista-home`, `#lista-categoria`, `#lista-relacionados`, `#lista-carrinho`).
- Os botões do HTML chamam funções do JavaScript diretamente pelo atributo `onclick="..."`.
- O **menu de baixo** (`<nav class="menu">`) fica fixo na parte de baixo da tela no celular/tablet e vira uma **barra no topo** no desktop (tudo feito só com CSS, via `@media`).

Paleta de cores (do Figma, documentada no topo do CSS):

| Cor       | Uso                                   |
|-----------|---------------------------------------|
| `#360727` | Fundo do app                          |
| `#4d0f38` | Fundo dos cards e botões redondos     |
| `#571642` | Borda dos cards e linhas divisórias   |
| `#27041d` | Menu e áreas mais escuras             |
| `#cf0179` | Rosa de destaque (botões, preços)     |
| `#d4b2c8` | Texto claro secundário                |
| `#57002f` | Fundo de foto enquanto não há imagem  |
| `#a80061` | Rosa mais escuro (hover dos botões)   |
| `#10b981` | Verde ("Grátis" no frete)             |
| `#ff419e` | Contorno de foco do teclado           |

---

## 4. `index.html` — linha por linha

### 4.1 Cabeçalho do documento (L1–L11)

| Linha | Código | Explicação |
|---|---|---|
| L1 | `<!DOCTYPE html>` | Diz ao navegador que o documento é HTML5 (modo padrão, não o "modo de compatibilidade" antigo). |
| L2 | `<html lang="pt-br">` | Abre o documento e declara que o idioma é português do Brasil (ajuda leitores de tela, tradutor automático e o Google). |
| L3 | `<head>` | Começa o cabeçalho: informações sobre a página que não aparecem diretamente na tela. |
| L4 | `<meta charset="UTF-8">` | Define a codificação de caracteres como UTF-8, para acentos (ç, ã, é) e emojis (🛒, 🔍) aparecerem certinhos. |
| L5 | `<meta name="viewport" content="width=device-width, initial-scale=1.0">` | Essencial para celular: faz a largura da página ser igual à largura real da tela do aparelho e começar sem zoom. Sem isso, o celular mostraria a página "miniaturizada". |
| L6 | `<title>C.F.G Force Store</title>` | Texto que aparece na aba do navegador. |
| L7 | `<link rel="preconnect" href="https://fonts.googleapis.com">` | Pede ao navegador para já abrir conexão com o servidor do Google Fonts, deixando o carregamento das fontes mais rápido. |
| L8 | `<link href="https://fonts.googleapis.com/css2?family=Outfit:...&family=Geist:...&display=swap" rel="stylesheet">` | Carrega duas fontes do Google Fonts: **Outfit** (pesos 500, 700, 800, 900 — usada em títulos e botões) e **Geist** (pesos 400, 600, 700, 800, 900 — usada no texto em geral). `display=swap` faz o texto aparecer imediatamente com uma fonte reserva e trocar quando a fonte baixar. |
| L9 | `<link rel="stylesheet" href="style.css">` | Liga o arquivo de estilos do projeto. |
| L10 | `</head>` | Fecha o cabeçalho. |
| L11 | `<body>` | Começa o corpo: tudo que aparece na tela. |
| L12 | *(linha em branco)* | Só espaçamento para leitura. |

### 4.2 Container principal (L13)

| Linha | Código | Explicação |
|---|---|---|
| L13 | `<div class="app">` | Caixa que envolve o site inteiro. No CSS ela tem largura máxima (430px no celular, 760px no tablet, 1200px no desktop) e fica centralizada — simula um "celular" no meio da tela do computador. |
| L14 | *(em branco)* | Espaçamento. |

### 4.3 Tela: Início (L15–L48)

| Linha | Código | Explicação |
|---|---|---|
| L15 | `<!-- TELA: INÍCIO -->` | Comentário HTML (não aparece na tela), só marca onde começa a tela inicial. |
| L16 | `<section class="tela" id="tela-home">` | A tela inicial. A classe `tela` a deixa escondida por padrão; o `id="tela-home"` é usado pelo JS (`mostrarTela('home')` procura `"tela-" + "home"`). |
| L17 | `<header class="topo">` | Faixa do topo da home (logo à esquerda, botões à direita). |
| L18 | `<div class="marca">` | Agrupa o quadradinho da logo e o nome da loja, lado a lado. |
| L19 | `<div class="logo">CFG</div>` | Quadrado com borda rosa e o texto "CFG" — a logo da loja feita só com CSS. |
| L20 | `<h1>C.F.G FORCE STORE</h1>` | Título principal da página (o único `h1`, importante para SEO e acessibilidade). |
| L21 | `</div>` | Fecha `.marca`. |
| L22 | `<div class="acoes">` | Agrupa os botões de ação do topo. |
| L23 | `<button class="btn-redondo" onclick="abrirCategoria('suplementos')">🔍</button>` | Botão redondo de "busca". Como ainda não existe busca de verdade, ele abre a categoria Suplementos. |
| L24 | `<button class="btn-redondo" onclick="alert('Você não tem notificações novas.')">🔔</button>` | Botão de notificações. Mostra uma caixa de alerta do navegador com a mensagem. |
| L25 | `</div>` | Fecha `.acoes`. |
| L26 | `</header>` | Fecha o topo. |
| L27 | *(em branco)* | |
| L28 | `<div class="banner" onclick="abrirCategoria('suplementos')">` | Banner grande da oferta. A caixa inteira é clicável e leva para Suplementos. |
| L29 | `<span class="tag">OFERTA DO DIA</span>` | Etiqueta rosa arredondada no canto do banner. |
| L30 | `<div>` | Agrupa o título e o "Comprar Agora" (para ficarem juntos embaixo; o CSS joga a tag para cima e este bloco para baixo). |
| L31 | `<h2>LINHA MONSTRO COM ATÉ 67% OFF</h2>` | Título do banner. |
| L32 | `<p>Comprar Agora →</p>` | Chamada para ação. |
| L33 | `</div>` | Fecha o agrupamento. |
| L34 | `</div>` | Fecha o banner. |
| L35 | *(em branco)* | |
| L36 | `<div class="pilulas">` | Linha de "pílulas" (botões arredondados) com as categorias. No celular rola para o lado. |
| L37 | `<button onclick="abrirCategoria('suplementos')">Suplementos</button>` | Abre a categoria Suplementos. |
| L38 | `<button onclick="abrirCategoria('roupas')">Roupas</button>` | Abre a categoria Roupas. |
| L39 | `<button onclick="abrirCategoria('equipamentos')">Equipamentos</button>` | Abre Equipamentos (não há produtos nela, então aparece a mensagem de "vazio"). |
| L40 | `<button onclick="abrirCategoria('acessorios')">Acessórios</button>` | Abre Acessórios. Note que o valor passado é sem acento (`acessorios`), igual à chave usada no JS. |
| L41 | `</div>` | Fecha as pílulas. |
| L42 | *(em branco)* | |
| L43 | `<div class="titulo-secao">` | Linha com o título da seção à esquerda e o link "Ver tudo" à direita. |
| L44 | `<h3>Mais Vendidos</h3>` | Título da seção. |
| L45 | `<a onclick="abrirCategoria('suplementos')">Ver tudo</a>` | Link que abre Suplementos. Não tem `href`, então o CSS coloca `cursor: pointer` manualmente para parecer clicável. |
| L46 | `</div>` | Fecha `.titulo-secao`. |
| L47 | `<div class="grade" id="lista-home"></div>` | Grade **vazia** no HTML. O JS (`mostrarHome`) preenche com 4 cards de produto quando a página carrega. |
| L48 | `</section>` | Fecha a tela inicial. |
| L49 | *(em branco)* | |

### 4.4 Tela: Categorias (L50–L65)

| Linha | Código | Explicação |
|---|---|---|
| L50 | `<!-- TELA: CATEGORIAS -->` | Comentário marcador. |
| L51 | `<section class="tela" id="tela-categorias">` | Tela que lista os produtos de uma categoria. |
| L52 | `<header class="cabecalho">` | Cabeçalho padrão das telas internas (botão voltar + textos). |
| L53 | `<button class="btn-redondo" onclick="mostrarTela('home')">←</button>` | Botão voltar: vai para a tela inicial. |
| L54 | `<div class="cabecalho-texto">` | Agrupa título e subtítulo; ocupa todo o espaço que sobrar. |
| L55 | `<h2 id="cat-titulo">Suplementos</h2>` | Nome da categoria. O texto "Suplementos" é só o valor inicial; o JS troca pelo nome da categoria aberta. |
| L56 | `<p id="cat-subtitulo">6 produtos encontrados</p>` | Quantidade de produtos. Também é sobrescrito pelo JS. |
| L57 | `</div>` | Fecha `.cabecalho-texto`. |
| L58 | `</header>` | Fecha o cabeçalho. |
| L59 | *(em branco)* | |
| L60 | `<div class="filtros">` | Linha com os botões de ordenação. |
| L61 | `<button id="ordem-popular" class="ativo" onclick="ordenar('popular')">Popularidade</button>` | Ordena pela nota (maior primeiro). Começa com a classe `ativo` (fica rosa). |
| L62 | `<button id="ordem-preco" onclick="ordenar('preco')">Faixa de Preço</button>` | Ordena pelo preço (menor primeiro). |
| L63 | `</div>` | Fecha `.filtros`. |
| L64 | `<div class="grade" id="lista-categoria"></div>` | Grade vazia preenchida pelo JS (`mostrarCategoria`). |
| L65 | `</section>` | Fecha a tela de categorias. |
| L66 | *(em branco)* | |

### 4.5 Tela: Detalhes do Produto (L67–L107)

| Linha | Código | Explicação |
|---|---|---|
| L67 | `<!-- TELA: DETALHES DO PRODUTO -->` | Comentário marcador. |
| L68 | `<section class="tela" id="tela-produto">` | Tela de um produto específico. Todo o conteúdo é preenchido pelo JS em `abrirProduto`. |
| L69 | `<header class="cabecalho cabecalho-centro">` | Cabeçalho com duas classes: `cabecalho` (estilo base) + `cabecalho-centro` (espalha os 3 itens: esquerda, centro, direita). |
| L70 | `<button class="btn-redondo" onclick="mostrarTela('categorias')">←</button>` | Voltar para a lista de categorias. |
| L71 | `<h2>Detalhes do Produto</h2>` | Título fixo da tela. |
| L72 | `<button class="btn-redondo" id="btn-favorito" onclick="favoritar()">🤍</button>` | Botão de favoritar. O JS alterna entre 🤍 e 💖. |
| L73 | `</header>` | Fecha o cabeçalho. |
| L74 | *(em branco)* | |
| L75 | `<div class="foto-grande" id="det-foto"></div>` | Caixa da foto grande. O JS coloca a `<img>` e o selo "Top Vendas" aqui dentro. |
| L76 | *(em branco)* | |
| L77 | `<div class="detalhe">` | Caixa com todas as informações do produto. |
| L78 | `<h2 id="det-nome"></h2>` | Nome do produto (preenchido pelo JS). |
| L79 | `<p class="avaliacao" id="det-avaliacao"></p>` | Estrelas + nota + número de avaliações (preenchido pelo JS). |
| L80 | `<p class="preco-grande"><span id="det-preco"></span> <s id="det-preco-antigo"></s></p>` | Preço atual (`span`) e preço antigo riscado (`<s>` = texto tachado). O preço antigo só aparece se o produto tiver um. |
| L81 | `<hr>` | Linha horizontal divisória. |
| L82 | *(em branco)* | |
| L83 | `<div id="det-opcoes">` | Bloco de opções (tamanho e sabor). O JS esconde esse bloco inteiro para produtos com `opcoes: false` (ex.: creatina, camiseta). |
| L84 | `<h4>Selecione o tamanho</h4>` | Título das opções de tamanho. |
| L85 | `<div class="opcoes" id="det-tamanhos"></div>` | Botões de tamanho (criados pelo JS: 450g / 900g / 1.8kg). |
| L86 | `<h4>Selecione o sabor</h4>` | Título das opções de sabor. |
| L87 | `<div class="opcoes" id="det-sabores"></div>` | Botões de sabor (criados pelo JS: Baunilha / Chocolate / Morango). |
| L88 | `</div>` | Fecha `#det-opcoes`. |
| L89 | *(em branco)* | |
| L90 | `<div class="compra">` | Linha com o contador de quantidade + botão de adicionar. |
| L91 | `<div class="contador">` | Contador "− 1 +". |
| L92 | `<button onclick="mudarQtdDetalhe(-1)">-</button>` | Diminui a quantidade em 1 (nunca abaixo de 1). |
| L93 | `<span id="det-qtd">1</span>` | Mostra a quantidade atual. |
| L94 | `<button class="mais" onclick="mudarQtdDetalhe(1)">+</button>` | Aumenta a quantidade em 1. A classe `mais` deixa esse botão rosa. |
| L95 | `</div>` | Fecha `.contador`. |
| L96 | `<button class="btn-principal" onclick="adicionarDetalhe()">🛒 ADICIONAR AO CARRINHO</button>` | Botão grande rosa: coloca o produto no carrinho com a quantidade e o sabor escolhidos. |
| L97 | `</div>` | Fecha `.compra`. |
| L98 | *(em branco)* | |
| L99 | `<div class="caixa">` | Caixa com fundo e borda para a descrição. |
| L100 | `<h4>Descrição do produto</h4>` | Título. |
| L101 | `<p id="det-descricao"></p>` | Texto da descrição (preenchido pelo JS). |
| L102 | `</div>` | Fecha `.caixa`. |
| L103 | *(em branco)* | |
| L104 | `<h3 class="titulo-relacionados">Frequentemente Comprados Juntos</h3>` | Título da seção de sugestões. |
| L105 | `<div class="grade" id="lista-relacionados"></div>` | Grade preenchida pelo JS com creatina e coqueteleira (exceto o próprio produto aberto). |
| L106 | `</div>` | Fecha `.detalhe`. |
| L107 | `</section>` | Fecha a tela de produto. |
| L108 | *(em branco)* | |

### 4.6 Tela: Carrinho (L109–L137)

| Linha | Código | Explicação |
|---|---|---|
| L109 | `<!-- TELA: CARRINHO -->` | Comentário marcador. |
| L110 | `<section class="tela" id="tela-carrinho">` | Tela do carrinho de compras. |
| L111 | `<header class="cabecalho cabecalho-centro">` | Cabeçalho com 3 itens espalhados. |
| L112 | `<button class="btn-redondo" onclick="mostrarTela('home')">←</button>` | Voltar para o início. |
| L113 | `<h2>Carrinho</h2>` | Título. |
| L114 | `<span class="contagem" id="carrinho-itens">0 Itens</span>` | "Pílula" com a quantidade total de itens. O JS atualiza (e usa "Item" no singular quando é 1). |
| L115 | `</header>` | Fecha o cabeçalho. |
| L116 | *(em branco)* | |
| L117 | `<div id="lista-carrinho"></div>` | Lista dos itens do carrinho, gerada pelo JS (`mostrarCarrinho`). Se o carrinho estiver vazio, mostra uma mensagem e um botão "Ver produtos". |
| L118 | *(em branco)* | |
| L119 | `<div id="area-resumo">` | Agrupa endereço + resumo do pedido. O JS esconde essa área quando o carrinho está vazio. |
| L120 | `<div class="entrega">` | Linha do endereço de entrega. |
| L121 | `<div class="btn-redondo">📍</div>` | Ícone de alfinete no círculo. É uma `div` (não um botão) porque só reaproveita o visual do `.btn-redondo` — não é clicável. |
| L122 | `<div>` | Agrupa os textos do endereço. |
| L123 | `<strong>Entregar em:</strong>` | Rótulo em negrito. |
| L124 | `<p>R. Visc. de Taunay, 427 - Centro, Joinville - SC</p>` | Endereço fixo (escrito direto no HTML, não vem de cadastro). |
| L125 | `</div>` | Fecha o grupo de textos. |
| L126 | `</div>` | Fecha `.entrega`. |
| L127 | *(em branco)* | |
| L128 | `<div class="resumo">` | Caixa escura com os valores do pedido. |
| L129 | `<h4>Resumo do pedido</h4>` | Título. |
| L130 | `<div class="linha"><span>Subtotal</span><strong id="resumo-subtotal">R$ 0,00</strong></div>` | Linha "Subtotal ........ R$ X". O valor é atualizado pelo JS. |
| L131 | `<div class="linha"><span>Frete (Sedex)</span><strong class="verde">Grátis</strong></div>` | Frete sempre grátis (texto fixo, em verde). |
| L132 | `<hr>` | Divisória. |
| L133 | `<div class="linha total"><span>Total Geral</span><strong id="resumo-total">R$ 0,00</strong></div>` | Total geral, com destaque (classe `total`). Como o frete é grátis, é igual ao subtotal. |
| L134 | `<button class="btn-principal" onclick="finalizar()">FINALIZAR COMPRA</button>` | Finaliza o pedido: mostra um alerta e esvazia o carrinho. |
| L135 | `</div>` | Fecha `.resumo`. |
| L136 | `</div>` | Fecha `#area-resumo`. |
| L137 | `</section>` | Fecha a tela do carrinho. |
| L138 | *(em branco)* | |

### 4.7 Tela: Perfil (L139–L147)

| Linha | Código | Explicação |
|---|---|---|
| L139 | `<!-- TELA: PERFIL -->` | Comentário marcador. |
| L140 | `<section class="tela" id="tela-perfil">` | Tela de perfil (ainda não implementada). |
| L141 | `<header class="cabecalho">` | Cabeçalho padrão (sem botão voltar). |
| L142 | `<div class="cabecalho-texto">` | Agrupa os textos. |
| L143 | `<h2>Perfil</h2>` | Título. |
| L144 | `<p>Esta tela ainda está em construção.</p>` | Aviso de que é um placeholder. |
| L145 | `</div>` | Fecha `.cabecalho-texto`. |
| L146 | `</header>` | Fecha o cabeçalho. |
| L147 | `</section>` | Fecha a tela de perfil. |
| L148 | *(em branco)* | |

### 4.8 Menu de navegação (L149–L159)

| Linha | Código | Explicação |
|---|---|---|
| L149 | `<!-- MENU DE BAIXO -->` | Comentário marcador. |
| L150 | `<nav class="menu">` | Menu principal (`<nav>` = elemento semântico de navegação). Fica **fora** das seções, então aparece em todas as telas. |
| L151 | `<div class="marca menu-marca">` | Logo + nome da loja **dentro do menu**. Fica escondido no celular/tablet (`.menu-marca { display:none }`) e só aparece no desktop, quando o menu vira barra do topo. |
| L152 | `<div class="logo">CFG</div>` | Quadradinho da logo (mesmo estilo do topo da home). |
| L153 | `<strong>C.F.G FORCE STORE</strong>` | Nome da loja. |
| L154 | `</div>` | Fecha a marca. |
| L155 | `<button id="aba-home" onclick="mostrarTela('home')"><span>🏠</span>Início</button>` | Aba Início. O `id` é usado por `mostrarTela` para pintar a aba ativa de rosa. O ícone fica num `<span>` separado para o CSS poder posicioná-lo. |
| L156 | `<button id="aba-categorias" onclick="abrirCategoria('suplementos')"><span>▦</span>Categorias</button>` | Aba Categorias — abre Suplementos por padrão. |
| L157 | `<button id="aba-carrinho" onclick="mostrarTela('carrinho')"><span>🛒<b id="selo">0</b></span>Carrinho</button>` | Aba Carrinho. O `<b id="selo">` é a bolinha rosa com o número de itens, atualizada pelo JS (`atualizarSelo`) e escondida quando é zero. |
| L158 | `<button id="aba-perfil" onclick="mostrarTela('perfil')"><span>👤</span>Perfil</button>` | Aba Perfil. |
| L159 | `</nav>` | Fecha o menu. |
| L160 | *(em branco)* | |

### 4.9 Final do documento (L161–L165)

| Linha | Código | Explicação |
|---|---|---|
| L161 | `</div>` | Fecha a `div.app` aberta na L13. |
| L162 | *(em branco)* | |
| L163 | `<script src="script.js"></script>` | Carrega o JavaScript. Fica **no final do `body`** de propósito: assim, quando o script roda, todos os elementos HTML já existem e o `document.getElementById(...)` consegue encontrá-los. |
| L164 | `</body>` | Fecha o corpo. |
| L165 | `</html>` | Fecha o documento. |

---

## 5. `style.css` — linha por linha

> Lembrete rápido de CSS: cada bloco tem um **seletor** (quem será estilizado) e, entre `{ }`, **propriedades** (`propriedade: valor;`). Seletores com `.` são classes, com `#` são ids, e sem nada são tags (`button`, `body`). Um espaço entre seletores (`.banner h2`) significa "um `h2` que está dentro de `.banner`".

### 5.1 Comentário de cores (L1–L6)

| Linha | Explicação |
|---|---|
| L1–L6 | Comentário (`/* ... */`) listando as cores tiradas do Figma: fundo `#360727`, cards `#4d0f38` com borda `#571642`, menu `#27041d`, rosa `#cf0179` e texto claro `#d4b2c8`. Não tem efeito no visual, só documenta. |
| L7 | Em branco. |

### 5.2 Reset e estilos globais (L8–L28)

| Linha | Código | Explicação |
|---|---|---|
| L8 | `* {` | O `*` seleciona **todos** os elementos da página. |
| L9 | `margin: 0;` | Tira as margens que o navegador coloca por padrão (ex.: em `h1`, `p`, `body`). |
| L10 | `padding: 0;` | Tira os preenchimentos padrão. |
| L11 | `box-sizing: border-box;` | Faz `width`/`height` **incluírem** padding e borda. Ex.: um botão de `width: 40px` com borda continua tendo 40px no total. Facilita muito o layout. |
| L12 | `}` | Fecha o bloco. |
| L14 | `body {` | Estilos da página inteira. |
| L15 | `font-family: 'Geist', Arial, sans-serif;` | Fonte padrão do texto: Geist; se não carregar, Arial; se não houver, qualquer fonte sem serifa. |
| L16 | `background-color: #1a1a1a;` | Fundo cinza bem escuro **fora** do "celular" (visível nas laterais em telas grandes). |
| L17 | `color: white;` | Texto branco por padrão. |
| L18 | `}` | |
| L20 | `h1, h2, h3, h4, button {` | A vírgula aplica o mesmo estilo a vários seletores. |
| L21 | `font-family: 'Outfit', Arial, sans-serif;` | Títulos e botões usam a fonte Outfit (mais "esportiva"). |
| L22 | `}` | |
| L24 | `button {` | Estilo base de todos os botões. |
| L25 | `cursor: pointer;` | Mostra a "mãozinha" ao passar o mouse. |
| L26 | `border: none;` | Tira a borda padrão cinza do navegador. |
| L27 | `color: white;` | Texto branco (botões não herdam a cor do body por padrão). |
| L28 | `}` | |

### 5.3 O "celular" e o sistema de telas (L30–L46)

| Linha | Código | Explicação |
|---|---|---|
| L30 | `/* O "celular" no meio da tela */` | Comentário. |
| L31 | `.app {` | A caixa principal (`<div class="app">`). |
| L32 | `max-width: 430px;` | No máximo 430px de largura (tamanho de um celular grande). |
| L33 | `min-height: 100vh;` | Altura mínima = 100% da altura da janela (`vh` = viewport height), para o fundo roxo ir até embaixo mesmo com pouco conteúdo. |
| L34 | `margin: 0 auto;` | Margem 0 em cima/embaixo e `auto` nas laterais → centraliza horizontalmente. |
| L35 | `background-color: #360727;` | Fundo vinho do app. |
| L36 | `position: relative;` | Cria um ponto de referência para elementos posicionados dentro dele. |
| L37 | `}` | |
| L39 | `.tela {` | Toda `<section class="tela">`. |
| L40 | `display: none;` | **Escondida por padrão.** |
| L41 | `padding-bottom: 110px;` | Espaço no fim de cada tela para o conteúdo não ficar escondido atrás do menu fixo de baixo (84px de altura + folga). |
| L42 | `}` | |
| L44 | `.tela.ativa {` | Seletor **sem espaço** = elemento que tem as duas classes ao mesmo tempo. |
| L45 | `display: block;` | Mostra a tela ativa. É assim que a navegação funciona: o JS só troca a classe. |
| L46 | `}` | |

### 5.4 Topo da home (L48–L93)

| Linha | Código | Explicação |
|---|---|---|
| L48 | comentário | Marca a seção. |
| L49 | `.topo {` | O `<header>` do topo da home. |
| L50 | `display: flex;` | Coloca os filhos (marca e ações) lado a lado. |
| L51 | `justify-content: space-between;` | Joga o primeiro filho para a esquerda e o último para a direita. |
| L52 | `align-items: center;` | Centraliza verticalmente. |
| L53 | `padding: 24px 24px 12px;` | Espaço interno: 24 em cima, 24 nas laterais, 12 embaixo. |
| L54 | `}` | |
| L56 | `.marca {` | Logo + nome. |
| L57 | `display: flex;` | Lado a lado. |
| L58 | `align-items: center;` | Alinhados no meio. |
| L59 | `gap: 12px;` | 12px de espaço entre eles. |
| L60 | `}` | |
| L62 | `.logo {` | Quadradinho "CFG". |
| L63–L64 | `width: 36px; height: 36px;` | Tamanho fixo 36×36. |
| L65 | `border: 2px solid #cf0179;` | Borda rosa de 2px. |
| L66 | `display: flex;` | Ativa flexbox para centralizar o texto. |
| L67 | `align-items: center;` | Centro vertical. |
| L68 | `justify-content: center;` | Centro horizontal. |
| L69 | `font-family: 'Outfit', sans-serif;` | Fonte Outfit (é uma `div`, não pegaria Outfit da regra de títulos). |
| L70 | `font-weight: 900;` | Peso máximo (bem negrito). |
| L71 | `font-size: 12px;` | Texto pequeno para caber. |
| L72 | `}` | |
| L74 | `.marca h1 {` | Nome da loja no topo. |
| L75 | `font-size: 18px;` | Tamanho. |
| L76 | `font-weight: 800;` | Negrito forte. |
| L77 | `}` | |
| L79 | `.acoes {` | Botões 🔍 🔔. |
| L80 | `display: flex;` | Lado a lado. |
| L81 | `gap: 12px;` | Espaço entre eles. |
| L82 | `}` | |
| L84 | `.btn-redondo {` | Botão circular reutilizado em várias telas (voltar, favoritar, busca, 📍). |
| L85–L86 | `width: 40px; height: 40px;` | 40×40. |
| L87 | `border-radius: 20px;` | Raio = metade do tamanho → vira um círculo. |
| L88 | `background-color: #4d0f38;` | Fundo de card. |
| L89 | `font-size: 16px;` | Tamanho do ícone/emoji. |
| L90–L92 | `display: flex; align-items: center; justify-content: center;` | Centraliza o ícone dentro do círculo. |
| L93 | `}` | |

### 5.5 Banner (L95–L132)

| Linha | Código | Explicação |
|---|---|---|
| L95 | comentário | |
| L96 | `.banner {` | Banner "Oferta do dia". |
| L97 | `margin: 16px 24px;` | 16px em cima/embaixo, 24px nas laterais. |
| L98 | `height: 190px;` | Altura fixa no celular. |
| L99 | `padding: 24px;` | Espaço interno. |
| L100 | `border-radius: 24px;` | Cantos arredondados. |
| L101 | `background: linear-gradient(120deg, #360727 30%, #7a0c52);` | Degradê diagonal de vinho para rosa-escuro. **Observação:** a linha seguinte sobrescreve a imagem de fundo, então na prática esse degradê não aparece (ele funcionaria como "plano B" se a L102 fosse removida). |
| L102 | `background-image: linear-gradient(rgba(54,7,39,0.5), rgba(54,7,39,0.5)), url("img/banner.png");` | Duas camadas de fundo: em cima, uma "película" vinho 50% transparente (para o texto branco ficar legível); embaixo, a foto `img/banner.png`. |
| L103 | `background-size: cover;` | A foto cobre toda a caixa (cortando o que sobrar, sem distorcer). |
| L104 | `background-position: center;` | A foto fica centralizada. |
| L105 | `display: flex;` | Flexbox... |
| L106 | `flex-direction: column;` | ...em coluna (um embaixo do outro). |
| L107 | `justify-content: space-between;` | Tag lá em cima, título/chamada lá embaixo. |
| L108 | `align-items: flex-start;` | Alinha tudo à esquerda (e impede a tag de esticar na largura toda). |
| L109 | `cursor: pointer;` | Mãozinha — o banner é clicável. |
| L110 | `}` | |
| L112 | `.tag {` | Etiqueta "OFERTA DO DIA". |
| L113 | `background-color: #cf0179;` | Fundo rosa. |
| L114 | `padding: 4px 10px;` | 4px vertical, 10px horizontal. |
| L115 | `border-radius: 100px;` | Raio enorme → formato de pílula. |
| L116 | `font-family: 'Outfit', sans-serif;` | Fonte Outfit. |
| L117 | `font-weight: 800;` | Negrito. |
| L118 | `font-size: 11px;` | Pequeno. |
| L119 | `}` | |
| L121 | `.banner h2 {` | Título do banner. |
| L122 | `font-size: 22px;` | Tamanho. |
| L123 | `font-weight: 900;` | Peso máximo. |
| L124 | `width: 150px;` | Largura limitada para forçar quebra em várias linhas (efeito visual do Figma). |
| L125 | `margin-bottom: 6px;` | Espaço antes do "Comprar Agora". |
| L126 | `}` | |
| L128 | `.banner p {` | "Comprar Agora →". |
| L129 | `font-size: 13px;` | Tamanho. |
| L130 | `font-weight: 600;` | Semi-negrito. |
| L131 | `color: #d4b2c8;` | Rosa claro. |
| L132 | `}` | |

### 5.6 Pílulas de categoria e título de seção (L134–L173)

| Linha | Código | Explicação |
|---|---|---|
| L134 | comentário | |
| L135 | `.pilulas {` | Linha de botões de categoria. |
| L136 | `display: flex;` | Lado a lado. |
| L137 | `gap: 10px;` | Espaço entre botões. |
| L138 | `padding: 12px 24px 20px;` | Espaço interno. |
| L139 | `overflow-x: auto;` | Se não couber na largura, aparece rolagem horizontal (deslizar com o dedo no celular). |
| L140 | `}` | |
| L142 | `.pilulas button {` | Cada pílula. |
| L143 | `background-color: #4d0f38;` | Fundo de card. |
| L144 | `border: 1px solid #571642;` | Borda sutil. |
| L145 | `padding: 10px 18px;` | Espaço interno. |
| L146 | `border-radius: 20px;` | Arredondado. |
| L147 | `font-size: 13px;` | Tamanho do texto. |
| L148 | `font-weight: 700;` | Negrito. |
| L149 | `white-space: nowrap;` | Não deixa o texto quebrar em duas linhas. |
| L150 | `}` | |
| L152 | `.pilulas button:hover {` | `:hover` = quando o mouse está em cima. |
| L153 | `background-color: #cf0179;` | Fica rosa. |
| L154 | `}` | |
| L156 | `.titulo-secao {` | Linha "Mais Vendidos ... Ver tudo". |
| L157–L159 | `display: flex; justify-content: space-between; align-items: center;` | Título à esquerda, link à direita, centralizados verticalmente. |
| L160 | `padding: 0 24px 16px;` | Laterais 24, embaixo 16. |
| L161 | `}` | |
| L163 | `.titulo-secao h3 {` | "Mais Vendidos". |
| L164 | `font-size: 18px;` | |
| L165 | `font-weight: 800;` | |
| L166 | `}` | |
| L168 | `.titulo-secao a {` | "Ver tudo". |
| L169 | `color: #cf0179;` | Rosa. |
| L170 | `font-size: 13px;` | |
| L171 | `font-weight: 600;` | |
| L172 | `cursor: pointer;` | Mãozinha (necessário porque o `<a>` não tem `href`). |
| L173 | `}` | |

### 5.7 Grade e cards de produto (L175–L255)

| Linha | Código | Explicação |
|---|---|---|
| L175 | comentário | |
| L176 | `.grade {` | Grade de produtos (home, categorias, relacionados). |
| L177 | `display: grid;` | Usa CSS Grid (layout em linhas e colunas). |
| L178 | `grid-template-columns: 1fr 1fr;` | 2 colunas de tamanho igual (`fr` = fração do espaço livre). |
| L179 | `gap: 16px;` | Espaço entre os cards. |
| L180 | `padding: 0 24px;` | Margem interna lateral. |
| L181 | `}` | |
| L183 | `.card {` | Card de produto (gerado pelo JS em `criarCard`). |
| L184 | `background-color: #4d0f38;` | Fundo. |
| L185 | `border: 1px solid #571642;` | Borda. |
| L186 | `border-radius: 20px;` | Cantos arredondados. |
| L187 | `overflow: hidden;` | Corta o que passar das bordas (para a foto respeitar os cantos arredondados). |
| L188 | `cursor: pointer;` | Card clicável. |
| L189 | `}` | |
| L191 | `.card-foto {` | Área da foto. |
| L192 | `height: 170px;` | Altura fixa. |
| L193 | `background-color: #57002f;` | Fundo que aparece se a imagem não existir. |
| L194 | `}` | |
| L196 | `.card-foto img {` | A imagem dentro da área. |
| L197–L198 | `width: 100%; height: 100%;` | Ocupa a área toda. |
| L199 | `object-fit: cover;` | Preenche sem distorcer (corta as sobras). |
| L200 | `display: block;` | Remove o espacinho fantasma que imagens `inline` deixam embaixo. |
| L201 | `}` | |
| L203 | `.card-info {` | Parte de baixo do card (textos). |
| L204 | `padding: 16px;` | |
| L205–L206 | `display: flex; flex-direction: column;` | Itens empilhados. |
| L207 | `gap: 8px;` | Espaço entre eles. |
| L208 | `}` | |
| L210 | `.card-meta {` | Linha "TIPO ........ ☆ 4.9". |
| L211–L212 | `display: flex; justify-content: space-between;` | Tipo à esquerda, nota à direita. |
| L213 | `font-size: 10px;` | |
| L214 | `font-weight: 600;` | |
| L215 | `color: #d4b2c8;` | Rosa claro. |
| L216 | `text-transform: uppercase;` | Tudo em MAIÚSCULAS (só visualmente). |
| L217 | `}` | |
| L219 | `.card-meta b {` | A nota. |
| L220 | `font-size: 12px;` | Um pouco maior. |
| L221 | `color: white;` | Branca. |
| L222 | `}` | |
| L224 | `.card-meta .estrela {` | A estrelinha ☆. |
| L225 | `color: #cf0179;` | Rosa. |
| L226 | `}` | |
| L228 | `.card-nome {` | Nome do produto. |
| L229 | `font-family: 'Outfit', sans-serif;` | |
| L230 | `font-size: 15px;` | |
| L231 | `font-weight: 700;` | |
| L232 | `white-space: nowrap;` | Uma linha só... |
| L233 | `overflow: hidden;` | ...corta o que passar... |
| L234 | `text-overflow: ellipsis;` | ...e coloca "..." no final. As 3 linhas juntas são a receita clássica de "truncar com reticências". |
| L235 | `}` | |
| L237 | `.card-preco {` | Linha "R$ 189,90 ........ (+)". |
| L238–L240 | `display: flex; justify-content: space-between; align-items: center;` | Preço à esquerda, botão à direita. |
| L241 | `font-size: 16px;` | |
| L242 | `font-weight: 800;` | |
| L243 | `}` | |
| L245 | `.btn-mais {` | Botão "+" do card (adiciona direto ao carrinho). |
| L246–L247 | `width: 32px; height: 32px;` | |
| L248 | `border-radius: 16px;` | Círculo. |
| L249 | `background-color: #cf0179;` | Rosa. |
| L250 | `font-size: 18px;` | |
| L251 | `}` | |
| L253 | `.btn-mais:hover {` | Mouse em cima: |
| L254 | `background-color: #a80061;` | rosa mais escuro. |
| L255 | `}` | |

### 5.8 Cabeçalho das telas internas (L257–L295)

| Linha | Código | Explicação |
|---|---|---|
| L257 | comentário | |
| L258 | `.cabecalho {` | Cabeçalho de Categorias/Produto/Carrinho/Perfil. |
| L259–L260 | `display: flex; align-items: center;` | Itens lado a lado e centralizados. |
| L261 | `gap: 16px;` | Espaço entre eles. |
| L262 | `padding: 24px 24px 16px;` | |
| L263 | `}` | |
| L265 | `.cabecalho-centro {` | Variante com 3 itens. |
| L266 | `justify-content: space-between;` | Esquerda / meio / direita. |
| L267 | `}` | |
| L269 | `.cabecalho-centro h2 {` | Título do meio. |
| L270 | `font-size: 16px;` | |
| L271 | `font-weight: 800;` | |
| L272 | `}` | |
| L274 | `.cabecalho-texto {` | Bloco de título + subtítulo. |
| L275 | `flex: 1;` | Cresce e ocupa todo o espaço que sobrar. |
| L276 | `}` | |
| L278 | `.cabecalho-texto h2 {` | |
| L279 | `font-size: 20px;` | |
| L280 | `font-weight: 800;` | |
| L281 | `}` | |
| L283 | `.cabecalho-texto p {` | Subtítulo. |
| L284 | `font-size: 12px;` | |
| L285 | `color: #d4b2c8;` | |
| L286 | `}` | |
| L288 | `.contagem {` | Pílula "3 Itens" do carrinho. |
| L289 | `background-color: #4d0f38;` | |
| L290 | `color: #cf0179;` | Texto rosa. |
| L291 | `font-size: 12px;` | |
| L292 | `font-weight: 700;` | |
| L293 | `padding: 6px 12px;` | |
| L294 | `border-radius: 100px;` | Pílula. |
| L295 | `}` | |

### 5.9 Filtros (L297–L323)

| Linha | Código | Explicação |
|---|---|---|
| L297 | comentário | |
| L298 | `.filtros {` | Linha de botões de ordenação. |
| L299 | `display: flex;` | |
| L300 | `gap: 12px;` | |
| L301 | `padding: 0 24px 20px;` | |
| L302 | `}` | |
| L304 | `.filtros button {` | Cada botão de filtro. |
| L305 | `background-color: #4d0f38;` | |
| L306 | `border: 1px solid #571642;` | |
| L307 | `padding: 8px 16px;` | |
| L308 | `border-radius: 12px;` | Menos arredondado que as pílulas. |
| L309 | `font-size: 12px;` | |
| L310 | `font-weight: 700;` | |
| L311 | `}` | |
| L313 | `.filtros button.ativo {` | O filtro selecionado: |
| L314 | `background-color: #cf0179;` | fundo rosa |
| L315 | `border-color: #cf0179;` | e borda rosa. |
| L316 | `}` | |
| L318 | `.vazio {` | Mensagem "Ainda não temos produtos nesta categoria." |
| L319 | `grid-column: 1 / -1;` | Ocupa da primeira até a última coluna da grade (largura toda). |
| L320 | `text-align: center;` | Centralizada. |
| L321 | `color: #d4b2c8;` | |
| L322 | `padding: 40px 0;` | Espaço em cima e embaixo. |
| L323 | `}` | |

### 5.10 Detalhe do produto (L325–L496)

| Linha | Código | Explicação |
|---|---|---|
| L325 | comentário | |
| L326 | `.foto-grande {` | Foto principal do produto. |
| L327 | `margin: 12px 24px;` | |
| L328 | `height: 320px;` | |
| L329 | `border-radius: 30px;` | |
| L330 | `background-color: #57002f;` | Fundo se não houver imagem. |
| L331 | `overflow: hidden;` | Corta a imagem nos cantos. |
| L332 | `position: relative;` | Referência para o selo "Top Vendas" (que é `absolute`). |
| L333 | `}` | |
| L335–L340 | `.foto-grande img { width:100%; height:100%; object-fit:cover; display:block; }` | Mesma lógica da foto do card: preenche a caixa sem distorcer. |
| L342 | `.selo-vendas {` | Selo "Top Vendas" no canto da foto. |
| L343 | `position: absolute;` | Posicionado em relação à `.foto-grande`. |
| L344–L345 | `top: 0; left: 0;` | Canto superior esquerdo. |
| L346 | `background-color: #cf0179;` | |
| L347 | `font-family: 'Outfit', sans-serif;` | |
| L348 | `font-weight: 800;` | |
| L349 | `font-size: 11px;` | |
| L350 | `padding: 3px 14px;` | |
| L351 | `border-radius: 0 0 30px 0;` | Arredonda só o canto inferior direito (ordem: sup-esq, sup-dir, inf-dir, inf-esq). |
| L352 | `}` | |
| L354 | `.detalhe {` | Área de informações. |
| L355 | `padding: 12px 24px;` | |
| L356 | `}` | |
| L358 | `.detalhe h2 {` | Nome do produto. |
| L359 | `font-size: 24px;` | |
| L360 | `font-weight: 900;` | |
| L361 | `margin-bottom: 6px;` | |
| L362 | `}` | |
| L364 | `.avaliacao {` | Linha de estrelas. |
| L365 | `font-size: 12px;` | |
| L366 | `font-weight: 600;` | |
| L367 | `color: #d4b2c8;` | |
| L368 | `margin-bottom: 12px;` | |
| L369 | `}` | |
| L371 | `.avaliacao .estrelas {` | As ★★★★★. |
| L372 | `color: #cf0179;` | Rosa. |
| L373 | `}` | |
| L375 | `.preco-grande {` | Preço atual. |
| L376 | `font-size: 28px;` | |
| L377 | `font-weight: 900;` | |
| L378 | `color: #cf0179;` | |
| L379 | `}` | |
| L381 | `.preco-grande s {` | Preço antigo riscado. |
| L382 | `font-size: 16px;` | Menor. |
| L383 | `font-weight: 400;` | Normal. |
| L384 | `color: #d4b2c8;` | Mais apagado. |
| L385 | `margin-left: 8px;` | Afastado do preço atual. |
| L386 | `}` | |
| L388 | `hr {` | Todas as linhas divisórias. |
| L389 | `border: none;` | Tira o estilo padrão (linha 3D cinza). |
| L390 | `border-top: 1px solid #571642;` | Coloca só uma linha fina em cima. |
| L391 | `margin: 20px 0;` | Espaço em cima e embaixo. |
| L392 | `}` | |
| L394 | `.detalhe h4 {` | "Selecione o tamanho", "Selecione o sabor", "Descrição do produto". |
| L395 | `font-size: 14px;` | |
| L396 | `font-weight: 800;` | |
| L397 | `text-transform: uppercase;` | MAIÚSCULAS. |
| L398 | `margin-bottom: 12px;` | |
| L399 | `}` | |
| L401 | `.opcoes {` | Linha de botões de tamanho/sabor. |
| L402 | `display: flex;` | |
| L403 | `flex-wrap: wrap;` | Se não couber, quebra para a linha de baixo. |
| L404 | `gap: 8px;` | |
| L405 | `margin-bottom: 20px;` | |
| L406 | `}` | |
| L408 | `.opcoes button {` | Cada opção. |
| L409 | `background-color: #4d0f38;` | |
| L410 | `border: 1px solid #571642;` | |
| L411 | `padding: 10px 16px;` | |
| L412 | `border-radius: 14px;` | |
| L413 | `font-size: 12px;` | |
| L414 | `font-weight: 700;` | |
| L415 | `}` | |
| L417 | `.opcoes button.ativo {` | Opção escolhida: |
| L418–L419 | `background-color: #cf0179; border-color: #cf0179;` | toda rosa. |
| L420 | `}` | |
| L422 | `.compra {` | Linha contador + botão. |
| L423 | `display: flex;` | |
| L424 | `align-items: center;` | |
| L425 | `gap: 16px;` | |
| L426 | `margin-bottom: 24px;` | |
| L427 | `}` | |
| L429 | `.contador {` | Caixa "− 1 +" (também usada no carrinho). |
| L430 | `display: flex;` | |
| L431 | `align-items: center;` | |
| L432 | `gap: 12px;` | |
| L433 | `background-color: #4d0f38;` | |
| L434 | `border: 1px solid #571642;` | |
| L435 | `border-radius: 18px;` | Metade da altura → pílula. |
| L436 | `height: 36px;` | |
| L437 | `padding: 0 6px;` | |
| L438 | `font-weight: 700;` | Número em negrito. |
| L439 | `}` | |
| L441 | `.contador button {` | Botões − e +. |
| L442–L443 | `width: 26px; height: 26px;` | |
| L444 | `border-radius: 13px;` | Círculo. |
| L445 | `background-color: #27041d;` | Escuro. |
| L446 | `font-size: 16px;` | |
| L447 | `}` | |
| L449 | `.contador button.mais {` | Só o botão +: |
| L450 | `background-color: #cf0179;` | rosa. |
| L451 | `}` | |
| L453 | `.btn-principal {` | Botões grandes ("Adicionar ao carrinho", "Finalizar compra"). |
| L454 | `background-color: #cf0179;` | |
| L455 | `height: 54px;` | |
| L456 | `border-radius: 27px;` | Pílula. |
| L457 | `font-size: 16px;` | |
| L458 | `font-weight: 800;` | |
| L459 | `}` | |
| L461 | `.compra .btn-principal {` | Só o botão principal que está dentro de `.compra`: |
| L462 | `flex: 1;` | estica para ocupar o resto da linha |
| L463 | `font-size: 14px;` | e usa fonte um pouco menor. |
| L464 | `}` | |
| L466 | `.btn-principal:hover {` | |
| L467 | `background-color: #a80061;` | Rosa escuro no hover. |
| L468 | `}` | |
| L470 | `.caixa {` | Caixa da descrição. |
| L471 | `background-color: #4d0f38;` | |
| L472 | `border: 1px solid #571642;` | |
| L473 | `border-radius: 20px;` | |
| L474 | `padding: 16px;` | |
| L475 | `margin-bottom: 24px;` | |
| L476 | `}` | |
| L478 | `.caixa h4 {` | |
| L479 | `margin-bottom: 12px;` | |
| L480 | `}` | |
| L482 | `.caixa p {` | Texto da descrição. |
| L483 | `font-size: 13px;` | |
| L484 | `line-height: 1.5;` | Altura de linha 1,5× o tamanho da fonte → leitura confortável. |
| L485 | `color: #d4b2c8;` | |
| L486 | `}` | |
| L488 | `.titulo-relacionados {` | "Frequentemente Comprados Juntos". |
| L489 | `font-size: 16px;` | |
| L490 | `font-weight: 800;` | |
| L491 | `margin-bottom: 16px;` | |
| L492 | `}` | |
| L494 | `.detalhe .grade {` | A grade de relacionados (dentro de `.detalhe`): |
| L495 | `padding: 0;` | tira o padding lateral, porque `.detalhe` já tem. |
| L496 | `}` | |

### 5.11 Carrinho (L498–L657)

| Linha | Código | Explicação |
|---|---|---|
| L498 | comentário | |
| L499 | `#lista-carrinho {` | Lista de itens. |
| L500–L501 | `display: flex; flex-direction: column;` | Itens empilhados. |
| L502 | `gap: 16px;` | |
| L503 | `padding: 0 24px;` | |
| L504 | `}` | |
| L506 | `.item {` | Cada item do carrinho. |
| L507 | `display: flex;` | Foto e informações lado a lado. |
| L508 | `align-items: center;` | |
| L509 | `gap: 16px;` | |
| L510 | `background-color: #4d0f38;` | |
| L511 | `border: 1px solid #571642;` | |
| L512 | `border-radius: 24px;` | |
| L513 | `padding: 16px;` | |
| L514 | `}` | |
| L516 | `.item-foto {` | Miniatura. |
| L517–L518 | `width: 80px; height: 80px;` | |
| L519 | `border-radius: 16px;` | |
| L520 | `background-color: #57002f;` | |
| L521 | `overflow: hidden;` | |
| L522 | `flex-shrink: 0;` | Impede a foto de encolher quando o nome é grande. |
| L523 | `}` | |
| L525–L530 | `.item-foto img { width:100%; height:100%; object-fit:cover; display:block; }` | Imagem preenchendo a miniatura. |
| L532 | `.item-info {` | Coluna de informações. |
| L533 | `flex: 1;` | Ocupa o espaço restante. |
| L534 | `min-width: 0;` | Truque do flexbox: permite que a coluna encolha abaixo do tamanho do texto, para o "..." (ellipsis) do título funcionar. |
| L535–L536 | `display: flex; flex-direction: column;` | Empilhado. |
| L537 | `gap: 6px;` | |
| L538 | `}` | |
| L540 | `.item-titulo {` | Nome + botão ✕. |
| L541–L542 | `display: flex; justify-content: space-between;` | Nome à esquerda, ✕ à direita. |
| L543 | `gap: 8px;` | |
| L544 | `}` | |
| L546 | `.item-titulo h4 {` | Nome do produto. |
| L547 | `font-size: 14px;` | |
| L548 | `font-weight: 800;` | |
| L549–L551 | `white-space: nowrap; overflow: hidden; text-overflow: ellipsis;` | Trunca com "...". |
| L552 | `}` | |
| L554 | `.remover {` | Botão ✕. |
| L555 | `background: none;` | Sem fundo. |
| L556 | `color: #d4b2c8;` | |
| L557 | `font-size: 14px;` | |
| L558 | `}` | |
| L560 | `.item-info p {` | Texto extra (ex.: "Sabor: Chocolate Suíço"). |
| L561 | `font-size: 11px;` | |
| L562 | `color: #d4b2c8;` | |
| L563 | `}` | |
| L565 | `.item-preco {` | Preço + contador. |
| L566–L568 | `display: flex; justify-content: space-between; align-items: center;` | |
| L569 | `font-weight: 700;` | |
| L570 | `font-size: 15px;` | |
| L571 | `}` | |
| L573 | `.entrega {` | Linha do endereço. |
| L574 | `display: flex;` | |
| L575 | `align-items: center;` | |
| L576 | `gap: 12px;` | |
| L577 | `padding: 24px;` | |
| L578 | `}` | |
| L580 | `.entrega strong {` | "Entregar em:". |
| L581 | `font-family: 'Outfit', sans-serif;` | |
| L582 | `font-size: 13px;` | |
| L583 | `}` | |
| L585 | `.entrega p {` | O endereço. |
| L586 | `font-size: 12px;` | |
| L587 | `color: #d4b2c8;` | |
| L588 | `}` | |
| L590 | `.resumo {` | Caixa do resumo do pedido. |
| L591 | `background-color: #27041d;` | Mais escura que os cards, para destacar. |
| L592 | `border: 1px solid #571642;` | |
| L593 | `border-radius: 24px;` | |
| L594 | `padding: 20px;` | |
| L595 | `margin: 0 24px;` | |
| L596–L597 | `display: flex; flex-direction: column;` | Linhas empilhadas. |
| L598 | `gap: 12px;` | |
| L599 | `}` | |
| L601 | `.resumo h4 {` | "RESUMO DO PEDIDO". |
| L602 | `font-size: 14px;` | |
| L603 | `font-weight: 800;` | |
| L604 | `text-transform: uppercase;` | |
| L605 | `}` | |
| L607 | `.resumo hr {` | A linha do resumo... |
| L608 | `margin: 4px 0;` | ...tem margem menor que o `hr` padrão (20px), porque o `gap` já dá espaço. |
| L609 | `}` | |
| L611 | `.linha {` | Cada linha "rótulo ..... valor". |
| L612–L613 | `display: flex; justify-content: space-between;` | |
| L614 | `font-size: 14px;` | |
| L615 | `color: #d4b2c8;` | Rótulo rosa claro. |
| L616 | `}` | |
| L618 | `.linha strong {` | Valor: |
| L619 | `color: white;` | branco |
| L620 | `font-weight: 600;` | semi-negrito. |
| L621 | `}` | |
| L623 | `.linha .verde {` | "Grátis": |
| L624 | `color: #10b981;` | verde. |
| L625 | `}` | |
| L627 | `.linha.total {` | Linha do total (tem as duas classes): |
| L628 | `align-items: center;` | centraliza verticalmente (os textos têm tamanhos diferentes). |
| L629 | `}` | |
| L631 | `.linha.total span {` | "Total Geral": |
| L632 | `font-family: 'Outfit', sans-serif;` | |
| L633 | `font-size: 16px;` | |
| L634 | `font-weight: 800;` | |
| L635 | `color: white;` | |
| L636 | `}` | |
| L638 | `.linha.total strong {` | Valor total: |
| L639 | `font-size: 20px;` | grande |
| L640 | `font-weight: 900;` | bem negrito |
| L641 | `color: #cf0179;` | rosa. |
| L642 | `}` | |
| L644 | `.carrinho-vazio {` | Mensagem de carrinho vazio. |
| L645 | `text-align: center;` | |
| L646 | `padding: 60px 24px;` | |
| L647 | `color: #d4b2c8;` | |
| L648 | `}` | |
| L650 | `.carrinho-vazio button {` | Botão "Ver produtos". |
| L651 | `margin-top: 16px;` | |
| L652 | `background-color: #cf0179;` | |
| L653 | `padding: 12px 24px;` | |
| L654 | `border-radius: 24px;` | |
| L655 | `font-weight: 800;` | |
| L656 | `}` | |

### 5.12 Menu de baixo (L658–L712)

| Linha | Código | Explicação |
|---|---|---|
| L658 | comentário | |
| L659 | `.menu {` | Barra de navegação. |
| L660 | `position: fixed;` | Fica presa na janela (não rola junto com a página). |
| L661 | `bottom: 0;` | Colada no fundo da janela. |
| L662 | `left: 50%;` | Começa no meio da tela... |
| L663 | `transform: translateX(-50%);` | ...e volta metade da própria largura → fica **centralizada**. (Necessário porque `position: fixed` ignora o `margin: auto` do `.app`.) |
| L664 | `width: 100%;` | Ocupa a largura toda... |
| L665 | `max-width: 430px;` | ...até 430px (mesma largura do `.app`). |
| L666 | `height: 84px;` | |
| L667 | `background-color: #27041d;` | |
| L668 | `border-radius: 30px 30px 0 0;` | Arredonda só os cantos de cima. |
| L669 | `display: flex;` | Botões lado a lado. |
| L670 | `justify-content: space-around;` | Espaço igual em volta de cada botão. |
| L671 | `align-items: center;` | |
| L672 | `padding: 12px 24px 20px;` | Mais espaço embaixo (área da "barrinha" do iPhone). |
| L673 | `z-index: 10;` | Fica **por cima** do conteúdo da página. |
| L674 | `}` | |
| L676 | `.menu button {` | Cada aba. |
| L677 | `background: none;` | Sem fundo. |
| L678 | `width: 72px;` | Largura fixa (todas iguais). |
| L679–L680 | `display: flex; flex-direction: column;` | Ícone em cima, texto embaixo. |
| L681 | `align-items: center;` | Centralizados. |
| L682 | `gap: 4px;` | |
| L683 | `font-size: 11px;` | |
| L684 | `font-weight: 500;` | |
| L685 | `color: #d4b2c8;` | Cinza-rosado quando inativa. |
| L686 | `}` | |
| L688 | `.menu button span {` | O ícone. |
| L689 | `font-size: 18px;` | |
| L690 | `position: relative;` | Referência para posicionar o selo do carrinho. |
| L691 | `}` | |
| L693 | `.menu button.ativo {` | Aba da tela atual: |
| L694 | `color: #cf0179;` | rosa |
| L695 | `font-weight: 700;` | e mais negrito. |
| L696 | `}` | |
| L698 | `.menu b {` | Selo com o número de itens do carrinho. |
| L699 | `position: absolute;` | Posicionado em relação ao `span` do ícone. |
| L700 | `top: -6px;` | Um pouco acima... |
| L701 | `right: -12px;` | ...e à direita do ícone 🛒. |
| L702 | `background-color: #cf0179;` | |
| L703 | `color: white;` | |
| L704 | `font-size: 10px;` | |
| L705 | `min-width: 16px;` | No mínimo 16px (cresce se o número tiver 2 dígitos). |
| L706 | `height: 16px;` | |
| L707 | `border-radius: 8px;` | Bolinha. |
| L708–L710 | `display: flex; align-items: center; justify-content: center;` | Número centralizado. (O JS troca esse `display` para `none` quando o carrinho tem 0 itens.) |
| L711 | `}` | |

### 5.13 Acessibilidade e marca do menu (L713–L723)

| Linha | Código | Explicação |
|---|---|---|
| L713 | `/* Foco visível para quem usa teclado */` | Comentário. |
| L714 | `button:focus-visible {` | Quando um botão recebe foco **pelo teclado** (tecla Tab) — não aparece ao clicar com o mouse. |
| L715 | `outline: 2px solid #ff419e;` | Contorno rosa de 2px. |
| L716 | `outline-offset: 2px;` | Afastado 2px do botão. |
| L717 | `}` | |
| L719 | comentário | "Marca dentro do menu: só aparece na versão web". |
| L720 | `.menu-marca {` | Logo dentro do menu: |
| L721 | `display: none;` | escondida no celular e tablet. |
| L722 | `}` | |

### 5.14 Responsividade — Tablet (L724–L750)

> `@media (min-width: 700px) { ... }` significa: "aplique as regras de dentro **só quando a janela tiver pelo menos 700px de largura**". As regras de dentro **sobrescrevem** as de cima.

| Linha | Código | Explicação |
|---|---|---|
| L724–L726 | comentário em bloco | Título "VERSÃO WEB / RESPONSIVA". |
| L728 | comentário | "Tablet (a partir de 700px)". |
| L729 | `@media (min-width: 700px) {` | Abre a media query. |
| L730–L732 | `.app { max-width: 760px; }` | O app fica mais largo. |
| L734–L736 | `.menu { max-width: 760px; }` | O menu acompanha a nova largura. |
| L738–L740 | `.grade { grid-template-columns: repeat(3, 1fr); }` | Grade com **3 colunas** (`repeat(3, 1fr)` = `1fr 1fr 1fr`). |
| L742–L744 | `.banner { height: 240px; }` | Banner mais alto. |
| L746–L749 | `.banner h2 { width: 260px; font-size: 28px; }` | Título do banner maior e mais largo. |
| L750 | `}` | Fecha a media query do tablet. |

### 5.15 Responsividade — Desktop (L752–L914)

| Linha | Código | Explicação |
|---|---|---|
| L752 | comentário | "Desktop (a partir de 1024px)". |
| L753 | `@media (min-width: 1024px) {` | Abre a media query do desktop. |
| L754–L756 | `body { background-color: #360727; }` | O fundo de fora vira vinho também → a página parece um site "inteiro", não um celular no meio. |
| L758 | `.app {` | |
| L759 | `max-width: 1200px;` | Largura de site de desktop. |
| L760 | `padding-top: 72px;` | Espaço em cima para o conteúdo não ficar escondido atrás do menu, que agora vai para o topo (72px de altura). |
| L761 | `}` | |
| L763–L765 | `.tela { padding-bottom: 60px; }` | Menos espaço embaixo (o menu não está mais lá). |
| L767 | comentário | "Menu vira barra de navegação no topo". |
| L768 | `.menu {` | |
| L769 | `top: 0;` | Gruda no topo... |
| L770 | `bottom: auto;` | ...e desfaz o `bottom: 0` anterior. |
| L771 | `left: 0;` | Começa na borda esquerda... |
| L772 | `transform: none;` | ...e desfaz a centralização com `translateX`. |
| L773 | `max-width: none;` | Ocupa a largura inteira da janela. |
| L774 | `height: 72px;` | |
| L775 | `border-radius: 0;` | Sem cantos arredondados. |
| L776 | `border-bottom: 1px solid #571642;` | Linha fina embaixo separando do conteúdo. |
| L777 | `justify-content: flex-start;` | Itens alinhados à esquerda (a marca empurra os botões para a direita, ver L784). |
| L778 | `gap: 8px;` | |
| L779 | `padding: 0 max(24px, calc((100% - 1200px) / 2 + 24px));` | Padding lateral inteligente: em telas maiores que 1200px, o conteúdo do menu fica alinhado com o conteúdo do `.app` (centralizado em 1200px); em telas menores, usa no mínimo 24px. `max()` escolhe o maior dos dois valores e `calc()` faz a conta. |
| L780 | `}` | |
| L782 | `.menu-marca {` | Logo dentro do menu: |
| L783 | `display: flex;` | agora aparece... |
| L784 | `margin-right: auto;` | ...e a margem automática à direita **empurra todos os botões para a direita**. |
| L785 | `}` | |
| L787 | `.menu-marca strong {` | Nome da loja no menu. |
| L788 | `font-family: 'Outfit', sans-serif;` | |
| L789 | `font-size: 18px;` | |
| L790 | `font-weight: 800;` | |
| L791 | `color: white;` | |
| L792 | `}` | |
| L794 | `.menu button {` | Abas no desktop: |
| L795 | `width: auto;` | largura de acordo com o texto |
| L796 | `flex-direction: row;` | ícone **ao lado** do texto (não em cima) |
| L797 | `gap: 8px;` | |
| L798 | `padding: 10px 16px;` | |
| L799 | `border-radius: 20px;` | formato pílula |
| L800 | `font-size: 14px;` | |
| L801 | `}` | |
| L803–L805 | `.menu button span { font-size: 16px; }` | Ícone um pouco menor. |
| L807 | `.menu button:hover {` | Mouse em cima de uma aba: |
| L808 | `background-color: #4d0f38;` | fundo de card |
| L809 | `color: white;` | texto branco. |
| L810 | `}` | |
| L812–L814 | `.menu button.ativo { background-color: #4d0f38; }` | Aba ativa também ganha fundo (além do texto rosa). |
| L816 | comentário | "A marca já está no menu, então some do topo da home". |
| L817 | `.topo .marca {` | Logo do topo da home: |
| L818 | `visibility: hidden;` | fica invisível, **mas continua ocupando espaço** (diferente de `display:none`), para os botões 🔍🔔 continuarem à direita. |
| L819 | `}` | |
| L821 | `/* Home */` | Comentário. |
| L822–L825 | `.banner { height: 340px; padding: 40px; }` | Banner bem maior. |
| L827–L830 | `.banner h2 { width: 420px; font-size: 42px; }` | Título do banner grande. |
| L832–L834 | `.banner p { font-size: 16px; }` | "Comprar Agora" maior. |
| L836 | `.pilulas {` | |
| L837 | `flex-wrap: wrap;` | Se não couber, quebra linha em vez de rolar. |
| L838 | `overflow: visible;` | Desliga a rolagem horizontal. |
| L839 | `}` | |
| L841 | `.grade {` | |
| L842 | `grid-template-columns: repeat(4, 1fr);` | **4 colunas** de produtos. |
| L843 | `gap: 24px;` | Espaço maior. |
| L844 | `}` | |
| L846–L848 | `.card { transition: transform 0.2s, border-color 0.2s; }` | Anima suavemente (0,2 segundo) mudanças de posição e cor da borda. |
| L850 | `.card:hover {` | Mouse em cima do card: |
| L851 | `transform: translateY(-4px);` | sobe 4px ("levita") |
| L852 | `border-color: #cf0179;` | e a borda fica rosa. |
| L853 | `}` | |
| L855–L857 | `.card-foto { height: 220px; }` | Fotos maiores. |
| L859 | comentário | "Detalhe do produto: foto à esquerda, informações à direita". |
| L860 | `#tela-produto.ativa {` | Só quando a tela de produto está visível (se fosse sem `.ativa`, o `display: grid` mostraria a tela sempre). |
| L861 | `display: grid;` | Vira grade... |
| L862 | `grid-template-columns: 1fr 1fr;` | ...de 2 colunas iguais. |
| L863 | `align-items: start;` | Cada coluna começa no topo (sem esticar). |
| L864 | `column-gap: 16px;` | Espaço entre as colunas. |
| L865 | `}` | |
| L867–L869 | `#tela-produto .cabecalho { grid-column: 1 / -1; }` | O cabeçalho ocupa as duas colunas (largura toda). Os filhos seguintes (`.foto-grande` e `.detalhe`) caem automaticamente na coluna esquerda e direita. |
| L871 | `#tela-produto .foto-grande {` | |
| L872 | `height: 520px;` | Foto bem maior. |
| L873 | `position: sticky;` | "Gruda" na tela ao rolar... |
| L874 | `top: 96px;` | ...a 96px do topo (abaixo do menu de 72px + folga). Assim a foto fica visível enquanto você lê a descrição. |
| L875 | `}` | |
| L877 | `#tela-produto .detalhe .grade {` | Relacionados dentro do detalhe: |
| L878 | `grid-template-columns: repeat(2, 1fr);` | 2 colunas (a coluna da direita é estreita para 4). |
| L879 | `gap: 16px;` | |
| L880 | `}` | |
| L882–L884 | `.compra .btn-principal { font-size: 15px; }` | Texto do botão um pouco maior. |
| L886 | comentário | "Carrinho: itens à esquerda, resumo à direita". |
| L887 | `#tela-carrinho.ativa {` | Tela do carrinho visível: |
| L888 | `display: grid;` | |
| L889 | `grid-template-columns: 1fr 400px;` | Coluna flexível para os itens + coluna fixa de 400px para o resumo. |
| L890 | `align-items: start;` | |
| L891 | `}` | |
| L893–L895 | `#tela-carrinho .cabecalho { grid-column: 1 / -1; }` | Cabeçalho na largura toda. |
| L897 | `#tela-carrinho:has(#area-resumo[style*="none"]) #lista-carrinho {` | Seletor avançado: `:has()` = "a tela do carrinho **que contém** um `#area-resumo` cujo atributo `style` contém a palavra `none`". Isso acontece quando o JS esconde o resumo (carrinho vazio). Nesse caso... |
| L898 | `grid-column: 1 / -1;` | ...a mensagem de "carrinho vazio" ocupa a largura toda, em vez de ficar espremida na coluna esquerda. |
| L899 | `}` | |
| L901 | `#area-resumo {` | |
| L902 | `position: sticky;` | Resumo "gruda" na tela ao rolar a lista de itens. |
| L903 | `top: 96px;` | Abaixo do menu. |
| L904 | `}` | |
| L906–L908 | `#area-resumo .entrega { padding-top: 0; }` | Tira o espaço de cima do endereço para alinhar com o primeiro item da lista. |
| L910–L913 | `.item-foto { width: 100px; height: 100px; }` | Miniaturas maiores. |
| L914 | `}` | Fecha a media query do desktop (fim do arquivo). |

---

## 6. `script.js` — linha por linha

> O JavaScript usa um estilo bem simples e didático: `var` para variáveis, laços `for` tradicionais e HTML montado com strings. Não depende de nenhuma biblioteca.

### 6.1 Dados dos produtos (L1–L26)

| Linha | Código | Explicação |
|---|---|---|
| L1–L4 | comentários `//` | Explicam que os dados abaixo são os mesmos do Figma e que as fotos ficam na pasta `img`. |
| L5 | `var produtos = [` | Cria a variável `produtos`: uma **lista (array)** de objetos, um para cada produto. É o "banco de dados" do site. |
| L6–L7 | `{ id: "whey", nome: ..., tipo: "Isolados", grupo: "suplementos", nota: 4.9, preco: 189.90, antigo: 229.90, foto: "whey.png", opcoes: true, descricao: "..." },` | Primeiro produto. Cada campo: **`id`** identificador único usado internamente (ex.: no carrinho); **`nome`** nome exibido; **`tipo`** subcategoria mostrada no card ("ISOLADOS"); **`grupo`** categoria usada no filtro (`suplementos`, `roupas`, `equipamentos`, `acessorios`); **`nota`** avaliação de 0 a 5; **`preco`** preço atual (número, com ponto decimal); **`antigo`** preço antigo riscado (**só o whey tem**; nos outros o campo não existe e fica `undefined`); **`foto`** nome do arquivo em `img/`; **`opcoes`** `true` se mostra tamanho/sabor na tela de detalhe; **`descricao`** texto longo da tela de detalhe. |
| L8–L9 | `concentrado` | Whey Concentrado 1kg — R$ 149,90, nota 4.7, suplementos, com opções. |
| L10–L11 | `hidrolisado` | Whey Hidrolisado 900g — R$ 229,90, nota 5.0, suplementos, com opções. |
| L12–L13 | `vegana` | Proteína Vegana 900g — R$ 169,90, nota 4.6, suplementos, com opções. |
| L14–L15 | `beef` | Beef Protein 900g — R$ 199,90, nota 4.8, suplementos, com opções. |
| L16–L17 | `albumina` | Albumina Premium 500g — R$ 79,90, nota 4.5, suplementos, com opções. |
| L18–L19 | `creatina` | Creatina 300g — R$ 89,90, nota 4.8, suplementos, **sem** opções. |
| L20–L21 | `pretreino` | Pré-Treino Apocalypse 300g — R$ 129,90, nota 5.0, suplementos, com opções. |
| L22–L23 | `camiseta` | Camiseta de Compressão — R$ 119,90, nota 4.7, grupo **roupas**, sem opções. |
| L24–L25 | `coqueteleira` | Coqueteleira Inox — R$ 59,90, nota 4.9, grupo **acessorios**, sem opções. (Último item: sem vírgula no final.) |
| L26 | `];` | Fecha a lista. Total: 10 produtos (8 suplementos, 1 roupa, 1 acessório, 0 equipamentos). |
| L27 | *(em branco)* | |

### 6.2 Nomes das categorias (L28–L33)

| Linha | Código | Explicação |
|---|---|---|
| L28 | `var nomesGrupos = {` | Objeto que "traduz" a chave interna da categoria para o nome bonito que aparece na tela. |
| L29 | `suplementos: "Suplementos",` | |
| L30 | `roupas: "Roupas",` | |
| L31 | `equipamentos: "Equipamentos",` | |
| L32 | `acessorios: "Acessórios"` | Aqui está o acento que a chave não tem. |
| L33 | `};` | Uso: `nomesGrupos["acessorios"]` → `"Acessórios"`. |

### 6.3 Estado do site (L35–L43)

"Estado" = informações que mudam enquanto o usuário usa o site.

| Linha | Código | Explicação |
|---|---|---|
| L35 | `// Estado do site` | Comentário. |
| L36 | `var carrinho = [` | Lista de itens no carrinho. Cada item guarda só o `id` do produto, a quantidade (`qtd`) e um texto `extra` (sabor etc.). O preço e o nome são buscados na lista `produtos` quando necessário. |
| L37 | `{ id: "whey", qtd: 1, extra: "Sabor: Chocolate Suíço" },` | O carrinho **já começa com itens** de exemplo (para a tela do carrinho não começar vazia, igual ao Figma). |
| L38 | `{ id: "creatina", qtd: 2, extra: "Pura Importada" }` | Segundo item de exemplo. |
| L39 | `];` | Fecha a lista. |
| L40 | `var produtoAtual = null;` | Produto aberto na tela de detalhes (começa sem nenhum = `null`). |
| L41 | `var qtdDetalhe = 1;` | Quantidade escolhida no contador da tela de detalhes. |
| L42 | `var grupoAtual = "suplementos";` | Categoria exibida na tela de categorias. |
| L43 | `var ordemAtual = "popular";` | Ordenação atual: `"popular"` ou `"preco"`. |

### 6.4 Funções de ajuda (L45–L63)

| Linha | Código | Explicação |
|---|---|---|
| L45–L47 | comentários | Título da seção. |
| L48 | `function dinheiro(valor) {` | Função que formata um número como dinheiro brasileiro. |
| L49 | `return "R$ " + valor.toFixed(2).replace(".", ",");` | `toFixed(2)` transforma `189.9` em `"189.90"` (sempre 2 casas); `.replace(".", ",")` troca o ponto por vírgula → `"189,90"`; e junta com `"R$ "`. Resultado: `"R$ 189,90"`. (Obs.: não coloca separador de milhar — `1500` vira `R$ 1500,00`.) |
| L50 | `}` | |
| L52 | `function buscarProduto(id) {` | Recebe um id (ex.: `"whey"`) e devolve o objeto completo do produto. |
| L53 | `for (var i = 0; i < produtos.length; i++) {` | Percorre a lista de produtos, do índice 0 até o último. |
| L54 | `if (produtos[i].id == id) {` | Se o id do produto atual é o procurado... |
| L55 | `return produtos[i];` | ...devolve esse produto (e a função para aqui). |
| L56–L57 | `}` `}` | Fecham o `if` e o `for`. |
| L58 | `}` | Fim da função. Se não achar nada, devolve `undefined` automaticamente. |
| L60 | comentário | Explica o comportamento de imagem ausente. |
| L61 | `function tagImagem(p) {` | Recebe um produto e devolve o **texto HTML** de uma tag `<img>`. |
| L62 | `return '<img src="img/' + p.foto + '" alt="' + p.nome + '" onerror="this.style.display=\'none\'">';` | Monta: `<img src="img/whey.png" alt="Whey Protein..." onerror="this.style.display='none'">`. O `alt` é o texto alternativo (leitores de tela / imagem quebrada). O `onerror` roda se a imagem não carregar e esconde a própria imagem (`this` = a imagem). As `\'` são aspas simples "escapadas" para não fechar a string do JS. |
| L63 | `}` | |

### 6.5 Navegação entre telas (L65–L87)

| Linha | Código | Explicação |
|---|---|---|
| L65–L67 | comentários | |
| L68 | `function mostrarTela(nome) {` | Mostra a tela pedida (`"home"`, `"categorias"`, `"produto"`, `"carrinho"` ou `"perfil"`). |
| L69 | `var telas = document.querySelectorAll(".tela");` | Pega **todos** os elementos com a classe `tela` (as 5 sections). |
| L70 | `for (var i = 0; i < telas.length; i++) {` | Para cada tela... |
| L71 | `telas[i].classList.remove("ativa");` | ...remove a classe `ativa` (todas ficam escondidas). |
| L72 | `}` | |
| L73 | `document.getElementById("tela-" + nome).classList.add("ativa");` | Monta o id (ex.: `"tela-" + "carrinho"` = `"tela-carrinho"`), acha o elemento e adiciona `ativa` → só ela aparece. |
| L74 | *(em branco)* | |
| L75 | `var abas = document.querySelectorAll(".menu button");` | Pega todos os botões do menu. |
| L76–L78 | `for (...) { abas[j].classList.remove("ativo"); }` | Tira o destaque de todas as abas. |
| L79 | comentário | "o produto pertence à aba Categorias". |
| L80 | `var aba = (nome == "produto") ? "categorias" : nome;` | **Operador ternário** (`condição ? se-sim : se-não`). Como não existe aba "produto" no menu, quando a tela é de produto a aba destacada é "categorias". Nas outras telas, o nome da aba é igual ao da tela. |
| L81 | `document.getElementById("aba-" + aba).classList.add("ativo");` | Destaca a aba correspondente (ex.: `#aba-carrinho`). |
| L82 | *(em branco)* | |
| L83 | `if (nome == "carrinho") {` | Se for a tela do carrinho... |
| L84 | `mostrarCarrinho();` | ...redesenha o carrinho para mostrar os dados mais recentes. |
| L85 | `}` | |
| L86 | `window.scrollTo(0, 0);` | Rola a página para o topo (senão a nova tela abriria no meio, onde estava a anterior). |
| L87 | `}` | |

### 6.6 Cards de produto (L89–L111)

| Linha | Código | Explicação |
|---|---|---|
| L89–L91 | comentários | |
| L92 | `function criarCard(p) {` | Recebe um produto e devolve o HTML de um card (como texto). |
| L93 | `return '<div class="card" onclick="abrirProduto(\'' + p.id + '\')">' +` | Abre a `div.card`. Clicar no card chama `abrirProduto('whey')` (por exemplo). O `+` no final junta com a próxima linha. |
| L94 | `'<div class="card-foto">' + tagImagem(p) + '</div>' +` | Área da foto com a `<img>`. |
| L95 | `'<div class="card-info">' +` | Abre a parte de textos. |
| L96 | `'<div class="card-meta"><span>' + p.tipo + '</span><b><span class="estrela">☆</span> ' + p.nota.toFixed(1) + '</b></div>' +` | Linha com o tipo (ex.: "Isolados") e a nota com 1 casa decimal (`5` vira `"5.0"`). |
| L97 | `'<p class="card-nome">' + p.nome + '</p>' +` | Nome do produto. |
| L98 | `'<div class="card-preco"><span>' + dinheiro(p.preco) + '</span>' +` | Preço formatado. |
| L99 | `'<button class="btn-mais" onclick="adicionarRapido(event, \'' + p.id + '\')">+</button></div>' +` | Botão "+". Passa o `event` (o evento do clique) para a função conseguir impedir que o clique "suba" para o card e abra a tela de produto. |
| L100 | `'</div>' +` | Fecha `.card-info`. |
| L101 | `'</div>';` | Fecha `.card`. O `;` termina o `return`. |
| L102 | `}` | |
| L104 | `function mostrarHome() {` | Preenche a grade "Mais Vendidos" da home. |
| L105 | `var ids = ["whey", "creatina", "pretreino", "camiseta"];` | Os 4 produtos em destaque, escolhidos manualmente. |
| L106 | `var html = "";` | Texto vazio onde os cards serão acumulados. |
| L107 | `for (var i = 0; i < ids.length; i++) {` | Para cada id... |
| L108 | `html += criarCard(buscarProduto(ids[i]));` | ...busca o produto, cria o card e **acrescenta** (`+=`) ao texto. |
| L109 | `}` | |
| L110 | `document.getElementById("lista-home").innerHTML = html;` | Coloca todo o HTML dentro da `div#lista-home`. `innerHTML` interpreta o texto como HTML de verdade. |
| L111 | `}` | |

### 6.7 Tela de categorias (L113–L156)

| Linha | Código | Explicação |
|---|---|---|
| L113–L115 | comentários | |
| L116 | `function abrirCategoria(grupo) {` | Chamada pelas pílulas, banner, aba Categorias etc. |
| L117 | `grupoAtual = grupo;` | Guarda qual categoria foi escolhida. |
| L118 | `mostrarCategoria();` | Monta a lista. |
| L119 | `mostrarTela("categorias");` | Exibe a tela. |
| L120 | `}` | |
| L122 | `function ordenar(tipo) {` | Chamada pelos botões "Popularidade" / "Faixa de Preço". |
| L123 | `ordemAtual = tipo;` | Guarda a ordenação. |
| L124 | `mostrarCategoria();` | Redesenha a lista. |
| L125 | `}` | |
| L127 | `function mostrarCategoria() {` | Monta a tela de categorias com base em `grupoAtual` e `ordemAtual`. |
| L128 | comentário | "filtra pelo grupo escolhido". |
| L129 | `var lista = [];` | Lista nova, vazia. |
| L130 | `for (var i = 0; i < produtos.length; i++) {` | Percorre todos os produtos. |
| L131 | `if (produtos[i].grupo == grupoAtual) {` | Se o produto é da categoria escolhida... |
| L132 | `lista.push(produtos[i]);` | ...adiciona no fim da lista (`push`). |
| L133–L134 | `}` `}` | |
| L136 | comentário | "ordena". |
| L137 | `if (ordemAtual == "popular") {` | Se a ordem é popularidade: |
| L138 | `lista.sort(function (a, b) { return b.nota - a.nota; });` | `sort` reordena a lista usando uma função que compara dois produtos. Se o resultado for negativo, `a` vem antes; positivo, `b` vem antes. `b.nota - a.nota` → **maior nota primeiro**. |
| L139 | `} else {` | Senão (ordem por preço): |
| L140 | `lista.sort(function (a, b) { return a.preco - b.preco; });` | `a.preco - b.preco` → **menor preço primeiro**. |
| L141 | `}` | |
| L143 | `document.getElementById("cat-titulo").innerText = nomesGrupos[grupoAtual];` | Título da tela = nome bonito da categoria. `innerText` insere como texto puro (não interpreta HTML). |
| L144 | `document.getElementById("cat-subtitulo").innerText = lista.length + " produtos encontrados";` | Ex.: "8 produtos encontrados". |
| L145 | `document.getElementById("ordem-popular").className = (ordemAtual == "popular") ? "ativo" : "";` | Liga/desliga a classe `ativo` no botão "Popularidade". `className` substitui todas as classes do elemento. |
| L146 | `document.getElementById("ordem-preco").className = (ordemAtual == "preco") ? "ativo" : "";` | Mesmo para "Faixa de Preço". |
| L147 | *(em branco)* | |
| L148 | `var html = "";` | |
| L149–L151 | `for (...) { html += criarCard(lista[j]); }` | Cria um card para cada produto filtrado. |
| L152 | `if (lista.length == 0) {` | Se não sobrou nenhum produto (ex.: Equipamentos)... |
| L153 | `html = '<p class="vazio">Ainda não temos produtos nesta categoria.</p>';` | ...mostra a mensagem de vazio. |
| L154 | `}` | |
| L155 | `document.getElementById("lista-categoria").innerHTML = html;` | Coloca o resultado na tela. |
| L156 | `}` | |

### 6.8 Tela de detalhes do produto (L158–L232)

| Linha | Código | Explicação |
|---|---|---|
| L158–L160 | comentários | |
| L161 | `function abrirProduto(id) {` | Chamada ao clicar num card. |
| L162 | `produtoAtual = buscarProduto(id);` | Guarda o produto aberto (outras funções, como `adicionarDetalhe`, precisam dele). |
| L163 | `qtdDetalhe = 1;` | Reinicia a quantidade em 1. |
| L164 | `var p = produtoAtual;` | Apelido curto para escrever menos. |
| L165 | *(em branco)* | |
| L166 | `document.getElementById("det-foto").innerHTML = tagImagem(p) + '<span class="selo-vendas">Top Vendas</span>';` | Coloca a imagem + o selo "Top Vendas" na foto grande. |
| L167 | `document.getElementById("det-nome").innerText = p.nome;` | Nome. |
| L168 | `document.getElementById("det-avaliacao").innerHTML = '<span class="estrelas">★★★★★</span> (' + p.nota.toFixed(1) + ' • 240 avaliações)';` | Estrelas + nota. As 5 estrelas e o "240 avaliações" são **fixos** (iguais para todos os produtos). |
| L169 | `document.getElementById("det-preco").innerText = dinheiro(p.preco);` | Preço atual. |
| L170 | `document.getElementById("det-preco-antigo").innerText = p.antigo ? dinheiro(p.antigo) : "";` | Se o produto tem `antigo`, mostra formatado; se não (`undefined` conta como "falso"), deixa vazio. |
| L171 | `document.getElementById("det-descricao").innerText = p.descricao;` | Descrição. |
| L172 | `document.getElementById("det-qtd").innerText = 1;` | Contador volta a mostrar 1. |
| L173 | `document.getElementById("btn-favorito").innerText = "🤍";` | Coração volta a ficar branco (favorito não é lembrado entre produtos). |
| L174 | *(em branco)* | |
| L175 | comentário | "tamanhos e sabores só aparecem nos suplementos". |
| L176 | `var opcoes = document.getElementById("det-opcoes");` | Pega o bloco de opções. |
| L177 | `opcoes.style.display = p.opcoes ? "block" : "none";` | Mostra se `opcoes: true`, esconde se `false`. |
| L178 | `criarOpcoes("det-tamanhos", ["450g", "900g (Recomendado)", "1.8kg"], 1);` | Cria os 3 botões de tamanho, com o de índice **1** (o 2º, "900g") já marcado. |
| L179 | `criarOpcoes("det-sabores", ["Baunilha Divina", "Chocolate Suíço", "Morango Silvestre"], 1);` | Cria os 3 botões de sabor, com "Chocolate Suíço" marcado. (São os mesmos para todos os produtos.) |
| L180 | *(em branco)* | |
| L181 | comentário | "Frequentemente comprados juntos". |
| L182 | `var html = "";` | |
| L183 | `var juntos = ["creatina", "coqueteleira"];` | Produtos sugeridos (fixos). |
| L184 | `for (var i = 0; i < juntos.length; i++) {` | Para cada sugestão... |
| L185 | `if (juntos[i] != p.id) {` | ...se **não** for o próprio produto aberto (não faz sentido sugerir a creatina na página da creatina)... |
| L186 | `html += criarCard(buscarProduto(juntos[i]));` | ...cria o card. |
| L187–L188 | `}` `}` | |
| L189 | `document.getElementById("lista-relacionados").innerHTML = html;` | Coloca as sugestões na tela. |
| L190 | *(em branco)* | |
| L191 | `mostrarTela("produto");` | Exibe a tela de produto. |
| L192 | `}` | |
| L194 | `function criarOpcoes(idCaixa, lista, marcado) {` | Cria botões de opção dentro da caixa `idCaixa`, um para cada texto da `lista`, marcando o de índice `marcado`. |
| L195 | `var html = "";` | |
| L196 | `for (var i = 0; i < lista.length; i++) {` | Para cada opção... |
| L197 | `var classe = (i == marcado) ? "ativo" : "";` | ...decide se ela começa marcada. |
| L198 | `html += '<button class="' + classe + '" onclick="escolherOpcao(this)">' + lista[i] + '</button>';` | Cria o botão. `this` dentro do `onclick` é o próprio botão clicado. |
| L199 | `}` | |
| L200 | `document.getElementById(idCaixa).innerHTML = html;` | Coloca os botões na caixa. |
| L201 | `}` | |
| L203 | `function escolherOpcao(botao) {` | Marca o botão clicado e desmarca os outros do mesmo grupo. |
| L204 | `var irmaos = botao.parentNode.children;` | `parentNode` = a caixa onde o botão está; `children` = todos os botões dessa caixa (os "irmãos"). |
| L205–L207 | `for (...) { irmaos[i].classList.remove("ativo"); }` | Desmarca todos. |
| L208 | `botao.classList.add("ativo");` | Marca só o clicado. |
| L209 | `}` | |
| L211 | `function favoritar() {` | Liga/desliga o favorito. |
| L212 | `var botao = document.getElementById("btn-favorito");` | |
| L213 | `botao.innerText = (botao.innerText == "🤍") ? "💖" : "🤍";` | Se está branco, vira rosa; senão, volta a branco. (É só visual, não é salvo em lugar nenhum.) |
| L214 | `}` | |
| L216 | `function mudarQtdDetalhe(valor) {` | Recebe `+1` ou `-1`. |
| L217 | `qtdDetalhe = qtdDetalhe + valor;` | Soma. |
| L218 | `if (qtdDetalhe < 1) {` | Não deixa ficar menor que 1... |
| L219 | `qtdDetalhe = 1;` | |
| L220 | `}` | |
| L221 | `document.getElementById("det-qtd").innerText = qtdDetalhe;` | Atualiza o número na tela. |
| L222 | `}` | |
| L224 | `function adicionarDetalhe() {` | Botão "Adicionar ao carrinho" da tela de detalhes. |
| L225 | `var sabor = "";` | Texto extra começa vazio. |
| L226 | `if (produtoAtual.opcoes) {` | Se o produto tem opções... |
| L227 | `var escolhido = document.querySelector("#det-sabores .ativo");` | ...pega o botão de sabor marcado (`querySelector` devolve o primeiro que combina com o seletor CSS). |
| L228 | `sabor = "Sabor: " + escolhido.innerText;` | Ex.: "Sabor: Chocolate Suíço". (O **tamanho** escolhido não é registrado.) |
| L229 | `}` | |
| L230 | `colocarNoCarrinho(produtoAtual.id, qtdDetalhe, sabor);` | Adiciona ao carrinho. |
| L231 | `alert("Produto adicionado ao carrinho!");` | Avisa o usuário. |
| L232 | `}` | |

### 6.9 Carrinho (L234–L325)

| Linha | Código | Explicação |
|---|---|---|
| L234–L236 | comentários | |
| L237 | `function adicionarRapido(evento, id) {` | Chamada pelo botão "+" dos cards. |
| L238 | `evento.stopPropagation();` | **Impede o clique de "subir"** até o card. Sem isso, clicar no "+" também dispararia o `onclick` do card e abriria a tela do produto. |
| L239 | `colocarNoCarrinho(id, 1, "");` | Adiciona 1 unidade, sem texto extra. |
| L240 | `}` | |
| L242 | `function colocarNoCarrinho(id, qtd, extra) {` | Lógica central de adicionar. |
| L243 | `for (var i = 0; i < carrinho.length; i++) {` | Procura se o produto já está no carrinho. |
| L244 | `if (carrinho[i].id == id) {` | Se já está... |
| L245 | `carrinho[i].qtd = carrinho[i].qtd + qtd;` | ...só soma a quantidade (não cria linha nova)... |
| L246 | `atualizarSelo();` | ...atualiza o número do menu... |
| L247 | `return;` | ...e sai da função. |
| L248–L249 | `}` `}` | |
| L250 | `carrinho.push({ id: id, qtd: qtd, extra: extra });` | Se não achou, adiciona um item novo no fim da lista. |
| L251 | `atualizarSelo();` | Atualiza o número do menu. |
| L252 | `}` | |
| L254 | `function mudarQtdCarrinho(posicao, valor) {` | Botões − e + dentro do carrinho. `posicao` é o índice do item na lista. |
| L255 | `carrinho[posicao].qtd = carrinho[posicao].qtd + valor;` | Soma ou subtrai. |
| L256–L258 | `if (... < 1) { ... = 1; }` | Nunca abaixo de 1 (para remover, usa-se o ✕). |
| L259 | `mostrarCarrinho();` | Redesenha o carrinho com os novos valores. |
| L260 | `}` | |
| L262 | `function removerItem(posicao) {` | Botão ✕. |
| L263 | `carrinho.splice(posicao, 1);` | `splice(posição, 1)` remove 1 elemento a partir daquela posição. |
| L264 | `mostrarCarrinho();` | Redesenha. |
| L265 | `}` | |
| L267 | `function totalItens() {` | Conta quantas **unidades** há no carrinho (não quantas linhas). |
| L268 | `var total = 0;` | |
| L269–L271 | `for (...) { total = total + carrinho[i].qtd; }` | Soma as quantidades. Ex.: whey×1 + creatina×2 = 3. |
| L272 | `return total;` | |
| L273 | `}` | |
| L275 | `function atualizarSelo() {` | Atualiza a bolinha rosa do menu. |
| L276 | `var n = totalItens();` | |
| L277 | `var selo = document.getElementById("selo");` | |
| L278 | `selo.innerText = n;` | Escreve o número. |
| L279 | `selo.style.display = (n > 0) ? "flex" : "none";` | Mostra se houver itens; esconde se for 0. |
| L280 | `}` | |
| L282 | `function mostrarCarrinho() {` | Desenha a tela inteira do carrinho a partir da variável `carrinho`. |
| L283 | `var html = "";` | |
| L284 | `var subtotal = 0;` | Vai acumulando o valor total. |
| L285 | *(em branco)* | |
| L286 | `for (var i = 0; i < carrinho.length; i++) {` | Para cada item... |
| L287 | `var item = carrinho[i];` | |
| L288 | `var p = buscarProduto(item.id);` | ...busca os dados completos do produto (nome, preço, foto). |
| L289 | `subtotal = subtotal + p.preco * item.qtd;` | Soma preço × quantidade. |
| L290 | *(em branco)* | |
| L291 | `html += '<div class="item">' +` | Abre a caixa do item. |
| L292 | `'<div class="item-foto">' + tagImagem(p) + '</div>' +` | Miniatura. |
| L293 | `'<div class="item-info">' +` | Abre a coluna de informações. |
| L294 | `'<div class="item-titulo"><h4>' + p.nome + '</h4>' +` | Nome. |
| L295 | `'<button class="remover" onclick="removerItem(' + i + ')">✕</button></div>' +` | Botão ✕ com a posição do item (ex.: `removerItem(0)`). |
| L296 | `'<p>' + item.extra + '</p>' +` | Texto extra (sabor). |
| L297 | `'<div class="item-preco"><span>' + dinheiro(p.preco) + '</span>' +` | Preço **unitário**. |
| L298 | `'<div class="contador">' +` | Abre o contador. |
| L299 | `'<button onclick="mudarQtdCarrinho(' + i + ', -1)">-</button>' +` | Botão −. |
| L300 | `'<span>' + item.qtd + '</span>' +` | Quantidade. |
| L301 | `'<button class="mais" onclick="mudarQtdCarrinho(' + i + ', 1)">+</button>' +` | Botão +. |
| L302 | `'</div></div>' +` | Fecha `.contador` e `.item-preco`. |
| L303 | `'</div>' +` | Fecha `.item-info`. |
| L304 | `'</div>';` | Fecha `.item`. |
| L305 | `}` | Fim do laço. |
| L306 | *(em branco)* | |
| L307 | `var vazio = (carrinho.length == 0);` | `true` se o carrinho estiver vazio. |
| L308 | `if (vazio) {` | Se vazio... |
| L309 | `html = '<div class="carrinho-vazio"><p>Seu carrinho está vazio.</p>' +` | ...troca o HTML por uma mensagem... |
| L310 | `'<button onclick="abrirCategoria(\'suplementos\')">Ver produtos</button></div>';` | ...e um botão que leva para Suplementos. |
| L311 | `}` | |
| L312 | *(em branco)* | |
| L313 | `document.getElementById("lista-carrinho").innerHTML = html;` | Coloca a lista na tela. |
| L314 | `document.getElementById("area-resumo").style.display = vazio ? "none" : "block";` | Esconde o endereço/resumo se vazio. (É esse `style="display: none"` que o seletor `:has(...)` do CSS detecta no desktop.) |
| L315 | `document.getElementById("carrinho-itens").innerText = totalItens() + (totalItens() == 1 ? " Item" : " Itens");` | "1 Item" ou "N Itens" (singular/plural). |
| L316 | `document.getElementById("resumo-subtotal").innerText = dinheiro(subtotal);` | Subtotal. |
| L317 | `document.getElementById("resumo-total").innerText = dinheiro(subtotal);` | Total = subtotal (frete grátis). |
| L318 | `atualizarSelo();` | Atualiza o número no menu. |
| L319 | `}` | |
| L321 | `function finalizar() {` | Botão "Finalizar compra". |
| L322 | `alert("Pedido finalizado! Obrigado por comprar na C.F.G Force Store.");` | Mensagem de agradecimento (não há pagamento de verdade). |
| L323 | `carrinho = [];` | Esvazia o carrinho. |
| L324 | `mostrarCarrinho();` | Redesenha (vai aparecer "Seu carrinho está vazio"). |
| L325 | `}` | |

### 6.10 Início do programa (L327–L332)

Até aqui só foram **definidas** variáveis e funções. Estas 3 linhas são as que realmente **executam** algo assim que a página abre:

| Linha | Código | Explicação |
|---|---|---|
| L327–L329 | comentários | "Começo". |
| L330 | `mostrarHome();` | Preenche os 4 cards de "Mais Vendidos". |
| L331 | `mostrarCarrinho();` | Monta o carrinho com os 2 itens iniciais e atualiza o selo do menu (mostra "3"). |
| L332 | `mostrarTela("home");` | Mostra a tela inicial e destaca a aba "Início". |

---

## 7. Fluxos completos (o que acontece quando o usuário clica)

**Abrir o site**
`script.js` carrega → `mostrarHome()` cria os cards → `mostrarCarrinho()` monta o carrinho e o selo "3" → `mostrarTela("home")` exibe a home.

**Clicar na pílula "Roupas"**
`abrirCategoria('roupas')` → `grupoAtual = "roupas"` → `mostrarCategoria()` filtra (1 produto: camiseta), ordena, escreve "Roupas / 1 produtos encontrados" → `mostrarTela("categorias")`.

**Clicar em "Faixa de Preço"**
`ordenar('preco')` → `ordemAtual = "preco"` → `mostrarCategoria()` reordena do mais barato para o mais caro e pinta o botão de rosa.

**Clicar num card**
`abrirProduto('whey')` → preenche foto, nome, preço, descrição, opções e relacionados → `mostrarTela("produto")` (aba "Categorias" fica destacada).

**Clicar no "+" de um card**
`adicionarRapido(event, 'whey')` → `stopPropagation()` impede de abrir o produto → `colocarNoCarrinho('whey', 1, "")` soma 1 → `atualizarSelo()` muda o número do menu.

**Na tela do produto: escolher sabor, aumentar quantidade e adicionar**
`escolherOpcao(this)` marca o sabor → `mudarQtdDetalhe(1)` aumenta `qtdDetalhe` → `adicionarDetalhe()` lê o sabor marcado → `colocarNoCarrinho(...)` → alerta "Produto adicionado".

**Abrir o carrinho, mudar quantidades, remover, finalizar**
`mostrarTela('carrinho')` → `mostrarCarrinho()` desenha tudo e calcula o subtotal. Os botões −/+ chamam `mudarQtdCarrinho(i, ±1)`, o ✕ chama `removerItem(i)`, e todos redesenham com `mostrarCarrinho()`. `finalizar()` mostra o alerta e esvazia o carrinho.

---

## 8. Limitações conhecidas e ideias de melhoria

Comportamentos atuais que valem ser conhecidos por quem for mexer no código:

- **Nada é salvo.** Carrinho e favorito ficam só na memória; ao recarregar a página tudo volta ao estado inicial (com os 2 itens de exemplo). Dá para salvar com `localStorage`.
- **Sabores diferentes se juntam.** `colocarNoCarrinho` procura só pelo `id`; adicionar Whey de Baunilha depois de Whey de Chocolate soma na mesma linha e mantém o texto do primeiro sabor.
- **O tamanho escolhido não vai para o carrinho**, e o preço não muda conforme o tamanho.
- **Tamanhos e sabores são iguais para todos os produtos com `opcoes: true`** (inclusive albumina e pré-treino).
- **Avaliações são fixas** (sempre ★★★★★ e "240 avaliações").
- **Busca e notificações** são simuladas (a lupa abre Suplementos; o sino mostra um alerta).
- **Perfil** é só um placeholder.
- **Categoria Equipamentos** não tem produtos (mostra a mensagem de vazio).
- **Endereço de entrega** é fixo no HTML.
- **Fundo do banner (L101 do CSS)** é sobrescrito pela L102; se `img/banner.png` não existir, aparece só a película semitransparente sobre o fundo do app.
- **`dinheiro()`** não coloca separador de milhar (R$ 1500,00 em vez de R$ 1.500,00). `valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })` resolveria.
- **Pasta `img/`** não está no repositório.

---

## 9. Glossário rápido

| Termo | Significado |
|---|---|
| **DOM** | A "árvore" de elementos HTML que o JavaScript consegue ler e alterar. |
| **`getElementById`** | Busca um elemento pelo `id`. |
| **`querySelector` / `querySelectorAll`** | Busca o primeiro / todos os elementos que combinam com um seletor CSS. |
| **`innerHTML`** | Lê/escreve o conteúdo de um elemento interpretando como HTML. |
| **`innerText`** | Lê/escreve o conteúdo como texto puro. |
| **`classList.add / remove`** | Adiciona/remove uma classe CSS de um elemento. |
| **`onclick`** | Atributo HTML que executa um código JS quando o elemento é clicado. |
| **`stopPropagation`** | Impede que um clique "suba" para os elementos pais. |
| **Flexbox (`display: flex`)** | Layout em uma direção (linha ou coluna). |
| **Grid (`display: grid`)** | Layout em linhas **e** colunas. |
| **`fr`** | Fração do espaço disponível numa grade. |
| **Media query (`@media`)** | Regras CSS que só valem em certas larguras de tela. |
| **`position: fixed`** | Elemento preso na janela, não rola com a página. |
| **`position: sticky`** | Elemento rola normalmente até certo ponto e depois "gruda". |
| **`position: absolute`** | Posicionado em relação ao ancestral mais próximo com `position` definido. |
| **`z-index`** | Ordem de empilhamento (quem fica por cima). |
| **Operador ternário** | `condição ? valorSeVerdadeiro : valorSeFalso`. |
| **SPA** | Single Page Application: um só HTML, telas trocadas por JavaScript. |
