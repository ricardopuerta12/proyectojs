/* =========================================================================
   1. ESTRUCTURAS DE DATOS (Arrays, Objetos y Set)
   Requisito: Usar estructuras como Set, Map, Array... y objetos.
========================================================================= */

// ARRAY de OBJETOS para generar la tabla de la carta sin repetir HTML
const datosCarta = [
    { bebida: "Espresso", desc: "Concentrado intenso y cremoso", tamano: "30 ml", precio: "1,80 €", origen: "Etiopía Yirgacheffe" },
    { bebida: "Cappuccino", desc: "Espresso con leche vaporizada", tamano: "180 ml", precio: "2,50 €", origen: "Colombia Huila" },
    { bebida: "Flat White", desc: "Doble ristretto con microespuma", tamano: "160 ml", precio: "2,80 €", origen: "Guatemala Antigua" },
    { bebida: "Cold Brew", desc: "Infusión en frío 18 horas", tamano: "300 ml", precio: "3,50 €", origen: "Brasil Cerrado" }
];

// ARRAY de OBJETOS para la galería
const datosGaleria = [
    { img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=75", caption: "Espresso de especialidad" },
    { img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=75", caption: "Granos de origen" },
    { img: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=600&q=75", caption: "Nuestro espacio" }
];

// SET: Usamos un Set para almacenar los orígenes únicos de nuestros cafés (no permite duplicados)
const origenesUnicos = new Set();
// Extraemos los orígenes del array de la carta y los metemos en el Set
datosCarta.forEach(cafe => origenesUnicos.add(cafe.origen.split(" ")[0])); // Guardamos solo el país


/* =========================================================================
   2. NAVEGACIÓN SPA (Single Page Application)
   Requisito: Alternar contenido sin recargar la página y usar While, Switch e If.
========================================================================= */

// Capturamos el contenedor principal donde inyectaremos el HTML
const contenedorPrincipal = document.getElementById('app-container');

// Función principal que cambia la sección
function cargarSeccion(seccion) {

    // IF: Comprobamos si nos pasan una sección, si no, por defecto es 'inicio'
    if (!seccion) {
        seccion = 'inicio';
    }

    // WHILE: Limpiamos el contenedor eliminando su primer hijo hasta que quede vacío.
    // Esto es mucho más eficiente que usar innerHTML = ''
    while (contenedorPrincipal.firstChild) {
        contenedorPrincipal.removeChild(contenedorPrincipal.firstChild);
    }

    // SWITCH: Dependiendo de la sección que pulse el usuario, llamamos a una función u otra
    switch (seccion) {
        case 'inicio':
            renderizarInicio();
            break;
        case 'carta':
            renderizarCarta();
            break;
        case 'galeria':
            renderizarGaleria();
            break;
        case 'contacto':
            renderizarContacto();
            break;
        default:
            renderizarInicio();
            break;
    }
}

/* =========================================================================
   3. GENERACIÓN DE CONTENIDO DINÁMICO (Minimizando HTML)
   Requisito: Generar contenido mediante JS, usando bucles.
========================================================================= */

function renderizarInicio() {
    // Creamos elementos HTML desde JS
    const section = document.createElement('section');
    section.className = 'hero';
    section.innerHTML = `
        <div class="hero-content">
            <p class="hero-eyebrow">Especialidad · Origen · Pasión</p>
            <h1 class="hero-titulo">El café que<br /><em>mereces sentir</em></h1>
            <p>Granos de origen único, tostado artesanal y baristas apasionados.</p>
        </div>
    `;
    contenedorPrincipal.appendChild(section);
}

function renderizarCarta() {
    const section = document.createElement('section');
    section.className = 'seccion carta-seccion';

    let htmlTabla = `
        <div class="contenedor">
            <h2 class="titulo-seccion">Nuestra <em>carta</em></h2>
            <p>Orígenes con los que trabajamos: ${Array.from(origenesUnicos).join(", ")}</p>
            <table class="tabla-productos">
                <thead>
                    <tr>
                        <th>Bebida</th><th>Descripción</th><th>Tamaño</th><th>Precio</th><th>Origen</th>
                    </tr>
                </thead>
                <tbody id="cuerpo-tabla">
                </tbody>
            </table>
        </div>
    `;
    section.innerHTML = htmlTabla;
    contenedorPrincipal.appendChild(section);

    const tbody = document.getElementById('cuerpo-tabla');

    // FOR: Bucle for tradicional para recorrer el array y generar las filas de la tabla
    for (let i = 0; i < datosCarta.length; i++) {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><strong>${datosCarta[i].bebida}</strong></td>
            <td>${datosCarta[i].desc}</td>
            <td>${datosCarta[i].tamano}</td>
            <td>${datosCarta[i].precio}</td>
            <td>${datosCarta[i].origen}</td>
        `;
        tbody.appendChild(fila);
    }
}

function renderizarGaleria() {
    const section = document.createElement('section');
    section.className = 'seccion galeria-seccion';
    section.innerHTML = `
        <div class="contenedor">
            <h2 class="titulo-seccion">Nuestra esencia<br /><em>en imágenes</em></h2>
            <div class="galeria-grid" id="grid-galeria"></div>
        </div>
    `;
    contenedorPrincipal.appendChild(section);

    const grid = document.getElementById('grid-galeria');

    // Generamos las imágenes sin repetir HTML usando el array
    datosGaleria.forEach(item => {
        const figure = document.createElement('figure');
        figure.className = 'galeria-item';
        figure.innerHTML = `
            <img src="${item.img}" alt="${item.caption}" width="600" style="max-width: 100%;">
            <figcaption>${item.caption}</figcaption>
        `;
        grid.appendChild(figure);
    });
}

function renderizarContacto() {
    const section = document.createElement('section');
    section.innerHTML = `
        <div class="contenedor">
            <h2 class="titulo-seccion">¿Hablamos<br /><em>del café?</em></h2>
            <form id="form-contacto">
                <input type="text" placeholder="Nombre completo" required>
                <input type="email" placeholder="Correo electrónico" required>
                <button type="submit">Enviar mensaje</button>
            </form>
        </div>
    `;
    contenedorPrincipal.appendChild(section);
}

/* =========================================================================
   4. EVENT LISTENERS PARA EL MENÚ
========================================================================= */

// Asignamos el evento click a todos los enlaces del menú
document.querySelectorAll('.nav-links a').forEach(enlace => {
    enlace.addEventListener('click', function (evento) {
        // Evitamos que el navegador recargue la página al pulsar el enlace
        evento.preventDefault();

        // Obtenemos a qué sección quiere ir el usuario leyendo el data-seccion
        const seccionDestino = this.getAttribute('data-seccion');

        // Cargamos la sección correspondiente
        cargarSeccion(seccionDestino);
    });
});

// Iniciamos la web cargando la vista de "inicio" por defecto al abrir la página
cargarSeccion('inicio');