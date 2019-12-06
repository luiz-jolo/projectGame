var dirYJ, dirXJ, jog, velJ, pJX, pJY;
var tamanhoW, tamanhoH, jogo, frames;
var velT;
var contBombas, painelContBombas,velB,tmpCriaBomba;
var bombasTotal;
var vidaPlaneta, barraPlaneta;
var ie, isom; //indice som e indice explosao
var telaMsg;

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
function criaBomba() {
    if(jogo){
        //definindo posição da bomba (deixar posição Y sempre a mesma e varia o X
        var y=0;
        //sortear entre 0 e o tamanho da largura da tela
        var x=Math.random()*tamanhoW;
        //criando o elemento
        var bomba=document.createElement("div");
        //definindo o elemento
        var att1=document.createAttribute("class");
        var att2=document.createAttribute("style");
        att1.value="bomba";
        //alterando o CSS inicial da bomba concatenando a posição top com o y e concatenando com a medida e o left vai ser o X
        att2.value="top:"+y+"px; left:"+x+"px;";
        bomba.setAttributeNode(att1);
        bomba.setAttributeNode(att2);
        //adicionando o elemento na tela (inicialmente adicionando no body)
        document.body.appendChild(bomba);
        // a cada bomba criada, subtrai do limite estipulado
        contBombas--;
    }
}
function controlaBomba() {
    //recebe todos elementos que possui a classe bomba
    bombasTotal=document.getElementsByClassName("bomba");
    var tam=bombasTotal.length;//quantas bombas tem na tela
    for (var i= 0; i < tam; i++){
        if(bombasTotal[i]){
            var pi=bombasTotal[i].offsetTop;  //pi é posição do indice, obtendo a posição
            pi+=velB;
            bombasTotal[i].style.top=pi+"px";
            //verificar se chegou no final
            if(pi>tamanhoH){
                vidaPlaneta-=10;
                criaExplosao(2,bombasTotal[i].offsetLeft,null);
                bombasTotal[i].remove();
            }
        }
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
    //alterando o CSS
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
            colisaoTiroBomba(tiros[i]);
            if (pt<0){
                document.body.removeChild(tiros[i]);
                //tiros[i].remove();
            }
        }
    }
}
function colisaoTiroBomba(tiro){
    var tam=bombasTotal.length;
    for(var i=0;i<tam;i++){
        if(bombasTotal[i]){
            //exemplo de calculo, o X e Y do tiro tem que estar no rumo da bomba
            if (
                (
                    (tiro.offsetTop<=(bombasTotal[i].offsetTop+28))&&
                    ((tiro.offsetTop+6)>=(bombasTotal[i].offsetTop))
                )
                &&
                (
                    (tiro.offsetLeft<=(bombasTotal[i].offsetLeft+28))&&
                    ((tiro.offsetLeft)>=(bombasTotal[i].offsetLeft))
                )
            )
            {
                criaExplosao(1,bombasTotal[i].offsetLeft-28,bombasTotal[i].offsetTop);
                bombasTotal[i].remove();
                tiro.remove();
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
function criaExplosao(tipo,x,y) {//TIPO = 1 AR, TIPO 2 = TERRA
    //para remover o gif da exposao so depois dele acabar
    if (document.getElementById("explosao"+(ie-1))){
        document.getElementById("explosao"+(ie-1)).remove();
    }

    var explosao=document.createElement("div");
    var img=document.createElement("img");
    var som=document.createElement("audio");
    // atributos para div
    var att1=document.createAttribute("class");
    var att2=document.createAttribute("style");
    var att3=document.createAttribute("id");
    // atributos para imagem
    var att4=document.createAttribute("src");
    // atributos para audio
    var att5=document.createAttribute("src");
    var att6=document.createAttribute("id");
    //definindo o tipo da explosão de acordo com chao ou ar

    att3.value="explosao"+ie;
    if (tipo==1){
        att1.value="explosaoAr";
        att2.value="top:"+y+"px;left:"+x+"px;";
        att4.value="explosao6060_2.gif?"+new Date(); //essa interrogação e o novo valor para poder falar que é uma imagem diferente
    }else{
        att1.value="explosaoChao";
        att2.value="top:"+(tamanhoH-30)+"px;left:"+(x-30)+"px;"; //qd bate no chao, desconta o tamanho da bomba
        att4.value="explosao6060_chao.gif?"+new Date();
    }
    att5.value="somExplosao.mp3?"+new Date();
    att6.value="som"+isom;
    //atributos definidos agora adicionar aos elementos
    explosao.setAttributeNode(att1);
    explosao.setAttributeNode(att2);
    explosao.setAttributeNode(att3);
    img.setAttributeNode(att4);
    som.setAttributeNode(att5);
    som.setAttributeNode(att6);
    explosao.appendChild(img);
    explosao.appendChild(som);
    document.body.appendChild(explosao);
    //play no som
    document.getElementById("som"+isom).play();
    ie++;
    isom++;
}
function gerenciaGame() {
    // ele verifica qd diminui a vida, ele altera o tamanho da barra
    barraPlaneta.style.width=vidaPlaneta+"px";
    //qd as bombas chegar na quantidade final e o jogador estiver jogando ele ganhou
    if (contBombas<=0){
        jogo-false;
        clearInterval(tmpCriaBomba);
        telaMsg.style.backgroundImage="url('ImagemVitoria.png')";
        telaMsg.style.display="block";
    }
    if (vidaPlaneta<=0){
        jogo-false;
        clearInterval(tmpCriaBomba);
        telaMsg.style.backgroundImage="url('ImagemDerrota.png')";
        telaMsg.style.display="block";
    }
}

function gameLoop(){
    if (jogo){
        //funções de controle
        controlaJogador();
        controleTiros();
        controlaBomba();
    }
    gerenciaGame();
    //estrutura de frames do jogo
    frames = requestAnimationFrame(gameLoop);
}
function reinicia() {
    bombasTotal=document.getElementsByClassName("bomba");
    var tam=bombasTotal.length;
    for(var i=0; i<tam;i++){
        if(bombasTotal[i]){
            bombasTotal[i].remove();
        }
    }
    telaMsg.style.display="none";
    clearInterval(tmpCriaBomba);
    cancelAnimationFrame(frames);
    vidaPlaneta=260;
    pJX=tamanhoW/2;
    pJY=tamanhoH/2;
    jog.style.top=pJY+"px";
    jog.style.left=pJX+"px";
    contBombas=150;
    jogo=true;
    tmpCriaBomba=setInterval(criaBomba, 1700);
    gameLoop();
}

function inicia(){
    jogo = false;
    //inicialização de tela a partir do tamanho da tela
    tamanhoH=window.innerHeight;
    tamanhoW=window.innerWidth;

    //inicializações
    dirXJ=dirYJ=0;
    //posicionar jogador no meio da tela
    pJY=tamanhoH/2;
    pJX=tamanhoW/2;
    velJ=7;
    velT=5;
    velB=3;
    jog=document.getElementById("naveJog");
    jog.style.top=pJY+"px";
    jog.style.left=pJX+"px";
    //controles das bombas

    contBombas=150;


    vidaPlaneta=260;
    barraPlaneta=document.getElementById("barraPlaneta");
    barraPlaneta.style.width=vidaPlaneta+"px";
    //inicializando indices som e expl
    ie=isom=0;
    //telas
    telaMsg=document.getElementById("telaMsg");
    telaMsg.style.backgroundImage="url('ImagemInicial.png')";
    telaMsg.style.display="block";
    document.getElementById("btnJogar").addEventListener("click", reinicia);
}

window.addEventListener("load", inicia);
document.addEventListener("keydown", teclaDown);
document.addEventListener("keyup", teclaUp);

