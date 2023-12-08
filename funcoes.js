//Sprites dos dados
const spritesDados = [
    'Sprites/dado1.png',
    'Sprites/dado2.png',
    'Sprites/dado3.png',
    'Sprites/dado4.png',
    'Sprites/dado5.png',
    'Sprites/dado6.png'
]
//Variáveis do jogo e funções set
let colunasJogador = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
let colunasInimigo = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]
let dadoValor = 0;
let dadoInimigo = 0;
let jogoTerminou = false;
let timeoutInimigo;

// #region Funções set e variáveis
//Recebe os elementos do HTML do jogador
let tabuleiroJogador;
function setTabuleiroJogador(tabuleiro){
    tabuleiroJogador = tabuleiro;
}
let somaTextoJogador;
function setSomaTextoJogador(texto){
    somaTextoJogador = texto;
}
let caixasJogador;
function setCaixasJogador(caixas){
    caixasJogador = caixas;
}
//Recebe os elementos do HTML do inimigo
let tabuleiroInimigo;
function setTabuleiroInimigo(tabuleiro){
    tabuleiroInimigo = tabuleiro;
}
let somaTextoInimigo;
function setSomaTextoInimigo(texto){
    somaTextoInimigo = texto;
}
let caixasInimigo;
function setCaixasInimigo(caixas){
    caixasInimigo = caixas;
}
//Recebe elementos gerais do HTML
let botoes;
function setBotoes(bts){
    botoes = bts;
}
let dadoImg;
function setDadoImg(img){
    dadoImg = img;
}
let vencedorTexto;
function setVencedorTexto(texto){
    vencedorTexto = texto;
}
function setReiniciarBotao(botao){
    botao.addEventListener("click", reiniciar);
}
//#endregion

//Retorna um número aleatório entre 1 e 6
function numeroDado(){
    return Math.floor(Math.random() * 6) + 1;
}
// Retorna o caminho da imagem do dado
function imagemDado(indice){
    return spritesDados[indice];
}
// atualiza o valor do dado no HTML
function atualizaDado(){
    dadoValor = numeroDado();
    dadoImg.src = imagemDado(dadoValor - 1);
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
function adicionaValor(tabuleiro, coluna, valor, caixa){
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
        caixa[coluna * 3 + linha].classList.add("colocar");
        setTimeout(() => reiniciaAnimacaoColocar(caixa[coluna * 3 + linha]), 500);
        return true;
    }
    console.log("Coluna cheia");
    return false;
}
function reiniciaAnimacaoColocar(caixa){
    caixa.classList.remove("colocar");
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
// Retira valor do tabuleiro
function retiraValorDoTabuleiro(colunas, coluna, valor, caixa){
    if(coluna < 0 || coluna > 2) {
        console.log("Coluna inválida");
        return;
    }
    for(let i = 0; i < 3; i++){
        if(colunas[coluna][i] == valor){
            colunas[coluna][i] = 0;
            caixa[coluna * 3 + i].classList.add("retirar");
            setTimeout(() => reiniciaAnimacaoRetirar(caixa[coluna * 3 + i]), 500);
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
    for(let i = 1; i < 3; i++){
        if(colunas[coluna][i-1] == 0){
            colunas[coluna][i - 1] = colunas[coluna][i];
            colunas[coluna][i] = 0;
        }
    }
    return;
}
// Reinicia animação, permitindo chamar novamente.
function reiniciaAnimacaoRetirar(caixa){
    caixa.classList.remove("retirar");
}
//Verifica se o tabuleiro está completo. 
function verificaTerminarTabuleiro(tabuleiro){
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(tabuleiro[i][j] == 0){
                return false;
            }
        }
    }
    return true;
}
//Determina o vencedor
function determinaVencedor(colunasJogador, colunasInimigo){
    let jogador = 0;
    let inimigo = 0;
    for(let i = 0; i < 3; i++){
        jogador += somaColuna(colunasJogador[i]);
        inimigo += somaColuna(colunasInimigo[i]);
    }
    if(jogador > inimigo){
        return "Jogador";
    } else if(jogador < inimigo){
        return "Inimigo";
    } else {
        return "Empate";
    }
}

//#region funções ativas (Chamam as outras funções para o jogo funcionar)
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
            atualizaDado();
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
function acaoInimigo(){
    if(jogoTerminou){
        return;
    }
    dadoInimigo = numeroDado();

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
        for(let i = 0; i < botoes.length; i++){
            botoes[i].disabled = false;
        }
    }
}
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
    atualizaDado();
    for(let i = 0; i < 3; i++){
        botoes[i].disabled = false;
    }
}
//#endregion

export {
    atualizaDado,
    adicionaValor,
    atualizaSoma,
    retiraValorDoTabuleiro,
    verificaTerminarTabuleiro,
    determinaVencedor,
    setTabuleiroJogador,
    setSomaTextoJogador,
    setCaixasJogador,
    setTabuleiroInimigo,
    setSomaTextoInimigo,
    setCaixasInimigo,
    setBotoes,
    setDadoImg,
    setVencedorTexto,
    setReiniciarBotao,
    acaoInimigo,
    acaoJogador
}