let contenido = document.querySelector("#contenedor_contenido");
const boton = document.querySelector("#boton");
let bandera = false;


contenido.style.width = "1000px";

function cambiarColor(color) {
    contenido.style.background = color;
}

function cambiarTamanio(ancho, alto){
    contenido.style.width = ancho;
    contenido.style.height = alto;
}
function cambiarTamanioIntervalo(ancho, alto){
    console.log("cambiar tamaño");
    contenido.style.width = "400px";
    contenido.style.height = "400px";
}

function cambiarTamanioIntervalo2(ancho, alto){
    console.log("cambiar tamaño");
    contenido.style.width = "600px";
    contenido.style.height = "600px";
}

boton.addEventListener("click", ()=> {
    if(bandera){
        cambiarColor("white");
        cambiarTamanio("1000px", "1000px");
        bandera = false;
    }else{
        cambiarColor("blue");
          cambiarTamanio("500px", "500px");
        bandera = true;
    }
   
});

setInterval(cambiarTamanioIntervalo, 1000);
setInterval(cambiarTamanioIntervalo2, 2000);


