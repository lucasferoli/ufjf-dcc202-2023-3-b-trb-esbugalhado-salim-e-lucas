import {
    atualizaDado,
    setTabuleiroJogador,
    setSomaTextoJogador,
    setCaixasJogador,
    setTabuleiroInimigo,
    setSomaTextoInimigo,
    setCaixasInimigo,
    setBotoes,
    setDadoImg,
    setVencedorTexto,
    acaoJogador,
    setSomaTotalTextoJogador,
    setSomaTotalTextoInimigo,
    setImgJogador,
    setImgInimigo,
    setInimigo,
    setNomeInimigo,
    setBotaoInimigo,
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

const somaTotalTextoJogador = document.querySelector(".pontosJogador");
setSomaTotalTextoJogador(somaTotalTextoJogador);

const imgJogador = document.querySelector(".imgJogador");
setImgJogador(imgJogador);  

//Recebe os elementos do HTML do inimigo
const tabuleiroInimigo = document.querySelectorAll("#inimigo .caixa img");
setTabuleiroInimigo(tabuleiroInimigo);

const somaTextoInimigo = document.querySelectorAll("#somaInimigo .caixa p");
setSomaTextoInimigo(somaTextoInimigo);

const caixasInimigo = document.querySelectorAll("#inimigo .caixa");
setCaixasInimigo(caixasInimigo);

const somaTotalTextoInimigo = document.querySelector(".pontosInimigo");
setSomaTotalTextoInimigo(somaTotalTextoInimigo);

const imgInimigo = document.querySelector(".imgInimigo");
setImgInimigo(imgInimigo);

const nomeInimigo = document.querySelector(".nomeInimigo");
setNomeInimigo(nomeInimigo);

let inimigo = 0;
const botaoInimigo = document.querySelector("button.botaor");
setBotaoInimigo(botaoInimigo);
botaoInimigo.addEventListener("click", mudaInimigo);

function mudaInimigo(){
    inimigo++;
    if(inimigo > 2){
        inimigo = 0;
    }
    setInimigo(inimigo);
}

//Recebe elementos gerais do HTML
const botoes = document.querySelectorAll("button.botao");
setBotoes(botoes);

const dadoImg = document.querySelector("img.dado");
setDadoImg(dadoImg);

const vencedorTexto = document.querySelector("p.resultado");
setVencedorTexto(vencedorTexto);

setInimigo(2);
//Para cada botão, passa a função com o parâmetro da coluna
for(let i = 0; i < 3; i++){
    botoes[i].addEventListener("click", () => acaoJogadorAqui(i));
}
//Inicia o jogo
atualizaDado();
//reiniciarBotao.addEventListener("click", reiniciar);