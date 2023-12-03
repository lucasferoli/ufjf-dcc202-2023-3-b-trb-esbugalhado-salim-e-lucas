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

export {
    atualizaDado
}