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


// Carrusel
window.addEventListener('load', function() {
    const carouselList = document.querySelector('.carousel-lista');
    if (!carouselList) return;

    let glider = new Glider(carouselList, {
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
        arrows: {
            prev: '.carousel-anterior',
            next: '.carousel-siguiente'
        },
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            }
        ]
    });

    let intervalo = 16; // Intervalo entre frames en milisegundos (aproximadamente 60 FPS)
    let step = 1; // Paso del desplazamiento (en píxeles)
    let direction = 'forward'; // Dirección inicial del desplazamiento

    let autoplay = setInterval(function() {
        let currentScrollLeft = glider.ele.scrollLeft;
        let newScrollLeft;

        if (direction === 'forward') {
            newScrollLeft = currentScrollLeft + step;
        } else {
            newScrollLeft = currentScrollLeft - step;
        }

        if (newScrollLeft >= glider.ele.scrollWidth - glider.ele.clientWidth) {
            direction = 'backward'; // Cambia a dirección hacia atrás
        } else if (newScrollLeft <= 0) {
            direction = 'forward'; // Cambia a dirección hacia adelante
        }

        glider.ele.scrollLeft = newScrollLeft;
    }, intervalo);

    // Pausa el autoplay cuando el cursor está sobre el carrusel
    glider.ele.addEventListener('mouseover', function() {
        clearInterval(autoplay);
    });

    // Reinicia el autoplay cuando el cursor sale del carrusel
    glider.ele.addEventListener('mouseout', function() {
        autoplay = setInterval(function() {
            let currentScrollLeft = glider.ele.scrollLeft;
            let newScrollLeft;

            if (direction === 'forward') {
                newScrollLeft = currentScrollLeft + step;
            } else {
                newScrollLeft = currentScrollLeft - step;
            }

            if (newScrollLeft >= glider.ele.scrollWidth - glider.ele.clientWidth) {
                direction = 'backward'; // Cambia a dirección hacia atrás
            } else if (newScrollLeft <= 0) {
                direction = 'forward'; // Cambia a dirección hacia adelante
            }

            glider.ele.scrollLeft = newScrollLeft;
        }, intervalo);
    });

    // Detener el carrusel cuando se hace clic en un enlace del navbar
    document.querySelectorAll('.navbar-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function() {
            clearInterval(autoplay);
        });
    });
});

// Añadimos el script para el desplazamiento suave
document.addEventListener('DOMContentLoaded', function() {
    // Navbar links
    document.querySelectorAll('.navbar-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                window.history.pushState(null, null, `#${targetId}`);
            }
        });
    });

    // Footer links
    document.querySelectorAll('footer a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetOffsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const yOffset = targetOffsetTop - navbarHeight;

                window.scrollTo({
                    top: yOffset,
                    behavior: 'smooth'
                });
                window.history.pushState(null, null, `#${targetId}`);
            }
        });
    });
});


//cambiar color-bg nav moviles
$(document).ready(function () {
    $('.navbar-toggler').click(function () {
        $('.navbar-custom').toggleClass('expanded');
    });
});


document.getElementById("currentYear").textContent = new Date().getFullYear();
