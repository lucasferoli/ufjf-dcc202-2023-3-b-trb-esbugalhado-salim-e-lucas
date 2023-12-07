import {
    rolarDado,
} from './funcoes.js';

//Funções sobre as jogadas do inimigo

//Função verifica qual a jogada que mais prejudica o jogador
function colunaMal(colunaInimigo, colunaJogador, dadoInimigo){
    //Conta a quantidade de vezes que o dado aparece na coluna do jogador
    let qtd = [0, 0, 0];
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(colunaJogador[i][j] == dadoInimigo){
                qtd[i]++;
            }
        }
    }
    //Escolhe a coluna que tem mais vezes o dado e que não está cheia
    let maior = ordenaIndices(qtd);
    for(let i = 0; i < 3; i++){
        if(colunaInimigo[maior[i]][2] == 0){
            return maior[i];
        }
    }
}

function ordenaIndices(coluna){
    let maior = [0, 1, 2];
    let ordenado = false;
    while(!ordenado){
        ordenado = true;
        for(let i = 0; i < 3; i++){
            if(coluna[maior[i]] < coluna[maior[i + 1]]){
                let aux = maior[i];
                maior[i] = maior[i + 1];
                maior[i + 1] = aux;
                ordenado = false;
            }
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
    
    let maiores = 0;
    for(let i = 1; i < 3; i++){
        if(qtd[i] > qtd[maior] && colunaInimigo[i][2] == 0){
            maior = i;
        }
    }
    return maior;
}

export {colunaBom, colunaMal};