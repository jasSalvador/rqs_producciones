//animaciones pagina
function isVisible(elm) {
    let rect = elm.getBoundingClientRect(); //método js para obtener tamaño y posición de un elemento en el DOM en relación con la ventana del navegador
    let viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

//cuando se carga la página...
window.addEventListener('DOMContentLoaded', () => {
    // y a todos los elementos con la clase paused...
    document.querySelectorAll(".paused").forEach(elm => {
        if (isVisible(elm)) {
            // Si son visibles inicialmente, quita la clase paused para que las animaciones se reproduzcan
            elm.classList.remove("paused");
        }
    });

    //asignamos un evento scroll...
    window.addEventListener('scroll', () => {
        document.querySelectorAll(".paused").forEach(elm => {
            if (isVisible(elm)) {
                // Si se vuelven a ver, quita la clase paused nuevamente para repetir las animaciones
                elm.classList.remove("paused");
            }
        });
    });
});




//FORMULARIO
document.addEventListener('DOMContentLoaded', function () {
    const btnCotizar = document.querySelector('#btnCotizar');
    const modalForm = document.querySelector('#modalForm');
    const form = document.getElementById('formCotizacion');

    btnCotizar.addEventListener('click', (e) => {
        e.preventDefault();
        //console.log("Botón clickeado");
        modalForm.classList.add("active");
    });

    form.addEventListener('submit', handleSubmit);


    async function handleSubmit(event) {
        //console.log('Evento de envío del formulario capturado');
        event.preventDefault();
        //console.log('Formulario enviado');

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const email = document.getElementById('email').value;
        const comuna = document.getElementById('comuna').value;
        const fecha = document.getElementById('fecha').value;
        const asistentes = document.getElementById('asistentes').value;
        const inicio = document.getElementById('inicio').value;
        const termino = document.getElementById('termino').value;
        const pack = document.getElementById('pack').value;
        const mensaje = document.getElementById('mensaje').value;

        const formData = {
            nombre,
            apellido,
            email,
            comuna,
            fecha,
            asistentes,
            inicio,
            termino,
            pack,
            mensaje
        };

        try {
            const response = await fetch('https://www.rqsproducciones.cl/send-email.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            //console.log(result);

            if (result.status === 'success') {
                alert('Mensaje enviado con éxito.');
            } else {
                alert('Hubo un error al enviar el mensaje.');
            }
        } catch (error) {
            //console.error('Error general:', error);
            alert('Error al enviar el formulario. Por favor, inténtalo más tarde.');
        }
    }
});




//carrusel
const carrusel = document.querySelector(".carrusel-imagenes");
let maxScrollLeft = carrusel.scrollWidth - carrusel.clientWidth;
let intervalo = null;
let step = 1.5;

const start = () => {
    intervalo = setInterval(function () {
        carrusel.scrollLeft += step;

        if (carrusel.scrollLeft >= maxScrollLeft) {
            carrusel.scrollLeft = 0;
        }
    }, 10);
};

const stop = () => {
    clearInterval(intervalo);
};

const prevButton = document.querySelector(".carrusel-prev");
const nextButton = document.querySelector(".carrusel-next");

prevButton.addEventListener("click", () => {
    stop();
    carrusel.scrollLeft -= 100;
});

nextButton.addEventListener("click", () => {
    stop();
    carrusel.scrollLeft += 100;
});

carrusel.addEventListener("mouseover", () => {
    stop();
});

carrusel.addEventListener("mouseout", () => {
    start();
});

document.querySelectorAll("a").forEach((enlace) => {
    enlace.addEventListener("click", () => {
        stop();
    });
});

start();




//PRUEBA TOUCH
/* const carrusel = document.querySelector(".carrusel-imagenes");
let maxScrollLeft = carrusel.scrollWidth - carrusel.clientWidth;
let intervalo = null;
let step = 1.5;

const start = () => {
    intervalo = setInterval(function () {
        carrusel.scrollLeft += step;

        if (carrusel.scrollLeft >= maxScrollLeft) {
            carrusel.scrollLeft = 0;
        }
    }, 10);
};

const stop = () => {
    clearInterval(intervalo);
};

const prevButton = document.querySelector(".carrusel-prev");
const nextButton = document.querySelector(".carrusel-next");

prevButton.addEventListener("click", () => {
    stop();
    carrusel.scrollLeft -= carrusel.clientWidth;
});

nextButton.addEventListener("click", () => {
    stop();
    carrusel.scrollLeft += carrusel.clientWidth;
});

carrusel.addEventListener("mouseover", () => {
    stop();
});

carrusel.addEventListener("mouseout", () => {
    start();
});

// Touch para dispositivos móviles
let touchStartX = 0;
let touchEndX = 0;

carrusel.addEventListener("touchstart", (e) => {
    stop();
    touchStartX = e.touches[0].clientX;
});

carrusel.addEventListener("touchend", (e) => {
    start();
    touchEndX = e.changedTouches[0].clientX;

    if (touchStartX - touchEndX > 50) {
        carrusel.scrollLeft += carrusel.clientWidth;
    } else if (touchEndX - touchStartX > 50) {
        carrusel.scrollLeft -= carrusel.clientWidth;
    }
});

document.querySelectorAll("a").forEach((enlace) => {
    enlace.addEventListener("click", () => {
        stop();
    });
});

start(); */













//cambiar color-bg nav moviles
$(document).ready(function () {
    $('.navbar-toggler').click(function () {
        $('.navbar-custom').toggleClass('expanded');
    });
});