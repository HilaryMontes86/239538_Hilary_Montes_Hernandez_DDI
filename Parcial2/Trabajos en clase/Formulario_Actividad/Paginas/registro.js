let Usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

class Usuario {
    constructor(nom, ape, correo, contra) {
        this.nombre = nom;
        this.apellido = ape;
        this.correo = correo;
        this.contraseña = contra;
    }
}

function crearFormulario() {
    const contenedor = document.querySelector("#contenedorRegistro");

    const htmlAgregar = `
        <form id="form">
            <h2>Registro</h2><br>

            <label>Nombre</label>
            <input type="text" name="nombre" required>

            <label>Apellido</label>
            <input type="text" name="apellido" required>

            <label>Correo</label>
            <input type="email" name="correo" required>

            <label>Contraseña</label>
            <input type="password" name="contraseña" required>

            <label>Confirmar contraseña</label>
            <input type="password" name="confirmar" required>

            <button type="submit">Registrarse</button><br>
            <button type="button" onclick="irAIniciarSesion()">Iniciar Sesión</button>
        </form>
    `;

    contenedor.innerHTML += htmlAgregar;

    document.querySelector("#form")
        .addEventListener("submit", registrarUsuario);
}

function registrarUsuario(event) {
    event.preventDefault();

    const formulario = event.target;
    const datosFormulario = new FormData(formulario);
    const datos = Object.fromEntries(datosFormulario.entries());

    if (datos.contraseña !== datos.confirmar) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Verificar correo existente
    for (let i = 0; i < Usuarios.length; i++) {
        if (Usuarios[i].correo === datos.correo) {
            alert("Este correo ya está registrado.");
            return;
        }
    }

    let usuarioNuevo = new Usuario(
        datos.nombre,
        datos.apellido,
        datos.correo,
        datos.contraseña
    );

    Usuarios.push(usuarioNuevo);

    // Guardar en localStorage
    localStorage.setItem("usuarios", JSON.stringify(Usuarios));

    alert("Registro exitoso");
}

function irAIniciarSesion() {
    window.location.href = "../index.html";
}

document.addEventListener("DOMContentLoaded", crearFormulario);