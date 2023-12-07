import {
    rolarDado,
} from './funcoes.js';

//Funções sobre as jogadas do inimigo

//Função verifica qual a jogada que mais prejudica o jogador
function colunaMal(colunaInimigo, colunaJogador, dadoInimigo){
    let qtd = [0, 0, 0];
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(colunaJogador[i][j] == dadoInimigo){
                qtd[i]++;
            }
        }
    }
    let maior = 0;
    for(let i = 1; i < 3; i++){
        if(qtd[i] > qtd[maior] && colunaInimigo[i][2] == 0){
            maior = i;
        }
    }
    return maior;
}

function colunaBom(colunaInimigo, dadoInimigo){
    let qtd = [0, 0, 0];
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(colunaInimigo[i][j] == dadoInimigo){
                qtd[i]++;
            }
        }
    }
    let maior = 0;
    for(let i = 1; i < 3; i++){
        if(qtd[i] > qtd[maior] && colunaInimigo[i][2] == 0){
            maior = i;
        }
    }
    return maior;
}

export {colunaBom, colunaMal};