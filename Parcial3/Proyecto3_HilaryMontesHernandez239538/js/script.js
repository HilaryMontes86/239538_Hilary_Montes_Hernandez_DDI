import { Cuadrado, Linea, Sticker, Circulo, Estrella, Trazo } from "./figuras.js";

const canvas = document.querySelector("#lienzo");
const ctx = canvas.getContext("2d");

//Guarda todos los emementos dibujados
const elementos = [];

// Guarda elementos eliminados para rehacer
const pilaRehacer = [];

//Herramientas
const opciones = {
    pincel: true,
    linea: false,
    circulo: false,
    cuadro: false,
    estrella: false,
    borrador: false,
    sticker: false,
}

//Posicion del cursor
const posicionesCursor = {
    iniciales: { x: 0, y: 0 },
    finales: { x: 0, y: 0 }
}

let presionado = false;

let colorLinea = "#000000";
let colorRelleno = "#000000";

let grosor = 5;

let modoRelleno = true;

//Imagen seleccionada para stickers
let imagenSticker = null;

// Guarda el último punto para que la línea sea continua
let ultimoPuntoLinea = null;

//Guarda los puntos del pincel
let puntosTrazo = [];

//Eventos del canva
canvas.addEventListener("mousedown",(event) => alPresionarClick(event)),
canvas.addEventListener("mousemove",(event) => mientrasPrecionaClick(event)),
canvas.addEventListener("mouseup",(event) => alSoltarClick(event));

//Eventos de las herramientas
document.querySelector("#pincel").addEventListener("click", () => cambiarOpcion("pincel"))
document.querySelector("#linea").addEventListener("click", () => cambiarOpcion("linea"))
document.querySelector("#cuadro").addEventListener("click", () => cambiarOpcion("cuadro"))
document.querySelector("#circulo").addEventListener("click", () => cambiarOpcion("circulo"))
document.querySelector("#estrella").addEventListener("click", () => cambiarOpcion("estrella"))
document.querySelector("#sticker").addEventListener("click", () => cambiarOpcion("sticker"))
document.querySelector("#borrador").addEventListener("click", () => cambiarOpcion("borrador"))

//Eventos de las acciones
document.querySelector("#deshacer").addEventListener("click", deshacer);
document.querySelector("#rehacer").addEventListener("click", rehacer);
document.querySelector("#guardar").addEventListener("click", guardarImagen);
document.querySelector("#limpiar").addEventListener("click", Limpiar);

// Eventos de los colores
document.querySelector("#colorLinea").addEventListener("input", (e) => {
    colorLinea = e.target.value;
});
document.querySelector("#colorRelleno").addEventListener("input", (e) => {
    colorRelleno = e.target.value;
});

//Eventos del grosor
document.querySelector("#grosor").addEventListener("input", (e) => {
    grosor = e.target.value;
});

//Eventos de modo
document.querySelector("#relleno").addEventListener("change", () => {
    modoRelleno = true;
});
document.querySelector("#contorno").addEventListener("change", () => {
    modoRelleno = false;
});


//Eventos de los filtros de color
document.querySelector("#bn").addEventListener("click", () => aplicarFiltro("bn"));
document.querySelector("#rojo").addEventListener("click", () => aplicarFiltro("rojo"));
document.querySelector("#verde").addEventListener("click", () => aplicarFiltro("verde"));
document.querySelector("#azul").addEventListener("click", () => aplicarFiltro("azul"));
document.querySelector("#sepia").addEventListener("click", () => aplicarFiltro("sepia"));
document.querySelector("#negativo").addEventListener("click", () => aplicarFiltro("negativo"));

//Evento de sticker
document.querySelector("#inputImagen").addEventListener("change", cargarSticker);

//Funcion para cambiar de herramienta
function cambiarOpcion(opcion){
    //Desactivs todas las herramientas
    for(let clave in opciones){
        opciones[clave] = false;
    }

    //Activa la herramienta seleccionada
    opciones[opcion] = true;

    
    document.querySelectorAll(".grupo button").forEach(btn => {
        btn.classList.remove("activo");
    });

    document.querySelector("#" + opcion).classList.add("activo");
    
    //Reinicia la linea continua
    if(opcion !== "linea"){
        ultimoPuntoLinea = null;
    }
}

