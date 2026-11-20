// ------------------------------------------------------------
// Dados dos produtos (os mesmos que estão no Figma)
// As fotos ficam na pasta "img" (exporte do Figma com esses nomes)
// ------------------------------------------------------------
var produtos = [
  { id: "whey", nome: "Whey Protein Isolado 900g", tipo: "Isolados", grupo: "suplementos", nota: 4.9, preco: 189.90, antigo: 229.90, foto: "whey.png", opcoes: true,
    descricao: "O Whey Protein Isolado C.F. oferece a mais pura dose de proteína para maximizar seu ganho muscular e acelerar sua recuperação. Produzido com tecnologia de microfiltração avançada para garantir zero gorduras e baixo carboidrato. Perfeito para a sua jornada de Força e Fé." },
  { id: "concentrado", nome: "Whey Concentrado 1kg", tipo: "Concentrados", grupo: "suplementos", nota: 4.7, preco: 149.90, foto: "whey-concentrado.png", opcoes: true,
    descricao: "Proteína de alto valor biológico para quem quer ganhar massa magra com um ótimo custo-benefício." },
  { id: "hidrolisado", nome: "Whey Hidrolisado 900g", tipo: "Hidrolisados", grupo: "suplementos", nota: 5.0, preco: 229.90, foto: "whey-hidrolisado.png", opcoes: true,
    descricao: "Proteína hidrolisada de absorção mais rápida, ideal para tomar logo depois do treino." },
  { id: "vegana", nome: "Proteína Vegana C.F.G 900g", tipo: "Veganos", grupo: "suplementos", nota: 4.6, preco: 169.90, foto: "proteina-vegana.png", opcoes: true,
    descricao: "Proteína de origem vegetal, sem lactose, para quem segue uma alimentação vegana." },
  { id: "beef", nome: "Beef Protein Carnívoro 900g", tipo: "Isolados", grupo: "suplementos", nota: 4.8, preco: 199.90, foto: "beef-protein.png", opcoes: true,
    descricao: "Proteína isolada de carne bovina, sem lactose e com bastante proteína por dose." },
  { id: "albumina", nome: "Albumina Premium 500g", tipo: "Outros", grupo: "suplementos", nota: 4.5, preco: 79.90, foto: "albumina.png", opcoes: true,
    descricao: "Proteína do ovo de digestão lenta, boa para consumir ao longo do dia." },
  { id: "creatina", nome: "Creatina Monohidratada 300g", tipo: "Suplementos", grupo: "suplementos", nota: 4.8, preco: 89.90, foto: "creatina.png", opcoes: false,
    descricao: "Creatina pura importada para mais força e desempenho nos treinos." },
  { id: "pretreino", nome: "Pré-Treino Apocalypse 300g", tipo: "Suplementos", grupo: "suplementos", nota: 5.0, preco: 129.90, foto: "pretreino.png", opcoes: true,
    descricao: "Energia e foco para treinar com intensidade do começo ao fim." },
  { id: "camiseta", nome: "Camiseta de Compressão C.F.G", tipo: "Roupas", grupo: "roupas", nota: 4.7, preco: 119.90, foto: "camiseta.png", opcoes: false,
    descricao: "Camiseta de compressão dry fit, leve e confortável para treinar." },
  { id: "coqueteleira", nome: "Coqueteleira Inox C.F.G", tipo: "Acessórios", grupo: "acessorios", nota: 4.9, preco: 59.90, foto: "coqueteleira.png", opcoes: false,
    descricao: "Coqueteleira de inox que mantém sua bebida gelada por mais tempo." }
];

var nomesGrupos = {
  suplementos: "Suplementos",
  roupas: "Roupas",
  equipamentos: "Equipamentos",
  acessorios: "Acessórios"
};

// Estado do site
var carrinho = [
  { id: "whey", qtd: 1, extra: "Sabor: Chocolate Suíço" },
  { id: "creatina", qtd: 2, extra: "Pura Importada" }
];
var produtoAtual = null;
var qtdDetalhe = 1;
var grupoAtual = "suplementos";
var ordemAtual = "popular";

