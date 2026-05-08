class Figura{
    constructor(posicionesCursor, color_linea, color_relleno, grozor_linea, modoRelleno = true
    ){
        //Posiciones iniciales y finales del mouse
        this.posicionesCursor = posicionesCursor || {
        iniciales: {x:0, y:0},
        finales: {x:0, y:0}
        }
        //Colores y estilos
        this.color_linea = color_linea,
        this.color_relleno = color_relleno,

        //Grosor de la linea
        this.grozor_linea = grozor_linea,


        this.modoRelleno = modoRelleno  
    }
}

export class Cuadrado extends Figura {
    constructor(posicionesCursor = {},
        color_linea = "black",
        color_relleno = "black",
        grozor_linea = 5,
        modoRelleno = true
    ) {

        super(posicionesCursor, color_linea, color_relleno, grozor_linea, modoRelleno);

        //Coordenadas iniciales de X y Y
        this.x = Math.min(this.posicionesCursor.iniciales.x, this.posicionesCursor.finales.x)
        this.y = Math.min(this.posicionesCursor.iniciales.y, this.posicionesCursor.finales.y);

        //Ancho y alto del cuadrado
        this.alto = Math.abs(this.posicionesCursor.finales.y - this.posicionesCursor.iniciales.y)
        this.ancho = Math.abs(this.posicionesCursor.finales.x - this.posicionesCursor.iniciales.x);
    }
        //Dibuja el cuadrado
        Dibujar(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color_relleno
        ctx.strokeStyle = this.color_linea
        ctx.lineWidth = this.grozor_linea

        //Dibuja el contorno
        if(this.modoRelleno){
        ctx.fillRect(this.x, this.y, this.ancho, this.alto);
        }else{
        ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
        }
    }
}

export class Circulo extends Figura {
    constructor(posicionesCursor = {},
        color_linea = "black",
        color_relleno = "black",
        grozor_linea = 5,
        modoRelleno = true
    ) {

        super(posicionesCursor, color_linea, color_relleno, grozor_linea, modoRelleno);

        // Centro del circulo y punto inicial
        this.cx = this.posicionesCursor.iniciales.x;
        this.cy = this.posicionesCursor.iniciales.y;

        // Distancia entre inicio y fin
        const dx = this.posicionesCursor.finales.x - this.posicionesCursor.iniciales.x;
        const dy = this.posicionesCursor.finales.y - this.posicionesCursor.iniciales.y;

        //Calculo des radio
        this.radio = Math.sqrt(dx * dx + dy * dy);
    }

    //Dibuja el circulo
    Dibujar(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color_relleno;
        ctx.strokeStyle = this.color_linea;
        ctx.lineWidth = this.grozor_linea;

        ctx.arc(this.cx, this.cy, this.radio, 0, Math.PI * 2);
        
        //Dibuja el relleno
        if(this.modoRelleno){
            ctx.fill();

        //Dibuja el contorno
        }else{
        ctx.stroke();
        }
    }
}

export class Linea {
    constructor(posicionesCursor = {}, color_linea = "black", grozor_linea = 5) {
        //Posiciones de inicio y fin
        this.posicionesCursor = posicionesCursor || {
            iniciales: { x: 0, y: 0 },
            finales: { x: 0, y: 0 }
        }
        //Color de la linea
        this.color_linea = color_linea
        //grosor de la linea
        this.grozor_linea = grozor_linea
    }
    //Dibuja la linea
    Dibujar(ctx) {
        ctx.beginPath()
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.strokeStyle = this.color_linea
        ctx.lineWidth = this.grozor_linea

        //Punto inicial
        ctx.moveTo(this.posicionesCursor.iniciales.x, this.posicionesCursor.iniciales.y)
        //Punto final
        ctx.lineTo(this.posicionesCursor.finales.x, this.posicionesCursor.finales.y)
        ctx.stroke()
    }
}

export class Sticker {
    constructor(posicionesCursor, imagen){
        //Posicion del sticker
        this.posicionesCursor = posicionesCursor || {
            iniciales: { x: 0, y: 0 },
            finales: { x: 0, y: 0 }
        };
        //Imagen seleccionada
        this.imagen = imagen;
    }
    //Dibuja el sticker
    Dibujar(ctx){

        //Verifica que una imagen este seleccionada
        if(!this.imagen || !this.imagen.complete) return;

        //Dibuja la imagen centrada
        ctx.drawImage(
            this.imagen,
            this.posicionesCursor.iniciales.x -50,
            this.posicionesCursor.iniciales.y -50,
            100,
            100
        );
    }
}

export class Estrella extends Figura{
    constructor(
        posicionesCursor = {}, color_linea = "black", color_relleno = "yellow", grozor_linea = 5,  modoRelleno = true){
        super(posicionesCursor, color_linea, color_relleno, grozor_linea, modoRelleno);
        
        //Centro de la estrella
        this.cx = posicionesCursor.iniciales.x;
        this.cy = posicionesCursor.iniciales.y;

        //Distancia entre el punto inicial y final
        const dx = posicionesCursor.finales.x - posicionesCursor.iniciales.x;
        const dy = posicionesCursor.finales.y - posicionesCursor.iniciales.y;

        //Radio exterior
        this.radio = Math.sqrt(dx * dx + dy * dy);
    }
    //Dibuja la estrella
    Dibujar(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.color_relleno;
        ctx.strokeStyle = this.color_linea;
        ctx.lineWidth = this.grozor_linea;

        const puntas = 5;

        //Radios
        const radioExterior = this.radio;
        const radioInterior = this.radio / 2;

        //Rotacion inicial
        let rotacion = Math.PI / 2 * 3;
        let x = this.cx;
        let y = this.cy;

        //Punto inicial
        ctx.moveTo(this.cx, this.cy - radioExterior);

        //Crea las puntas
        for(let i = 0; i < puntas; i++){
            //Punto exterior
            x = this.cx + Math.cos(rotacion) * radioExterior;
            y = this.cy + Math.sin(rotacion) * radioExterior;

            ctx.lineTo(x, y);
            rotacion += Math.PI / puntas;

            //Punto interior
            x = this.cx + Math.cos(rotacion) * radioInterior;
            y = this.cy + Math.sin(rotacion) * radioInterior;

            ctx.lineTo(x, y);
            rotacion += Math.PI / puntas;
        }

        ctx.closePath();

        //Dibuja el relleno
        if(this.modoRelleno){
            ctx.fill();

        //Dibuja el contorno
        }else{
            ctx.stroke();
        }
    }
}

export class Trazo{
    constructor(puntos = [], color = "black", grosor = 5){
        //Puntos recorridos por el mouse
        this.puntos = puntos;
        //Color del trazo
        this.color = color;
        //Grosor del trazo
        this.grosor = grosor;
    }
    //Dibuja el trazo
    Dibujar(ctx){
        //Por si no hay suficientes puntos
        if(this.puntos.length < 2) return;

        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.grosor;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        //Punto inicial
        ctx.moveTo(this.puntos[0].x, this.puntos[0].y);

        //Recorre todos los puntos
        for(let i = 1; i < this.puntos.length; i++){
            ctx.lineTo(this.puntos[i].x, this.puntos[i].y);
        }
        ctx.stroke();
    }
}