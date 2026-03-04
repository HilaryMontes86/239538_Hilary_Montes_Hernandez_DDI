const formulario = document.querySelector("#form");
const mensaje = document.querySelector("#mensaje");

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

    if (datos.correo && datos.contraseña) {

        alert("Inicio de sesion correcta");

        formulario.style.display = "none";

        obtenerAPI();

    } else {
        alert("Por favor, complete todos los campos.");
    }
    
}

function irARegistro(){
    window.location.href = "Paginas/registrarse.html";
}

function obtenerAPI(){

    const url = "https://ghibliapi.vercel.app/films";

    fetch(url)
    .then(respuesta => {
        if (respuesta.ok)
            return respuesta.json();
    })
    .then(datos => {

        const contenedor = document.getElementById("contenedor");

        for (let i = 0; i < datos.length; i++) {

            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <h3>${datos[i].title}</h3>
                <img src="${datos[i].image}" width="200">
                <p><strong>Director:</strong> ${datos[i].director}</p>
                <p>${datos[i].description.substring(0,150)}...</p>
            `;

            contenedor.appendChild(card);
        }
    })
    .catch(error => {
        console.error(error.message);
    });
}