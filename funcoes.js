const spritesDados = [
    'Sprites/dado1.png',
    'Sprites/dado2.png',
    'Sprites/dado3.png',
    'Sprites/dado4.png',
    'Sprites/dado5.png',
    'Sprites/dado6.png'
]

function rolarDado(){
    return Math.floor(Math.random() * 6) + 1;
}

function imagemDado(indice){
    return spritesDados[indice];
}

// atualiza o valor do dado no HTML
function atualizaDado(dadoTexto){
    let dadoValor = rolarDado();
    dadoTexto.src = imagemDado(dadoValor - 1);
    return dadoValor;
}

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

export {
    atualizaDado,
    imprimeTabuleiro
}