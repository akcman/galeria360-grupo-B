const scenes = Array.from({length:15},(_,i)=>{
  const n=String(i+1).padStart(2,"0");
  return {title:`Escena ${n}`, image:`imagenes/foto${n}.jpg`};
});

const params=new URLSearchParams(location.search);
let current=Math.min(15,Math.max(1,parseInt(params.get("scene")||"1",10)))-1;

const sky=document.getElementById("sky");
const status=document.getElementById("status");
const title=document.getElementById("title");
const counter=document.getElementById("counter");
const aframeScene=document.getElementById("scene");

function loadScene(index){
  current=(index+scenes.length)%scenes.length;
  const item=scenes[current];

  title.textContent=item.title;
  counter.textContent=`${current+1} / ${scenes.length}`;
  status.textContent="Cargando panorama…";
  status.classList.remove("hidden");

  const img=new Image();
  img.onload=()=>{
    // Se asigna solo después de confirmar que el JPG cargó.
    sky.setAttribute("src", item.image);
    sky.setAttribute("color","#fff");

    // Forzar repaint/render en Chrome.
    requestAnimationFrame(()=>{
      window.dispatchEvent(new Event("resize"));
      setTimeout(()=>status.classList.add("hidden"),250);
    });

    history.replaceState(null,"",`viewer.html?scene=${current+1}`);
  };
  img.onerror=()=>{
    status.textContent=`Error cargando ${item.image}`;
    console.error("No se pudo cargar",item.image);
  };
  img.src=item.image;
}

document.getElementById("menuBtn").onclick=()=>location.href="index.html";
document.getElementById("prevBtn").onclick=()=>loadScene(current-1);
document.getElementById("nextBtn").onclick=()=>loadScene(current+1);

document.getElementById("fullBtn").onclick=async()=>{
  try{
    if(!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  }catch(e){console.warn(e)}
};

document.addEventListener("keydown",e=>{
  if(e.key==="ArrowLeft") loadScene(current-1);
  if(e.key==="ArrowRight") loadScene(current+1);
  if(e.key==="Escape" && !document.fullscreenElement) location.href="index.html";
});

// Esperar a que A-Frame confirme que la escena está lista y YA VISIBLE.
if(aframeScene.hasLoaded){
  loadScene(current);
}else{
  aframeScene.addEventListener("loaded",()=>loadScene(current),{once:true});
}
