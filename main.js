import {
    atualizaDado,
    adicionaValor,
    imprimeTabuleiro,
    atualizaSoma,
    retiraValorDoTabuleiro,
    rolarDado,
    verificaTerminarTabuleiro,
    determinaVencedor
} from './funcoes.js';

import {
    colunaBom,
    colunaMal
} from './inimigo.js';

//Reinicia o jogo do 0. 
function reiniciar(){
    if(timeoutInimigo){
        clearTimeout(timeoutInimigo);
    }
    colunasJogador = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
    colunasInimigo = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
    for(let i = 0; i < 3; i++){
        somaTextoJogador[i].textContent = 0;
        somaTextoInimigo[i].textContent = 0;
    }
    jogoTerminou = false;
    vencedorTexto.textContent = "Vencedor: ";
    imprimeTabuleiro(tabuleiroJogador, colunasJogador);
    imprimeTabuleiro(tabuleiroInimigo, colunasInimigo);
    dadoValor = atualizaDado(dadoImg);
    for(let i = 0; i < 3; i++){
        botoes[i].disabled = false;
    }
}
//Faz a ação do jogador
function acaoJogador(coluna){
    if(jogoTerminou){
        return;
    }
    let conseguiu = adicionaValor(colunasJogador, coluna, dadoValor, caixasJogador);
    if(conseguiu){
        //Atualiza tabuleiro jogador
        imprimeTabuleiro(tabuleiroJogador, colunasJogador);
        atualizaSoma(coluna, somaTextoJogador, colunasJogador);
        //Atualiza tabuleiro inimigo
        retiraValorDoTabuleiro(colunasInimigo, coluna, dadoValor, caixasInimigo);
        atualizaSoma(coluna, somaTextoInimigo, colunasInimigo);
        //Espera um tempo para atualizar o tabuleiro do inimigo
        setTimeout(() => imprimeTabuleiro(tabuleiroInimigo, colunasInimigo), 500);
        
        jogoTerminou = verificaTerminarTabuleiro(colunasJogador);
        if(jogoTerminou){
            let vencedor = determinaVencedor(colunasJogador, colunasInimigo);
            vencedorTexto.textContent = "Vencedor: " + vencedor;
        } else {
            //Troca o dado
            dadoValor = atualizaDado(dadoImg);
            //Desativa os botões para evitar que o jogador coloque mais de uma vez antes do inimigo
            for(let i = 0; i < 3; i++){
                botoes[i].disabled = true;
            }
            //Chama ação do inimigo
            timeoutInimigo = setTimeout(acaoInimigo, 1000);
        }
    } else {
        //FIXME:
        //Colocar som ou alguma coisa para indicar que não conseguiu colocar
        console.log("Não conseguiu colocar");
    }
}
//Faz a ação do inimigo
function acaoInimigo(){
    if(jogoTerminou){
        return;
    }
    dadoInimigo = rolarDado();

    //Escolhe a coluna de forma aleatória
    
    let coluna = Math.floor(Math.random() * 3);
    let conseguiu = adicionaValor(colunasInimigo, coluna, dadoInimigo, caixasInimigo);
    while(!conseguiu){
        coluna = Math.floor(Math.random() * 3);
        conseguiu = adicionaValor(colunasInimigo, coluna, dadoInimigo, caixasInimigo);
    }

    //Escolhe a coluna conforme as funções do inimigo
    /* Comentado para testar outras funcionalidades
    let coluna = colunaBom(colunasInimigo, colunasJogador, dadoInimigo);
    adicionaValor(colunasInimigo, coluna, dadoInimigo, caixasInimigo);*/

    //Atualiza tabuleiro inimigo
    imprimeTabuleiro(tabuleiroInimigo, colunasInimigo);
    atualizaSoma(coluna, somaTextoInimigo, colunasInimigo);
    //Atualiza tabuleiro jogador
    retiraValorDoTabuleiro(colunasJogador, coluna, dadoInimigo, caixasJogador);
    atualizaSoma(coluna, somaTextoJogador, colunasJogador);
    //Espera um tempo para atualizar o tabuleiro do jogador
    setTimeout(() => imprimeTabuleiro(tabuleiroJogador, colunasJogador), 500);
    //Verifica se o jogo terminou.
    jogoTerminou = verificaTerminarTabuleiro(colunasInimigo);
    if(jogoTerminou){
        let vencedor = determinaVencedor(colunasJogador, colunasInimigo);
        vencedorTexto.textContent = "Vencedor: " + vencedor;
    } else {
        //Reativa os botões
        for(let i = 0; i < 3; i++){
            botoes[i].disabled = false;
        }
    }
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
const reiniciarBotao = document.querySelector("button.reinicia");

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
let timeoutInimigo;

//Inicia o jogo
dadoValor = atualizaDado(dadoImg);
//Para cada botão, passa a função com o parâmetro da coluna
for(let i = 0; i < 3; i++){
    botoes[i].addEventListener("click", () => acaoJogador(i));
}
reiniciarBotao.addEventListener("click", reiniciar);