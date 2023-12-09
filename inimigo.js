//Funções sobre as jogadas do inimigo
function colunaValida(coluna){
    for(let i = 0; i < 3; i++){
        if(coluna[i] === 0){
            return true;
        }
    }
    return false;
}
//Função verifica qual a jogada que mais prejudica o jogador
function colunaMal(colunaInimigo, colunaJogador, dadoInimigo){
    //Conta a quantidade de vezes que o dado aparece na coluna do jogador
    let qtd = [0, 0, 0];
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(colunaJogador[i][j] === dadoInimigo){
                qtd[i]++;
            }
        }
    }

    //Se não há jogada para prejudicar o jogador, faz aleatória
    if(qtd[0] === 0 && qtd[1] === 0 && qtd[2] === 0){
        let coluna = Math.floor(Math.random() * 3);
        while(!colunaValida(colunaInimigo[coluna])){
            coluna = Math.floor(Math.random() * 3);
        }
        return coluna;
    }

    //Escolhe a coluna que tem mais vezes o dado e que não está cheia
    let maior = ordenaIndices(qtd);
    for(let i = 0; i < 3; i++){
        if(colunaValida(colunaInimigo[maior[i]])){
            return maior[i];
        }
    }
    console.log("Erro na escolha de coluna do inimigo");
    return 0;
}



//FIXME: Não está funcionando corretamente
function colunaBom(colunaInimigo, colunaJogador, dadoInimigo){
    let qtd = [0, 0, 0];
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(colunaInimigo[i][j] === dadoInimigo){
                qtd[i]++;
            }
        }
    }
    
    let maior = ordenaIndices(qtd);
    
    if(qtd[0] == 0 && qtd[1] == 0 && qtd[2] == 0){
        let retorno = selecionaColunaVazia(colunaInimigo);
        console.log(retorno);
        return retorno;
    }

    for(let i = 0; i < 3; i++){
        if(colunaValida(colunaInimigo[maior[i]])){
            return maior[i];
        }
    }
    console.log("Erro na escolha de coluna do inimigo");
    return 0;
}

function colunaAleatoria(colunaInimigo, colunaJogador, dadoValor){
    let coluna = Math.floor(Math.random() * 3);
    while(!colunaValida(colunaInimigo[coluna])){
        coluna = Math.floor(Math.random() * 3);
    }
    return coluna;
}

function selecionaColunaVazia(colunaInimigo){
    let maior = ordenaIndices(colunaInimigo);
    for(let i = 2; i >= 0; i--){
        if(colunaValida(colunaInimigo[maior[i]])){
            return maior[i];
        }
    }
    
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

let tiposInimigo = [
    {
        nome: "Anjo",
        coluna: colunaBom,
        sprite: "Sprites/Anjo.png"
    },
    {
        nome: "Demônio",
        coluna: colunaMal,
        sprite: "Sprites/Demonio.png"
    },
    {
        nome: "Zé Ninguém",
        coluna: colunaAleatoria,
        sprite: "Sprites/Feliz.png"
    }
];
function getNome(index){
    return tiposInimigo[index].nome;
}
function getFunction(index){
    return tiposInimigo[index].coluna;
}
function getSprite(index){
    return tiposInimigo[index].sprite;
}

export {getFunction, getNome, getSprite};