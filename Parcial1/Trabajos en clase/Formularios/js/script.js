const nombre = document.querySelector("#input_txt_nombre");
const apellido = document.querySelector("#input_txt_apellido");
const boton = document.querySelector("#boton_guardar");


boton_guardar.addEventListener("click",(e)=>{
    e.preventDefault();
    console.log(e.target.value);

    //Crea un nuevo objeto usuario
    const usuario = new Usuario(nombre.value, apellido.value);
    console.log(usuario);
    //metodo del objeto que se encarga de crear elementos
    const nombre_info = document.createElement("h2");
    nombre_info.textContent = usuario.nombre;
    document.body.appendChild(nombre_info);
})
 
class Usuario{
    constructor(nom, ape){
        this.nombre = nom;
        this.apellido = ape;
    }
}