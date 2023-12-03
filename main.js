import {
    atualizaDado,
    adicionaValor,
    imprimeTabuleiro,
    atualizaSoma,
    retiraValorDoTabuleiro,
    rolarDado
} from './funcoes.js';

function acaoJogador(coluna){
    let conseguiu = adicionaValor(colunasJogador, coluna, dadoValor);
    if(conseguiu){
        //Atualiza tabuleiro jogador
        imprimeTabuleiro(tabuleiroJogador, colunasJogador);
        atualizaSoma(coluna, somaTextoJogador, colunasJogador);
        //Atualiza tabuleiro inimigo
        retiraValorDoTabuleiro(colunasInimigo, coluna, dadoValor);
        atualizaSoma(coluna, somaTextoInimigo, colunasInimigo);
        imprimeTabuleiro(tabuleiroInimigo, colunasInimigo);
        //Troca o dado
        dadoValor = atualizaDado(dadoImg);
        //Chama ação do inimigo
        acaoInimigo();
    } else {
        //FIXME:
        //Colocar som ou alguma coisa para indicar que não conseguiu colocar
        console.log("Não conseguiu colocar");
    }
}
function acaoInimigo(){
    dadoInimigo = rolarDado();
    let coluna = Math.floor(Math.random() * 3);
    let conseguiu = adicionaValor(colunasInimigo, coluna, dadoInimigo, caixasInimigo);
    while(!conseguiu){
        coluna = Math.floor(Math.random() * 3);
        conseguiu = adicionaValor(colunasInimigo, coluna, dadoInimigo, caixasInimigo);
    }
    //Atualiza tabuleiro inimigo
    imprimeTabuleiro(tabuleiroInimigo, colunasInimigo);
    atualizaSoma(coluna, somaTextoInimigo, colunasInimigo);
    //Atualiza tabuleiro jogador
    retiraValorDoTabuleiro(colunasJogador, coluna, dadoInimigo, caixasJogador);
    atualizaSoma(coluna, somaTextoJogador, colunasJogador);
    imprimeTabuleiro(tabuleiroJogador, colunasJogador);
}


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

//Variáveis do jogo
let colunasJogador = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]
let colunasInimigo = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]
let dadoValor = 0;
let dadoInimigo = 0;
let jogoTerminou = false;

dadoValor = atualizaDado(dadoImg);
for(let i = 0; i < 3; i++){
    botoes[i].addEventListener("click", () => acaoJogador(i));
}