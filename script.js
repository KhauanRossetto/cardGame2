let qntCartas = 0;
let contador = 0;
let contar = 0;

const imagens = [
    "bobrossparrot.gif",
    "explodyparrot.gif",
    "fiestaparrot.gif",
    "metalparrot.gif",
    "revertitparrot.gif",
    "tripletsparrot.gif",
    "unicornparrot.gif",
];

let imagensEmbaralhadas = [];
let imagensEmbaralhadasDuplas = [];

function entradaNumeros() {
    imagensEmbaralhadas = []; 
    qntCartas = Number(prompt("Escolha um número entre 4 e 14"));
    verificarEntradas();
}

function verificarEntradas() {
    let Impar = qntCartas % 2;
    if (Impar == 1 || qntCartas < 4 || qntCartas > 14){
        alert("O número precisa ser par e estar entre os números 4 e 14");
        entradaNumeros();
    } else {
        criarCartas();
    }
}

function embaralharCartas(){
    imagens.sort(function(){
        return 0.5 - Math.random();
    });
    for (let i = 0; i < qntCartas / 2; i++){
        imagensEmbaralhadas.push(imagens[i]);
    }
}

function criarCartas(){
    const cartas = document.querySelector(".container");
    let contadorImagem = 0;
    cartas.innerHTML = "";

    embaralharCartas();

    imagensEmbaralhadasDuplas = [
        ...imagensEmbaralhadas,
        ...imagensEmbaralhadas,
    ].sort(function (){
        return 0.5 - Math.random();
    });

    for (let i = 0; i < qntCartas; i++){
        contadorImagem = imagensEmbaralhadasDuplas[i];
        cartas.innerHTML += `
            <div class="cartas" onclick="flip(this)" data-parrot="${contadorImagem}">
                <div class="face frente" style="background-image: url('imagens/${contadorImagem}')"></div>
                <div class="face costas"></div>
            </div>`;
    }
}

let carta1 = "";
let carta2 = "";
let primeiro = "";
let segundo = "";

function flip(item) {
    if (carta1 === ""){
        carta1 = item;
        item.classList.add("flip");
        primeiro = item.getAttribute("data-parrot");
    } else if (carta2 === ""){
        carta2 = item;
        item.classList.add("flip");
        segundo = item.getAttribute("data-parrot");
        setTimeout(verificarSeSaoIguais, 1000);
    }
    contador++;
    setTimeout(finalizarJogo, 500);
}

function verificarSeSaoIguais(){
    if (primeiro == segundo){
        carta1 = "";
        carta2 = "";
    } else {
        carta1.classList.remove("flip");
        carta2.classList.remove("flip");
        carta1 = "";
        carta2 = "";
    }
}

function finalizarJogo(){
    const flippedCards = document.querySelectorAll(".flip");
    const nmrCartas = document.querySelectorAll(".cartas");
    if (flippedCards.length === nmrCartas.length){
        alert(
            `Parabéns!, você venceu o jogo em ${contador} tentativas e no tempo de ${contar} segundos`
        );
        contar = 0;
    }
}

function timerContar(){
    let segundos = document.querySelector(".timer");
    segundos.innerHTML = `${contar++}`;
}

entradaNumeros();
setInterval(timerContar, 1000);
4