// ===============================
// RECORRIDO VIRTUAL 360°
// Grupo B
// Instituto Tecnológico Superior de Misantla
// Mtro. Jorge Cruz Salazar
// ===============================

const scenes = [

{
    title: "Estacionamiento",
    description: "Área de estacionamiento principal",
    image: "imagenes/foto01.jpg"
},

{
    title: "Entrada Principal",
    description: "Acceso principal al Instituto",
    image: "imagenes/foto02.jpg"
},

{
    title: "Explanada",
    description: "Zona central del campus",
    image: "imagenes/foto03.jpg"
},

{
    title: "Edificio H",
    description: "Ingeniería en Sistemas Computacionales",
    image: "imagenes/foto04.jpg"
},

{
    title: "Biblioteca",
    description: "Centro de información y consulta",
    image: "imagenes/foto05.jpg"
},

{
    title: "Laboratorio de Cómputo",
    description: "Prácticas de programación",
    image: "imagenes/foto06.jpg"
},

{
    title: "Laboratorio de Electrónica",
    description: "Prácticas de electrónica",
    image: "imagenes/foto07.jpg"
},

{
    title: "Cafetería",
    description: "Área de alimentos",
    image: "imagenes/foto08.jpg"
},

{
    title: "Canchas Deportivas",
    description: "Zona deportiva",
    image: "imagenes/foto09.jpg"
},

{
    title: "Edificio A",
    description: "Área académica",
    image: "imagenes/foto10.jpg"
},

{
    title: "Edificio B",
    description: "Área académica",
    image: "imagenes/foto11.jpg"
},

{
    title: "Laboratorio",
    description: "Área de prácticas",
    image: "imagenes/foto12.jpg"
},

{
    title: "Área Verde",
    description: "Espacios abiertos del campus",
    image: "imagenes/foto13.jpg"
},

{
    title: "Auditorio",
    description: "Eventos académicos",
    image: "imagenes/foto14.jpg"
},

{
    title: "Salida",
    description: "Fin del recorrido",
    image: "imagenes/foto15.jpg"
}

];

const welcomeScreen = document.getElementById("welcomeScreen");
const menuScreen = document.getElementById("menuScreen");
const gallery = document.getElementById("gallery");

function show(screen){
    welcomeScreen.classList.remove("visible");
    menuScreen.classList.remove("visible");
    screen.classList.add("visible");
}

document.getElementById("startBtn").addEventListener("click", () => show(menuScreen));

document.getElementById("homeBtn").addEventListener("click", () => show(welcomeScreen));

scenes.forEach((scene, index) => {

    const numero = String(index + 1).padStart(2, "0");

    const card = document.createElement("button");
    card.className = "card";

    card.innerHTML = `

        <img class="card-image"
             src="${scene.image}"
             loading="lazy">

        <div class="card-overlay"></div>

        <div class="card-content">

            <div class="card-number">
                PANORAMA ${numero}
            </div>

            <div class="card-title">
                ${scene.title}
            </div>

            <div class="card-desc">
                ${scene.description}
            </div>

        </div>

    `;

    card.addEventListener("click", () => {

        location.href = `viewer.html?scene=${index + 1}`;

    });

    gallery.appendChild(card);

});
