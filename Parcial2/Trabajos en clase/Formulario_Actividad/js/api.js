document.addEventListener("DOMContentLoaded", inicioPagina);

function inicioPagina(){
    const usuario = localStorage.getItem("usuario");

    if(!usuario){
        window.location.href = "../index.html";
        return;
    }
    obtenerAPI();
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

        const boton = document.createElement("button");
        boton.textContent = "Cerrar sesión";
        boton.onclick = cerrarSesion;

        contenedor.appendChild(boton);

    })
    .catch(error => {
        console.error(error.message);
    });
}

function cerrarSesion(){
    localStorage.removeItem("usuario");
    alert("Sesión cerrada");
    window.location.href = "../index.html";
}
