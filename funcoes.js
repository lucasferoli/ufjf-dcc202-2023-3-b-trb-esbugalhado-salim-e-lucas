const spritesDados = [
    'Sprites/dado1.png',
    'Sprites/dado2.png',
    'Sprites/dado3.png',
    'Sprites/dado4.png',
    'Sprites/dado5.png',
    'Sprites/dado6.png'
]

//Retorna um número aleatório entre 1 e 6
function rolarDado(){
    return Math.floor(Math.random() * 6) + 1;
}
// Retorna o caminho da imagem do dado
function imagemDado(indice){
    return spritesDados[indice];
}
// atualiza o valor do dado no HTML
function atualizaDado(dadoTexto){
    let dadoValor = rolarDado();
    dadoTexto.src = imagemDado(dadoValor - 1);
    return dadoValor;
}
// Imprime o tabuleiro no HTML
function imprimeTabuleiro(tabuleiro, colunas){
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            let k = i * 3 + j;
            if(colunas[i][j] == 0){
                tabuleiro[k].src = "";
            } else {
                tabuleiro[k].src = imagemDado(colunas[i][j] - 1);
            }
        }
    }
}
// Adiciona um valor na coluna do tabuleiro
function adicionaValor(tabuleiro, coluna, valor){
    if(coluna < 0 || coluna > 2) {
        console.log("Coluna inválida");
        return false; // Se a coluna for inválida, retorna false
    }
    let linha = 0;
    while(tabuleiro[coluna][linha] != 0 && linha < 3){
        linha++;
    }
    if(linha <= 2 && linha >= 0){
        tabuleiro[coluna][linha] = valor;
        return true;
    }
    console.log("Coluna cheia");
    return false;
}
// Retorna quantas vezes um valor aparece na coluna
function quantasVezesApareceNaColuna(coluna, valor){
    let vezes = 0;
    for(let i = 0; i < 3; i++){
        if(coluna[i] == valor){
            vezes++;
        }
    }
    return vezes;
}
// Retorna a soma de uma coluna
function somaColuna(coluna){
    let soma = 0;
    for(let i = 0; i < 3; i++){
        soma += coluna[i] * quantasVezesApareceNaColuna(coluna, coluna[i]);
    }
    return soma;
}
// Atualiza a soma no HTML
function atualizaSoma(indice, somaTexto, colunas){
    let soma = somaColuna(colunas[indice]);
    somaTexto[indice].textContent = soma;
}

function retiraValorDoTabuleiro(colunas, coluna, valor){
    if(coluna < 0 || coluna > 2) {
        console.log("Coluna inválida");
        return;
    }
    for(let i = 0; i < 3; i++){
        if(colunas[coluna][i] == valor){
            colunas[coluna][i] = 0;
        }
    }
    //Corrige posição dos valores
    //FIXME: Aqui funciona, mas gostaria de fazer mais eficiente
    for(let i = 1; i < 3; i++){
        if(colunas[coluna][i-1] == 0){
            colunas[coluna][i - 1] = colunas[coluna][i];
            colunas[coluna][i] = 0;
        }
    }
    return;
}

export {
    atualizaDado,
    imprimeTabuleiro,
    adicionaValor,
    atualizaSoma,
    retiraValorDoTabuleiro,
    rolarDado
}