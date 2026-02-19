const imagenes = document.querySelectorAll(".escena img");

window.addEventListener("scroll", () => {

    const scrollY = window.scrollY;

    imagenes.forEach((imagen, parImpar) => {

        // se le asigna una dirección para un efecto más dinámico en el parallax
        let direccion;

        if(parImpar % 2 === 0){
            direccion = 1;
        } else {
            direccion = -1;
        }

        const velocidad = 0.03; //define la velocidad del efecto parallax en las imagenes al usar el scroll

        imagen.style.transform =
            `translateY(${scrollY * velocidad * direccion}px) scale(1.1)`;
    });

});