function alPresionarClick(event) {
    console.log("se presino el boton click en el lienzo");
    posicionesCursor.iniciales.x = event.offsetX;
    posicionesCursor.iniciales.y = event.offsetY;
    presionado = true;

    //Herramienta Linea
    if(!opciones.linea){
    
    //Primer punto de la linea
    ultimoPuntoLinea = null;
    }
    if(opciones.linea === true){

    if(ultimoPuntoLinea == null){
        ultimoPuntoLinea = {
            x: event.offsetX,
            y: event.offsetY
        };
        return;
    }

    //Crea una linea nueva conestada a la anterior
    const nuevasPosiciones = {
        iniciales: {
            x: ultimoPuntoLinea.x,
            y: ultimoPuntoLinea.y
        },
        finales: {
            x: event.offsetX,
            y: event.offsetY
        }
    };
    const nuevaLinea = new Linea(nuevasPosiciones, colorLinea, grosor);
    elementos.push(nuevaLinea);

    ultimoPuntoLinea = {
        x: event.offsetX,
        y: event.offsetY
    };
    RenderizarElementos();
    return;
}

    //Herramienta Pincel
    if (opciones.pincel){
        puntosTrazo = [];

        puntosTrazo.push({
            x: event.offsetX,
            y: event.offsetY
        });
    }

    //Herramienta Sticker
    if(opciones.sticker && imagenSticker){
        const posicionesSticker = {
            iniciales: {
                x: event.offsetX,
                y: event.offsetY
            }
        };

        const nuevoSticker = new Sticker(posicionesSticker, imagenSticker);

    elementos.push(nuevoSticker);
    RenderizarElementos();
    return;
    }
}

function mientrasPrecionaClick(event) {
    console.log("Mientras el cursor esta sobre el lienzo");
    posicionesCursor.finales.x = event.offsetX;
    posicionesCursor.finales.y = event.offsetY;

    //Herramienta Pincel
    if(presionado && opciones.pincel){
        puntosTrazo.push({
        x: event.offsetX,
        y: event.offsetY
    });
    RenderizarElementos();

    const trazoTemporal = new Trazo(puntosTrazo, colorLinea, grosor);
    trazoTemporal.Dibujar(ctx);
    return;
    }

    // Herramienta Borrador
    if (presionado && opciones.borrador) {
    ctx.clearRect(
        event.offsetX - grosor/2,
        event.offsetY - grosor/2,
        grosor, grosor
    );
    return;
    }

    //Previsualizacion del Sticker
    if(opciones.sticker && imagenSticker && !presionado){
    RenderizarElementos();

    ctx.globalAlpha = 0.5;
    ctx.drawImage(
        imagenSticker,
        event.offsetX - 50,
        event.offsetY - 50,
        100,
        100
    );
    ctx.globalAlpha = 1;
}

    //Si Sticker no esta seleccionado
    if (!presionado) return; 
        let elemento;

        //opcion para dibujar un cuadro
        if (opciones.cuadro){
            elemento = new Cuadrado(posicionesCursor, colorLinea, colorRelleno, grosor, modoRelleno);
        }
         //opcion para dibujar un circulo
        else if (opciones.circulo) {
            elemento = new Circulo(posicionesCursor, colorLinea, colorRelleno, grosor, modoRelleno);
        }
         //opcion para dibujar una estrella
        else if (opciones.estrella) {
            elemento = new Estrella(posicionesCursor, colorLinea, colorRelleno, grosor, modoRelleno);
        }
        
        //Prevializacion de la figura
        RenderizarElementos();
        if (elemento){
        elemento.Dibujar(ctx);
        }
    }

