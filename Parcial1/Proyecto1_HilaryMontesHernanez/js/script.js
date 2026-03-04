// Selecciona todas las peliculas
const peliculas = document.querySelectorAll(".peli");

// Estructura de control que recorre todas las peliculas para que al darle click se seleciione
peliculas.forEach(function(pelicula){

    pelicula.addEventListener("click", function(){

        // Si ya está activa, la desactivamos
        if(pelicula.classList.contains("activa")){
            
            pelicula.classList.remove("activa");

            peliculas.forEach(function(peli){
                peli.classList.remove("desactivada");
            });

        } else {

            // Quitamos estados anteriores
            peliculas.forEach(function(peli){
                peli.classList.remove("activa");
                peli.classList.add("desactivada");
            });

            // Activamos la seleccionada
            pelicula.classList.remove("desactivada");
            pelicula.classList.add("activa");
        }

    });

});