import {
    atualizaDado,
    setTabuleiroJogador,
    setSomaTextoJogador,
    setCaixasJogador,
    setTabuleiroInimigo,
    setSomaTextoInimigo,
    setCaixasInimigo,
    setBotoes,
    setReiniciarBotao,
    setDadoImg,
    setVencedorTexto,
    acaoJogador
} from './funcoes.js';

//Faz a ação do jogador
function acaoJogadorAqui(coluna){
    acaoJogador(coluna);
}

//Recebe os elementos do HTML do jogador
const tabuleiroJogador = document.querySelectorAll("#jogador .caixa img");
setTabuleiroJogador(tabuleiroJogador);

const somaTextoJogador = document.querySelectorAll("#somaPlayer .caixa p");
setSomaTextoJogador(somaTextoJogador);

const caixasJogador = document.querySelectorAll("#jogador .caixa");
setCaixasJogador(caixasJogador);

//Recebe os elementos do HTML do inimigo
const tabuleiroInimigo = document.querySelectorAll("#inimigo .caixa img");
setTabuleiroInimigo(tabuleiroInimigo);

const somaTextoInimigo = document.querySelectorAll("#somaInimigo .caixa p");
setSomaTextoInimigo(somaTextoInimigo);

const caixasInimigo = document.querySelectorAll("#inimigo .caixa");
setCaixasInimigo(caixasInimigo);

//Recebe elementos gerais do HTML
const botoes = document.querySelectorAll("button.botao");
setBotoes(botoes);

const dadoImg = document.querySelector("img.dado");
setDadoImg(dadoImg);

const vencedorTexto = document.querySelector("p.resultado");
setVencedorTexto(vencedorTexto);

const reiniciarBotao = document.querySelector("button.reinicia");
setReiniciarBotao(reiniciarBotao);

//Para cada botão, passa a função com o parâmetro da coluna
for(let i = 0; i < 3; i++){
    botoes[i].addEventListener("click", () => acaoJogadorAqui(i));
}
//Inicia o jogo
atualizaDado();
//reiniciarBotao.addEventListener("click", reiniciar);