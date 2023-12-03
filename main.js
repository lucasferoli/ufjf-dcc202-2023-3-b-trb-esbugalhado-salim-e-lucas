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

function reiniciar(){
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
}

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
        retiraValorDoTabuleiro(colunasInimigo, coluna, dadoValor);
        atualizaSoma(coluna, somaTextoInimigo, colunasInimigo);
        imprimeTabuleiro(tabuleiroInimigo, colunasInimigo);
        
        jogoTerminou = verificaTerminarTabuleiro(colunasJogador);
        if(jogoTerminou){
            let vencedor = determinaVencedor(colunasJogador, colunasInimigo);
            vencedorTexto.textContent = "Vencedor: " + vencedor;
        } else {
            //Troca o dado
            dadoValor = atualizaDado(dadoImg);
            for(let i = 0; i < 3; i++){
                botoes[i].disabled = true;
            }
            //Chama ação do inimigo
            setTimeout(acaoInimigo, 1000);
        }
    } else {
        //FIXME:
        //Colocar som ou alguma coisa para indicar que não conseguiu colocar
        console.log("Não conseguiu colocar");
    }
}
function acaoInimigo(){
    if(jogoTerminou){
        return;
    }
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

    jogoTerminou = verificaTerminarTabuleiro(colunasJogador);
    if(jogoTerminou){
        let vencedor = determinaVencedor(colunasJogador, colunasInimigo);
        vencedorTexto.textContent = "Vencedor: " + vencedor;
    } else {
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

dadoValor = atualizaDado(dadoImg);
for(let i = 0; i < 3; i++){
    botoes[i].addEventListener("click", () => acaoJogador(i));
}
reiniciarBotao.addEventListener("click", reiniciar);