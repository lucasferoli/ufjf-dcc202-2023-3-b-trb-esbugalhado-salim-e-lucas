
//Recebe os elementos do HTML do jogador
const tabuleiroJogador = document.querySelectorAll("#jogador .caixa img");
const somaTextoJogador = document.querySelectorAll("#somaPlayer .caixa p");
const caixasJogador = document.querySelectorAll("#jogador .caixa");

//Recebe os elementos do HTML do inimigo
const tabuleiroInimigo = document.querySelectorAll("#inimigo .caixa img");
const somaTextoInimigo = document.querySelectorAll("#somaInimigo .caixa p");
const caixasInimigo = document.querySelectorAll("#inimigo .caixa");

//Recebe elementos gerais do HTML
const botoes = document.querySelectorAll("button.botao");
const dadoImg = document.querySelector("img.dado")
const vencedorTexto = document.querySelector("p.resultado");