function alSoltarClick(event) {
    posicionesCursor.finales.x = event.offsetX;
    posicionesCursor.finales.y = event.offsetY;

    //Guarda el trazo del pincel
    if(opciones.pincel){
    const nuevoTrazo = new Trazo(puntosTrazo, colorLinea,grosor);

    elementos.push(nuevoTrazo);
    pilaRehacer.length = 0;
    presionado = false;
    return;
}

    if (opciones.pincel || opciones.borrador) {
        presionado = false;
        return;
    }
    let elemento = null;

        //Aqui se cran las figuras
        if (opciones.cuadro){
            //opcion para dibujar un cudro
            elemento = new Cuadrado(posicionesCursor, colorLinea, colorRelleno, grosor, modoRelleno);
        }
        else if (opciones.circulo) {
            //opcion para dibujar un circulo
            elemento = new Circulo(posicionesCursor, colorLinea, colorRelleno, grosor, modoRelleno);
        }
        else if (opciones.estrella) { 
            elemento = new Estrella(posicionesCursor, colorLinea, colorRelleno, grosor, modoRelleno);
        }

        //Guarda el elemento
        if (elemento){
            elementos.push(elemento);
            pilaRehacer.length = 0;
        }

    console.log(elementos);

    RenderizarElementos();
    presionado = false;
}

function RenderizarElementos(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < elementos.length; i++){
        elementos[i].Dibujar(ctx);
    }
}

function deshacer(){
    if(elementos.length > 0){
        const ultimo = elementos.pop();
        pilaRehacer.push(ultimo);
        RenderizarElementos();
    }
}

function rehacer(){
    if(pilaRehacer.length > 0){
        const ultimo = pilaRehacer.pop();

        //Para la limpieza completa del canvas
        if(Array.isArray(ultimo)){
            elementos.push(...ultimo);
        }else{
            //Para eliminar solo el ultimo elemento
            elementos.push(ultimo);
        }
        RenderizarElementos();
    }
}

function Limpiar(){
    if(elementos.length > 0){
        //Guarda una copia de todo en el canvas para que rehacer la pueda usar
        pilaRehacer.push([...elementos]);
        elementos.length = 0;
        RenderizarElementos();
    }
}

function aplicarFiltro(tipo) {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    for(let i = 0; i < data.length; i += 4){
        let rojo = data[i] // rojo
        let verde = data[i + 1] //verde
        let azul = data[i + 2] //azul
        let alfa = data[i + 3] //transparencia

        //ROJO
        if(tipo === "rojo"){
        data[i] = rojo + 50;
        data[i + 1] = verde * .8;
        data[i + 2] = azul * .8;
        }

         // BLANCO Y NEGRO
        else if(tipo === "bn"){
            let gris = (rojo + verde + azul) / 3;
            data[i] = gris;
            data[i + 1] = gris;
            data[i + 2] = gris;
        }
         //VERDE
        else if(tipo === "verde"){
            data[i] = rojo * 0.5;
            data[i + 1] = verde + 50;
            data[i + 2] = azul * 0.5;
        }

        //AZUL
        else if(tipo === "azul"){
            data[i] = rojo * 0.5;
            data[i + 1] = verde * 0.5;
            data[i + 2] = azul + 50;
        }

        //SEPIA
        else if(tipo === "sepia"){
            data[i]     = 0.393 * rojo + 0.769 * verde + 0.189 * azul;
            data[i + 1] = 0.349 * rojo + 0.686 * verde + 0.168 * azul;
            data[i + 2] = 0.272 * rojo + 0.534 * verde + 0.131 * azul;
        }

        //NEGATIVO
        else if(tipo === "negativo"){
            data[i] = 255 - rojo;
            data[i + 1] = 255 - verde;
            data[i + 2] = 255 - azul;
        }

        //Mantener la transparecia
        data[i + 3] = alfa;
    }
    ctx.putImageData(imgData, 0, 0);
    }
    
function cargarSticker(event){
    const archivo = event.target.files[0];

    if(!archivo) return;

    const lector = new FileReader();
    lector.onload = function(e){

        imagenSticker = new Image();
        imagenSticker.src = e.target.result;
    }
    lector.readAsDataURL(archivo);
}

function guardarImagen(){
    const enlace = document.createElement("a");
    enlace.download = "dibujo.png";
    enlace.href = canvas.toDataURL();
    enlace.click();
}