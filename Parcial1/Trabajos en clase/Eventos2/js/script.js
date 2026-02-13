let evento = document.querySelector('.evento1');
let evento2 = document.querySelector('.evento2');
let evento3 = document.querySelector('.evento3');
let evento4 = document.querySelector('.evento4');
let evento5 = document.querySelector('.evento5');

function cambiarColor() {
    if (evento.style.backgroundColor === 'lime') {
        evento.style.backgroundColor = 'olive';
    } else {
        evento.style.backgroundColor = 'lime';
    }
}

function presionarTecla() {
    if (evento2.style.backgroundColor === 'navy') { 
        evento2.style.backgroundColor = 'teal';
    } else {
        evento2.style.backgroundColor = 'navy';
    }
}

function cambiarColorHover() {
    evento3.style.backgroundColor = 'purple';
}
function volverColor() {
    evento3.style.backgroundColor = 'yellow';
}

function cambiarColorWheel() {
    let colorActual = getComputedStyle(evento4).backgroundColor;

    if (colorActual === 'rgb(255, 0, 0)') { 
        evento4.style.backgroundColor = 'green';
    } else {
        evento4.style.backgroundColor = 'red';
    }
}

function cambiarTamano() {

    if (evento5.style.transform === 'scale(1.5)') {
        evento5.style.transform = 'scale(1)';
    } else {
        evento5.style.transform = 'scale(1.5)';
    }

}

