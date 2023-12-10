let jogador1 = {
    nome: "",
    pontos: 0
};
let jogador2 = {
    nome: "",
    pontos: 0
};

let tabelaAtual = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
]

let resultado;
let jogadorAtual = 1;
let jogadaAtual = 1;
let jogando = false;
let modoDeJogo;


function iniciarJogo(botao) {
    console.log({jogador1, jogador2})
    if (!jogador1.nome || !jogador2.nome) {
        window.alert("O jogo precisa de dois jogadores para começar");
        return;
    }
    if (jogadorAtual == 1) {
        document.getElementById("jogadorAtual").value = "Jogando: " + jogador1.nome;

    } else {
        document.getElementById("jogadorAtual").value = "Jogando: " + jogador2.nome;
    }

    document.getElementById("tabela").style.display = "flex";
    document.getElementById("jogador1").disabled = true;
    document.getElementById("jogador2").disabled = true;
    botao.style.display = "none";

    document.getElementById("placarJogador1").value = jogador1.nome;
    document.getElementById("placarJogador2").value = jogador2.nome;

    document.getElementById("pontuacaoJogador1").value = jogador1.pontos;
    document.getElementById("pontuacaoJogador2").value = jogador2.pontos;

}

function atualizarTabela(indice, botaoAtual, numero) {
    if (botaoAtual.disabled) {
        return
    }
    botaoAtual.disabled = true;

    jogadaAtual++;
    let imagem = document.createElement("img")
    imagem.classList.add("marcacao")
    imagem.style.height = "5rem"
    imagem.style.width = "5rem"
    if (numero == 1) {
        imagem.src = "./assets/x.svg"

        jogadorAtual = 2;
        tabelaAtual[indice] = 1;

        botaoAtual.appendChild(imagem)
        !resultado && verificarJogada()

        if (jogadorAtual == 2 && modoDeJogo == 1) {
            jogadaAtual++;
            let possibilidades = tabelaAtual.map((t, indice) => {
                if (t == 0) {
                    return indice;
                }
            }).filter((t) => {
                return t != undefined;
            })
            console.log(tabelaAtual)
            let escolha = possibilidades[Math.floor(Math.random() * possibilidades.length)]
            let imagem2 = document.createElement("img")
            imagem2.classList.add("marcacao")
            imagem2.style.height = "5rem"
            imagem2.style.width = "5rem"
            imagem2.src = "./assets/o.svg"
            tabelaAtual[escolha] = 2;
            let botaoMaquina = document.querySelectorAll(".botaoTabela")[escolha]
            setTimeout(()=>{
                !resultado && verificarJogada()
                botaoMaquina.appendChild(imagem2)
                jogadorAtual = 1;
            },1500)

        }
    
        return;
    }
    else if (jogadorAtual == 2 && modoDeJogo == 0) {
        jogadorAtual = 1;
        imagem.src = "./assets/o.svg"
        tabelaAtual[indice] = 2;
        botaoAtual.appendChild(imagem)
        !resultado && verificarJogada()
    }
}

function atualizarInputNomear(event) {

}

function nomearJogador(inputAtual, numero) {
    if (numero == 1) {
        jogador1.nome = inputAtual.value;
    }
    else {
        jogador2.nome = inputAtual.value;
    }
}


function pontuarJogador(numero) {
    if (numero == 1) {
        jogador1.pontos = jogador1.pontos + 1;
    }
    else if (numero == 2) {
        jogador2.pontos = jogador2.pontos + 1;
    }
    document.getElementById("tabela").style.display = "none";
    document.getElementById("botaoIniciar").style.display = "block";
    tabelaAtual = [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
    ]
    let marcacoes = document.getElementsByClassName("marcacao")
    while (marcacoes[0]) {
        marcacoes[0].parentNode.removeChild(marcacoes[0])
    }
    document.getElementById("pontuacaoJogador1").value = jogador1.pontos;
    document.getElementById("pontuacaoJogador2").value = jogador2.pontos;

    let botoesTabela = document.querySelectorAll(".botaoTabela")

    botoesTabela.forEach((botao) => {
        botao.disabled = false;
    })
    resultado = undefined;
}

function verificarJogada() {

    if (jogadorAtual == 1) {
        document.getElementById("jogadorAtual").value = "Jogando: " + jogador1.nome;

    } else {
        document.getElementById("jogadorAtual").value = "Jogando: " + jogador2.nome;
    }
    const padroes = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [7, 5, 3]
    ]

    padroes.forEach((padrao, indice) => {

        const a = tabelaAtual[padrao[0] - 1]
        const b = tabelaAtual[padrao[1] - 1]
        const c = tabelaAtual[padrao[2] - 1]


        if (a == b && a == c && b == c) {
            if (a == 1) {
                resultado = jogador1.nome + " Venceu!"
                window.alert(resultado)
                pontuarJogador(1)
            } else if (a == 2) {
                resultado = jogador2.nome + " Venceu!"
                window.alert(resultado)
                pontuarJogador(2)
            }

            return


        } else if (indice == padroes.length - 1 && tabelaAtual.filter((f)=>{
            return f == 0;
        }).length == 0) {
            resultado = "Deu Velha";
            window.alert(resultado)
            pontuarJogador(0)
        }
    })

}

function selecionarModo(modo) {
    document.getElementById("containerMenuInicial").style.display = "none";
    document.getElementById("containerJogo").style.display = "flex";

    modoDeJogo = modo;

    if (modo == 1) {
        document.getElementById("jogador2").disabled = true;
        document.getElementById("jogador2").value = "Máquina";
        jogador2.nome = "Máquina";
    }

}