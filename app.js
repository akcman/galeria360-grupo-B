const scenes = [
  {
    title: "Escena 01",
    description: "Fotografía panorámica 360° · Grupo B",
    image: "imagenes/foto01.jpg"
  },
  {
    title: "Escena 02",
    description: "Fotografía panorámica 360° · Grupo B",
    image: "imagenes/foto02.jpg"
  },
  {
    title: "Escena 03",
    description: "Fotografía panorámica 360° · Grupo B",
    image: "imagenes/foto03.jpg"
  },
  {
    title: "Escena 04",
    description: "Fotografía panorámica 360° · Grupo B",
    image: "imagenes/foto04.jpg"
  },
  {
    title: "Escena 05",
    description: "Fotografía panorámica 360° · Grupo B",
    image: "imagenes/foto05.jpg"
  },
  {
    title: "Escena 06",
    description: "Fotografía panorámica 360° · Grupo B",
    image: "imagenes/foto06.jpg"
  },
  {
    title: "Escena 07",
    description: "Fotografía panorámica 360° · Grupo B",
    image: "imagenes/foto07.jpg"
  },
  {
    title: "Escena 08",
    description: "Fotografía panorámica 360° · Grupo B",
    image: "imagenes/foto08.jpg"
  },
  {
    title: "Escena 09",
    description: "Fotografía panorámica 360° · Grupo B",
    image: "imagenes/foto09.jpg"
  },
  {
    title: "Escena 10",
    description: "Fotografía panorámica 360° · Grupo B",
    image: "imagenes/foto10.jpg"
  },
  {
    title: "Escena 11",
    description: "Fotografía panorámica 360° · Grupo B",
    image: "imagenes/foto11.jpg"
  },
  {
    title: "Escena 12",
    description: "Fotografía panorámica 360° · Grupo B",
    image: "imagenes/foto12.jpg"
  },
  {
    title: "Escena 13",
    description: "Fotografía panorámica 360° · Grupo B",
    image: "imagenes/foto13.jpg"
  },
  {
    title: "Escena 14",
    description: "Fotografía panorámica 360° · Grupo B",
    image: "imagenes/foto14.jpg"
  },
  {
    title: "Escena 15",
    description: "Fotografía panorámica 360° · Grupo B",
    image: "imagenes/foto15.jpg"
  }
];

let currentScene = 0;

const welcomeScreen = document.getElementById("welcomeScreen");
const menuScreen = document.getElementById("menuScreen");
const viewerScreen = document.getElementById("viewerScreen");
const gallery = document.getElementById("gallery");
const sky = document.getElementById("sky");
const loading = document.getElementById("loading");

const startBtn = document.getElementById("startBtn");
const homeBtn = document.getElementById("homeBtn");
const backBtn = document.getElementById("backBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const toggleInfoBtn = document.getElementById("toggleInfoBtn");

const sceneTitle = document.getElementById("sceneTitle");
const sceneCounter = document.getElementById("sceneCounter");
const infoCard = document.getElementById("infoCard");
const infoTitle = document.getElementById("infoTitle");
const infoDescription = document.getElementById("infoDescription");

function showOnly(screen) {
  welcomeScreen.classList.remove("visible");
  menuScreen.classList.remove("visible");
  viewerScreen.classList.remove("visible");
  screen.classList.add("visible");
}

function buildMenu() {
  scenes.forEach((scene, index) => {
    const card = document.createElement("button");
    card.className = "card";
    card.type = "button";
    card.setAttribute("aria-label", `Abrir ${scene.title}`);

    card.innerHTML = `
      <img class="card-image" src="${scene.image}" alt="" loading="lazy">
      <div class="card-overlay"></div>
      <div class="card-content">
        <div class="card-number">PANORAMA ${String(index + 1).padStart(2, "0")}</div>
        <div class="card-title">${scene.title}</div>
        <div class="card-desc">${scene.description}</div>
      </div>
    `;

    card.addEventListener("click", () => openScene(index));
    gallery.appendChild(card);
  });
}

function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = reject;
    img.src = src;
  });
}

/* FIX V2.1:
   Fuerza a A-Frame/Three.js a recalcular el tamaño del canvas al mostrar
   el visor. */
function refreshAFrameViewport() {
  const aframeScene = document.querySelector("a-scene");

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event("resize"));

      if (aframeScene && aframeScene.renderer) {
        const width = viewerScreen.clientWidth || window.innerWidth;
        const height = viewerScreen.clientHeight || window.innerHeight;
        aframeScene.renderer.setSize(width, height, false);
      }
    });
  });
}

async function openScene(index) {
  currentScene = (index + scenes.length) % scenes.length;
  const scene = scenes[currentScene];

  showOnly(viewerScreen);
  viewerScreen.setAttribute("aria-hidden", "false");
  refreshAFrameViewport();
  loading.classList.add("visible");

  sceneTitle.textContent = scene.title;
  sceneCounter.textContent = `${currentScene + 1} / ${scenes.length}`;
  infoTitle.textContent = scene.title;
  infoDescription.textContent = scene.description;

  try {
    await preloadImage(scene.image);
    sky.setAttribute("src", scene.image);

    /* Una segunda actualización después de colocar la textura. */
    setTimeout(refreshAFrameViewport, 100);
  } catch (error) {
    console.error("No se pudo cargar:", scene.image, error);
    sky.removeAttribute("src");
    sky.setAttribute("color", "#261019");
    alert(`No se pudo cargar ${scene.image}. Verifica el nombre y la carpeta.`);
  } finally {
    setTimeout(() => loading.classList.remove("visible"), 220);
  }
}

function closeViewer() {
  const aframeScene = document.querySelector("a-scene");
  if (aframeScene && aframeScene.is && aframeScene.is("vr-mode")) {
    aframeScene.exitVR();
  }
  viewerScreen.setAttribute("aria-hidden", "true");
  showOnly(menuScreen);
}

function goHome() {
  showOnly(welcomeScreen);
}

function previousScene() {
  openScene(currentScene - 1);
}

function nextScene() {
  openScene(currentScene + 1);
}

async function toggleFullscreen() {
  try {
    if (!document.fullscreenElement) {
      await viewerScreen.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
    setTimeout(refreshAFrameViewport, 100);
  } catch (error) {
    console.warn("Pantalla completa no disponible:", error);
  }
}

function toggleInfo() {
  infoCard.classList.toggle("hidden");
}

startBtn.addEventListener("click", () => showOnly(menuScreen));
homeBtn.addEventListener("click", goHome);
backBtn.addEventListener("click", closeViewer);
prevBtn.addEventListener("click", previousScene);
nextBtn.addEventListener("click", nextScene);
fullscreenBtn.addEventListener("click", toggleFullscreen);
toggleInfoBtn.addEventListener("click", toggleInfo);

document.addEventListener("keydown", (event) => {
  if (!viewerScreen.classList.contains("visible")) return;
  if (event.key === "ArrowLeft") previousScene();
  if (event.key === "ArrowRight") nextScene();
  if (event.key.toLowerCase() === "i") toggleInfo();
  if (event.key === "Escape" && !document.fullscreenElement) closeViewer();
});

window.addEventListener("resize", () => {
  if (viewerScreen.classList.contains("visible")) {
    refreshAFrameViewport();
  }
});

buildMenu();
