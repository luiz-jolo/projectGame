var dirYJ, dirXJ, jog, velJ, pJX, pJY;
var tamanhoW, tamanhoH;
var jogo;
var frames;
var velT;

function teclaDown() {
    var tecla=event.keyCode;
    if (tecla == 38){//cima
        dirYJ = -1;
    }else if (tecla == 40){//baixo
        dirYJ = +1;
    }
    if (tecla == 37){//esquerda
        dirXJ = -1;
    }else if (tecla == 39){//direita
        dirXJ = +1;
    }
    if (tecla == 32){//TIRO
        //chamando a fnução e informando a posição do jogador
        //no caso soma os 17 para ficar no centro, pois ele pega a posição como topo e esquerda
        atira(pJX+31, pJY);
    }
}
function teclaUp() {
    var tecla=event.keyCode;
    if ((tecla == 38) || (tecla==40)){//cima
        dirYJ = 0;
    }
    if ((tecla == 37) || (tecla==39)){//cima
        dirXJ = 0;
    }
}
function atira(x,y){
    //o tiro é a partir da posiçao da naveJog
    var t=document.createElement("div");
    //criação dos atributos
    var att1=document.createAttribute("class");
    var att2=document.createAttribute("style");
    //para formatar o atributo - gerar o modelo
    att1.value="tiroJog";
    att2.value="top:"+y+"px;left:"+x+"px";
    //setando os atributos
    t.setAttributeNode(att1);
    t.setAttributeNode(att2);
    //adicionando o elemento na tela
    document.body.appendChild(t);
}
function controleTiros() {
    //receber os tiros criado
    var tiros=document.getElementsByClassName("tiroJog");
    var tam=tiros.length;
    for(var i=0; i < tam; i++){
        //se existe tiro
        if(tiros[i]){
            var pt=tiros[i].offsetTop;
            pt-=velT;
            tiros[i].style.top=pt+"px";
            if (pt<0){
                document.body.removeChild(tiros[i]);
                //tiros[i].remove();
            }
        }
    }
}

function controlaJogador() {
    // a direção y do jogador
    pJY+=dirYJ*velJ;
    pJX+=dirXJ*velJ;
    //retorna a posição de um elemento especificado
    jog.style.top=pJY+"px";
    jog.style.left=pJX+"px";
}

function gameLoop(){
    if (jogo){
        //funções de controle
        controlaJogador();
        controleTiros();
    }
    //estrutura de frames do jogo
    frames = requestAnimationFrame(gameLoop);
}
function inicia(){
    jogo = true;
    //inicialização de tela a partir do tamanho da tela
    tamanhoH=window.innerHeight;
    tamanhoW=window.innerWidth;

    //inicializações
    dirXJ=dirYJ=0;
    //posicionar jogador no meio da tela
    pJY=tamanhoH/2;
    pJX=tamanhoW/2;
    velJ=5;
    velT=5;
    jog=document.getElementById("naveJog");
    jog.style.top=pJY+"px";
    jog.style.left=pJX+"px";

    gameLoop();
}

window.addEventListener("load", inicia);
document.addEventListener("keydown", teclaDown);
document.addEventListener("keyup", teclaUp);

