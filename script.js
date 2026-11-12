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
function tagImagem(p) {
  return '<img src="img/' + p.foto + '" alt="' + p.nome + '" onerror="this.style.display=\'none\'">';
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
  }
  // o produto pertence à aba "Categorias"
  var aba = (nome == "produto") ? "categorias" : nome;
  document.getElementById("aba-" + aba).classList.add("ativo");

  if (nome == "carrinho") {
    mostrarCarrinho();
  }
  window.scrollTo(0, 0);
}

// ------------------------------------------------------------
// Cards de produto
// ------------------------------------------------------------
function criarCard(p) {
  return '<div class="card" onclick="abrirProduto(\'' + p.id + '\')">' +
    '<div class="card-foto">' + tagImagem(p) + '</div>' +
    '<div class="card-info">' +
      '<div class="card-meta"><span>' + p.tipo + '</span><b><span class="estrela">☆</span> ' + p.nota.toFixed(1) + '</b></div>' +
      '<p class="card-nome">' + p.nome + '</p>' +
      '<div class="card-preco"><span>' + dinheiro(p.preco) + '</span>' +
        '<button class="btn-mais" onclick="adicionarRapido(event, \'' + p.id + '\')">+</button></div>' +
    '</div>' +
  '</div>';
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
  document.getElementById("ordem-popular").className = (ordemAtual == "popular") ? "ativo" : "";
  document.getElementById("ordem-preco").className = (ordemAtual == "preco") ? "ativo" : "";

  var html = "";
  for (var j = 0; j < lista.length; j++) {
    html += criarCard(lista[j]);
  }
  if (lista.length == 0) {
    html = '<p class="vazio">Ainda não temos produtos nesta categoria.</p>';
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
  document.getElementById("btn-favorito").innerText = "🤍";

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
    html += '<button class="' + classe + '" onclick="escolherOpcao(this)">' + lista[i] + '</button>';
  }
  document.getElementById(idCaixa).innerHTML = html;
}

function escolherOpcao(botao) {
  var irmaos = botao.parentNode.children;
  for (var i = 0; i < irmaos.length; i++) {
    irmaos[i].classList.remove("ativo");
  }
  botao.classList.add("ativo");
}

function favoritar() {
  var botao = document.getElementById("btn-favorito");
  botao.innerText = (botao.innerText == "🤍") ? "💖" : "🤍";
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
  alert("Produto adicionado ao carrinho!");
}

// ------------------------------------------------------------
// Carrinho
// ------------------------------------------------------------
function adicionarRapido(evento, id) {
  evento.stopPropagation(); // não abre a tela do produto
  colocarNoCarrinho(id, 1, "");
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
  selo.innerText = n;
  selo.style.display = (n > 0) ? "flex" : "none";
}

function mostrarCarrinho() {
  var html = "";
  var subtotal = 0;

  for (var i = 0; i < carrinho.length; i++) {
    var item = carrinho[i];
    var p = buscarProduto(item.id);
    subtotal = subtotal + p.preco * item.qtd;

    html += '<div class="item">' +
      '<div class="item-foto">' + tagImagem(p) + '</div>' +
      '<div class="item-info">' +
        '<div class="item-titulo"><h4>' + p.nome + '</h4>' +
          '<button class="remover" onclick="removerItem(' + i + ')">✕</button></div>' +
        '<p>' + item.extra + '</p>' +
        '<div class="item-preco"><span>' + dinheiro(p.preco) + '</span>' +
          '<div class="contador">' +
            '<button onclick="mudarQtdCarrinho(' + i + ', -1)">-</button>' +
            '<span>' + item.qtd + '</span>' +
            '<button class="mais" onclick="mudarQtdCarrinho(' + i + ', 1)">+</button>' +
          '</div></div>' +
      '</div>' +
    '</div>';
  }

  var vazio = (carrinho.length == 0);
  if (vazio) {
    html = '<div class="carrinho-vazio"><p>Seu carrinho está vazio.</p>' +
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
  alert("Pedido finalizado! Obrigado por comprar na C.F.G Force Store.");
  carrinho = [];
  mostrarCarrinho();
}

// ------------------------------------------------------------
// Começo
// ------------------------------------------------------------
mostrarHome();
mostrarCarrinho();
mostrarTela("home");
