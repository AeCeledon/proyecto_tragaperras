window.onload=inicio;
var credito = Math.floor(Math.random()*5)+10;
var imagenes =  ["meme1.webp","meme2.webp","meme3.webp","meme4.webp","meme5.webp","meme6.webp"];
var premios= [1,2,2,3,3,6];
var numeros_actuales = [];
var audio;
var activos =false;

function inicio(){
    document.getElementById("tirar").onclick=lanzar_inicio;
    document.getElementById("cerrar").onclick=cerrar;
    audio = document.getElementById("sonido");

    for (let k=0; k<document.getElementsByClassName("boton").length; k++){
        document.getElementsByClassName("boton")[k].onclick = lanzar_uno;
    }
    actualizar();
}

function lanzar_inicio(){
    if (credito > 0){
        sonar("lanzar.mp3");
        numeros_actuales = [];
        for (let k=0; k<document.getElementsByClassName("boton").length; k++){
            numeros_actuales.push(escoger_numero());
            mostrar_imagen(k,numeros_actuales[k]);
        }
        comparar()
        activos = true;
    }
}

function lanzar_uno(){
    if (credito > 0 && activos == true){
        sonar("otra.mp3");
        let hijos = this.parentNode.parentNode.children;
        for (k=0; k<hijos.length; k++){
            if (this.parentNode == hijos[k]){
                numeros_actuales[k] = escoger_numero(numeros_actuales[k]);
                mostrar_imagen(k,numeros_actuales[k]);
                comparar();
                break;
            }
        }
    }
}

function escoger_numero(actual){
    do {
        var azar = Math.floor(Math.random()*imagenes.length);
    }while (azar == actual);
        return azar;
}

function mostrar_imagen(num,im){
    document.getElementsByClassName("imagen")[num].getElementsByTagName("img")[0].src ="images/"+imagenes[im];
}

function comparar(){
    if( numeros_actuales[0] == numeros_actuales[1] && numeros_actuales[1] == numeros_actuales[2]){
        //hay premio
        let p = premios[numeros_actuales[0]];
        let mensaje =  `Has ganado ${p} monedas<div>`;
        for (let k=0; k<p; k++){
            mensaje += `<img src="images/coin.webp">`;
        }
        mensaje += "</div>";
        mostrar_mensaje(mensaje);
        sonar("ganar.mp3");
        credito += p;
        activos = false;
    }
    credito --;
    actualizar();
}

function actualizar(){
    document.getElementById("dinero").innerHTML = credito;
    document.getElementById("monedas").innerHTML ="";
    for (let k=1; k<=credito; k++){
        document.getElementById("monedas").innerHTML +=`<img src="images/coin.webp">`;
    }
    if (credito <1){
        mostrar_mensaje("<b>GAME OVER</b><div class='subtitulo'>No te queda mas dinero</div>");
        sonar("sinCredito.mp3");
    }
}

function mostrar_mensaje(m){
    document.getElementById("velo").style.display="flex";
    document.getElementById("mensaje").innerHTML = m;
}

function cerrar(){
    document.getElementById("velo").style.display = "none";
    audio.pause();
}
function sonar(son){
    audio.src = "audio/" + son;
    audio.play();

}