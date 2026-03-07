const formulario = document.querySelector("#form");
const mensaje = document.querySelector("#mensaje");

document.addEventListener("DOMContentLoaded", observador);

class Usuario {
    constructor(correo, contra) {
        this.correo = correo;
        this.contraseña = contra;
    }
}

function leerDatos(){
    const datoFormulario= new FormData(formulario);
    const datos = Object.fromEntries(datoFormulario.entries());

    let usuarioNuevo = new Usuario(datos.correo, datos.contraseña);
    console.log(usuarioNuevo);

    if(datos.correo && datos.contraseña){

        alert("Inicio de sesion correcta");
        localStorage.setItem("usuario", datos.correo);
        window.location.href = "Paginas/inicio.html";

    } else {
        alert("Por favor, complete todos los campos.");
    }
}

function irARegistro(){
    window.location.href = "Paginas/registrarse.html";
}

function observador(){
    const usuario = localStorage.getItem("usuario");

    if(usuario){
        console.log("Sesion activa: " + usuario);
        window.location.href = "Paginas/inicio.html";
    }
}
