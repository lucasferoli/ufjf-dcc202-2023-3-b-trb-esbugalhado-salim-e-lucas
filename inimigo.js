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
    //Se não há jogada para prejudicar o jogador, faz aleatória
    if(qtd[0] == 0 && qtd[1] == 0 && qtd[2] == 0){
        let coluna = Math.floor(Math.random() * 3);
        while(colunaInimigo[coluna][2] != 0){
            coluna = Math.floor(Math.random() * 3);
        }
        return coluna;
    }

    //Escolhe a coluna que tem mais vezes o dado e que não está cheia
    let maior = ordenaIndices(qtd);
    for(let i = 0; i < 3; i++){
        if(colunaInimigo[maior[i]][2] == 0){
            return maior[i];
        }
    }
    return 0;
}

//Função que ordena os índices de um vetor de forma decrescente
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


//FIXME: Não está funcionando corretamente
function colunaBom(colunaInimigo, dadoInimigo){
    let qtd = [0, 0, 0];
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(colunaInimigo[i][j] == dadoInimigo){
                qtd[i]++;
            }
        }
    }
    if(qtd[0] == 0 && qtd[1] == 0 && qtd[2] == 0){
        let coluna = Math.floor(Math.random() * 3);
        while(colunaInimigo[coluna][2] != 0){
            coluna = Math.floor(Math.random() * 3);
        }
        return coluna;
    }

    let maior = ordenaIndices(qtd);

    for(let i = 0; i < 3; i++){
        if(colunaInimigo[maior[i]][2] == 0){
            return maior[i];
        }
    }
    return 0;
}

export {colunaBom, colunaMal};