// ------------------------------------------------------------
// Funções de ajuda
// ------------------------------------------------------------
function dinheiro(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

function buscarProduto(id) {
  for (var i = 0; i < produtos.length; i++) {
    if (produtos[i].id == id) {
      return produtos[i];
    }
  }
}

// Se a foto ainda não estiver na pasta img, a imagem some e fica só o fundo rosa escuro
// "decorativa" = a foto fica escondida do leitor de tela quando o nome já aparece ao lado
function tagImagem(p, decorativa) {
  var alt = decorativa ? "" : p.nome;
  return '<img src="img/' + p.foto + '" alt="' + alt + '" loading="lazy" decoding="async" onerror="this.style.display=\'none\'">';
}

// Ícone do "sprite" que está no começo do index.html
function icone(nome, classe) {
  return '<svg class="icone' + (classe ? " " + classe : "") + '" aria-hidden="true"><use href="#i-' + nome + '"/></svg>';
}

// Aviso rápido no rodapé (no lugar do alert)
var timerAviso = null;
function aviso(texto) {
  var toast = document.getElementById("toast");
  document.getElementById("toast-texto").innerText = texto;
  toast.classList.add("visivel");
  clearTimeout(timerAviso);
  timerAviso = setTimeout(function () {
    toast.classList.remove("visivel");
  }, 2400);
}

// ------------------------------------------------------------
// Navegação entre as telas
// ------------------------------------------------------------
function mostrarTela(nome) {
  var telas = document.querySelectorAll(".tela");
  for (var i = 0; i < telas.length; i++) {
    telas[i].classList.remove("ativa");
  }
  document.getElementById("tela-" + nome).classList.add("ativa");

  var abas = document.querySelectorAll(".menu button");
  for (var j = 0; j < abas.length; j++) {
    abas[j].classList.remove("ativo");
    abas[j].removeAttribute("aria-current");
  }
  // o produto pertence à aba "Categorias"
  var aba = (nome == "produto") ? "categorias" : nome;
  var botaoAba = document.getElementById("aba-" + aba);
  botaoAba.classList.add("ativo");
  botaoAba.setAttribute("aria-current", "page");

  if (nome == "carrinho") {
    mostrarCarrinho();
  }
  window.scrollTo(0, 0);
  // leva o foco do teclado / leitor de tela para a nova tela
  document.getElementById("tela-" + nome).focus({ preventScroll: true });
}

// ------------------------------------------------------------
// Cards de produto
// ------------------------------------------------------------
function criarCard(p) {
  return '<article class="card">' +
    '<div class="card-foto">' + tagImagem(p, true) + '</div>' +
    '<div class="card-info">' +
      '<div class="card-meta"><span>' + p.tipo + '</span><b>' + icone("estrela", "estrela") + p.nota.toFixed(1) + '</b></div>' +
      '<h3 class="card-nome"><button class="card-link" onclick="abrirProduto(\'' + p.id + '\')">' + p.nome + '</button></h3>' +
      '<div class="card-preco"><span>' + dinheiro(p.preco) + '</span>' +
        '<button class="btn-mais" aria-label="Adicionar ' + p.nome + ' ao carrinho" onclick="adicionarRapido(event, \'' + p.id + '\')">' + icone("mais") + '</button></div>' +
    '</div>' +
  '</article>';
}

function mostrarHome() {
  var ids = ["whey", "creatina", "pretreino", "camiseta"];
  var html = "";
  for (var i = 0; i < ids.length; i++) {
    html += criarCard(buscarProduto(ids[i]));
  }
  document.getElementById("lista-home").innerHTML = html;
}

// ------------------------------------------------------------
// Tela de categorias
// ------------------------------------------------------------
function abrirCategoria(grupo) {
  grupoAtual = grupo;
  mostrarCategoria();
  mostrarTela("categorias");
}

function ordenar(tipo) {
  ordemAtual = tipo;
  mostrarCategoria();
}

function mostrarCategoria() {
  // filtra pelo grupo escolhido
  var lista = [];
  for (var i = 0; i < produtos.length; i++) {
    if (produtos[i].grupo == grupoAtual) {
      lista.push(produtos[i]);
    }
  }

  // ordena
  if (ordemAtual == "popular") {
    lista.sort(function (a, b) { return b.nota - a.nota; });
  } else {
    lista.sort(function (a, b) { return a.preco - b.preco; });
  }

  document.getElementById("cat-titulo").innerText = nomesGrupos[grupoAtual];
  document.getElementById("cat-subtitulo").innerText = lista.length + " produtos encontrados";
  var popular = document.getElementById("ordem-popular");
  var preco = document.getElementById("ordem-preco");
  popular.className = (ordemAtual == "popular") ? "ativo" : "";
  preco.className = (ordemAtual == "preco") ? "ativo" : "";
  popular.setAttribute("aria-pressed", ordemAtual == "popular");
  preco.setAttribute("aria-pressed", ordemAtual == "preco");

  var html = "";
  for (var j = 0; j < lista.length; j++) {
    html += criarCard(lista[j]);
  }
  if (lista.length == 0) {
    html = '<div class="vazio">' + icone("sacola") + '<p>Ainda não temos produtos nesta categoria.</p></div>';
  }
  document.getElementById("lista-categoria").innerHTML = html;
}

// ------------------------------------------------------------
// Tela de detalhes do produto
// ------------------------------------------------------------
function abrirProduto(id) {
  produtoAtual = buscarProduto(id);
  qtdDetalhe = 1;
  var p = produtoAtual;

  document.getElementById("det-foto").innerHTML = tagImagem(p) + '<span class="selo-vendas">Top Vendas</span>';
  document.getElementById("det-nome").innerText = p.nome;
  document.getElementById("det-avaliacao").innerHTML = '<span class="estrelas">★★★★★</span> (' + p.nota.toFixed(1) + ' • 240 avaliações)';
  document.getElementById("det-preco").innerText = dinheiro(p.preco);
  document.getElementById("det-preco-antigo").innerText = p.antigo ? dinheiro(p.antigo) : "";
  document.getElementById("det-descricao").innerText = p.descricao;
  document.getElementById("det-qtd").innerText = 1;
  document.getElementById("btn-favorito").setAttribute("aria-pressed", "false");

  // tamanhos e sabores só aparecem nos suplementos
  var opcoes = document.getElementById("det-opcoes");
  opcoes.style.display = p.opcoes ? "block" : "none";
  criarOpcoes("det-tamanhos", ["450g", "900g (Recomendado)", "1.8kg"], 1);
  criarOpcoes("det-sabores", ["Baunilha Divina", "Chocolate Suíço", "Morango Silvestre"], 1);

  // "Frequentemente comprados juntos"
  var html = "";
  var juntos = ["creatina", "coqueteleira"];
  for (var i = 0; i < juntos.length; i++) {
    if (juntos[i] != p.id) {
      html += criarCard(buscarProduto(juntos[i]));
    }
  }
  document.getElementById("lista-relacionados").innerHTML = html;

  mostrarTela("produto");
}

function criarOpcoes(idCaixa, lista, marcado) {
  var html = "";
  for (var i = 0; i < lista.length; i++) {
    var classe = (i == marcado) ? "ativo" : "";
    html += '<button class="' + classe + '" aria-pressed="' + (i == marcado) + '" onclick="escolherOpcao(this)">' + lista[i] + '</button>';
  }
  document.getElementById(idCaixa).innerHTML = html;
}

function escolherOpcao(botao) {
  var irmaos = botao.parentNode.children;
  for (var i = 0; i < irmaos.length; i++) {
    irmaos[i].classList.remove("ativo");
    irmaos[i].setAttribute("aria-pressed", "false");
  }
  botao.classList.add("ativo");
  botao.setAttribute("aria-pressed", "true");
}

function favoritar() {
  var botao = document.getElementById("btn-favorito");
  var marcado = botao.getAttribute("aria-pressed") == "true";
  botao.setAttribute("aria-pressed", !marcado);
}

function mudarQtdDetalhe(valor) {
  qtdDetalhe = qtdDetalhe + valor;
  if (qtdDetalhe < 1) {
    qtdDetalhe = 1;
  }
  document.getElementById("det-qtd").innerText = qtdDetalhe;
}

function adicionarDetalhe() {
  var sabor = "";
  if (produtoAtual.opcoes) {
    var escolhido = document.querySelector("#det-sabores .ativo");
    sabor = "Sabor: " + escolhido.innerText;
  }
  colocarNoCarrinho(produtoAtual.id, qtdDetalhe, sabor);
  aviso("Produto adicionado ao carrinho!");
}

// ------------------------------------------------------------
// Carrinho
// ------------------------------------------------------------
function adicionarRapido(evento, id) {
  evento.stopPropagation(); // não abre a tela do produto
  colocarNoCarrinho(id, 1, "");

  // pequeno "pulo" no botão + aviso, para a pessoa saber que deu certo
  var botao = evento.currentTarget;
  botao.classList.remove("ok");
  void botao.offsetWidth;
  botao.classList.add("ok");
  aviso("Produto adicionado ao carrinho!");
}

function colocarNoCarrinho(id, qtd, extra) {
  for (var i = 0; i < carrinho.length; i++) {
    if (carrinho[i].id == id) {
      carrinho[i].qtd = carrinho[i].qtd + qtd;
      atualizarSelo();
      return;
    }
  }
  carrinho.push({ id: id, qtd: qtd, extra: extra });
  atualizarSelo();
}

function mudarQtdCarrinho(posicao, valor) {
  carrinho[posicao].qtd = carrinho[posicao].qtd + valor;
  if (carrinho[posicao].qtd < 1) {
    carrinho[posicao].qtd = 1;
  }
  mostrarCarrinho();
}

function removerItem(posicao) {
  carrinho.splice(posicao, 1);
  mostrarCarrinho();
}

function totalItens() {
  var total = 0;
  for (var i = 0; i < carrinho.length; i++) {
    total = total + carrinho[i].qtd;
  }
  return total;
}

function atualizarSelo() {
  var n = totalItens();
  var selo = document.getElementById("selo");
  var mudou = selo.innerText != String(n);
  selo.innerText = n;
  selo.style.display = (n > 0) ? "flex" : "none";
  document.getElementById("aba-carrinho").setAttribute("aria-label", "Carrinho, " + n + (n == 1 ? " item" : " itens"));
  if (mudou) {
    selo.classList.remove("pulso");
    void selo.offsetWidth;
    selo.classList.add("pulso");
  }
}

function mostrarCarrinho() {
  var html = "";
  var subtotal = 0;

  for (var i = 0; i < carrinho.length; i++) {
    var item = carrinho[i];
    var p = buscarProduto(item.id);
    subtotal = subtotal + p.preco * item.qtd;

    html += '<div class="item">' +
      '<div class="item-foto">' + tagImagem(p, true) + '</div>' +
      '<div class="item-info">' +
        '<div class="item-titulo"><h4>' + p.nome + '</h4>' +
          '<button class="remover" aria-label="Remover ' + p.nome + '" onclick="removerItem(' + i + ')">' + icone("fechar") + '</button></div>' +
        '<p>' + item.extra + '</p>' +
        '<div class="item-preco"><span>' + dinheiro(p.preco) + '</span>' +
          '<div class="contador">' +
            '<button aria-label="Diminuir quantidade de ' + p.nome + '" onclick="mudarQtdCarrinho(' + i + ', -1)">' + icone("menos") + '</button>' +
            '<span aria-live="polite">' + item.qtd + '</span>' +
            '<button class="mais" aria-label="Aumentar quantidade de ' + p.nome + '" onclick="mudarQtdCarrinho(' + i + ', 1)">' + icone("mais") + '</button>' +
          '</div></div>' +
      '</div>' +
    '</div>';
  }

  var vazio = (carrinho.length == 0);
  if (vazio) {
    html = '<div class="carrinho-vazio">' + icone("carrinho") + '<p>Seu carrinho está vazio.</p>' +
           '<button onclick="abrirCategoria(\'suplementos\')">Ver produtos</button></div>';
  }

  document.getElementById("lista-carrinho").innerHTML = html;
  document.getElementById("area-resumo").style.display = vazio ? "none" : "block";
  document.getElementById("carrinho-itens").innerText = totalItens() + (totalItens() == 1 ? " Item" : " Itens");
  document.getElementById("resumo-subtotal").innerText = dinheiro(subtotal);
  document.getElementById("resumo-total").innerText = dinheiro(subtotal);
  atualizarSelo();
}

function finalizar() {
  aviso("Pedido finalizado! Obrigado por comprar na C.F.G Force Store.");
  carrinho = [];
  mostrarCarrinho();
}

// ------------------------------------------------------------
// Detalhes de interface
// ------------------------------------------------------------
// Elementos com role="button" (ex.: banner) também respondem a Enter e Espaço
document.addEventListener("keydown", function (e) {
  var alvo = e.target;
  if (alvo.getAttribute && alvo.getAttribute("role") == "button" && (e.key == "Enter" || e.key == " ")) {
    e.preventDefault();
    alvo.click();
  }
});

// Mostra a linha embaixo do cabeçalho só depois de rolar a página
window.addEventListener("scroll", function () {
  document.body.classList.toggle("rolou", window.scrollY > 4);
}, { passive: true });

// ------------------------------------------------------------
// Carrossel de promoções
// ------------------------------------------------------------
var slideAtual = 0;
var timerCarrossel = null;
var carrosselPausado = false;   // pausado pelo botão
var carrosselEmUso = false;     // mouse em cima / foco / dedo na tela
var menosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function slides() {
  return document.querySelectorAll("#carrossel-trilho .banner");
}

function irParaSlide(indice) {
  var lista = slides();
  slideAtual = (indice + lista.length) % lista.length;
  var trilho = document.getElementById("carrossel-trilho");
  trilho.scrollTo({ left: lista[slideAtual].offsetLeft - lista[0].offsetLeft, behavior: menosMovimento ? "auto" : "smooth" });
  marcarPonto();
}

function marcarPonto() {
  var pontos = document.querySelectorAll("#carrossel-pontos button");
  for (var i = 0; i < pontos.length; i++) {
    if (i == slideAtual) {
      pontos[i].setAttribute("aria-current", "true");
    } else {
      pontos[i].removeAttribute("aria-current");
    }
  }
}

function proximoSlide() {
  // só troca sozinho se a home estiver aberta e ninguém estiver mexendo
  var naHome = document.getElementById("tela-home").classList.contains("ativa");
  if (naHome && !carrosselEmUso && !document.hidden) {
    irParaSlide(slideAtual + 1);
  }
}

function iniciarCarrossel() {
  clearInterval(timerCarrossel);
  if (!carrosselPausado) {
    timerCarrossel = setInterval(proximoSlide, 5000);
  }
}

function alternarPausa() {
  carrosselPausado = !carrosselPausado;
  var botao = document.getElementById("carrossel-pausa");
  botao.setAttribute("aria-label", carrosselPausado ? "Continuar promoções" : "Pausar promoções");
  botao.querySelector("use").setAttribute("href", carrosselPausado ? "#i-play" : "#i-pausa");
  if (carrosselPausado) {
    clearInterval(timerCarrossel);
  } else {
    iniciarCarrossel();
  }
}

function configurarCarrossel() {
  var carrossel = document.getElementById("carrossel");
  var trilho = document.getElementById("carrossel-trilho");

  // quando a pessoa arrasta, descobre qual slide ficou na tela
  var esperaRolagem = null;
  trilho.addEventListener("scroll", function () {
    clearTimeout(esperaRolagem);
    esperaRolagem = setTimeout(function () {
      var largura = slides()[0].offsetWidth + 12; // 12 = gap do CSS
      slideAtual = Math.round(trilho.scrollLeft / largura);
      marcarPonto();
    }, 80);
  }, { passive: true });

  // pausa enquanto alguém está usando
  function emUso() { carrosselEmUso = true; }
  function livre() { carrosselEmUso = false; iniciarCarrossel(); }
  carrossel.addEventListener("mouseenter", emUso);
  carrossel.addEventListener("mouseleave", livre);
  carrossel.addEventListener("focusin", emUso);
  carrossel.addEventListener("focusout", livre);
  trilho.addEventListener("touchstart", emUso, { passive: true });
  trilho.addEventListener("touchend", livre, { passive: true });

  // setas do teclado trocam o slide
  carrossel.addEventListener("keydown", function (e) {
    if (e.key == "ArrowRight") { irParaSlide(slideAtual + 1); }
    if (e.key == "ArrowLeft")  { irParaSlide(slideAtual - 1); }
  });

  // quem pediu menos movimento começa com o carrossel parado
  if (menosMovimento) {
    alternarPausa();
  } else {
    iniciarCarrossel();
  }
}

// ------------------------------------------------------------
// Começo
// ------------------------------------------------------------
configurarCarrossel();
mostrarHome();
mostrarCarrinho();
mostrarTela("home");
