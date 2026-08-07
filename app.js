const scenes = Array.from({length:15},(_,i)=>{
  const n=String(i+1).padStart(2,"0");
  return {
    title:`Escena ${n}`,
    description:"Fotografía panorámica 360° · Grupo B",
    image:`imagenes/foto${n}.jpg`
  };
});

const welcomeScreen=document.getElementById("welcomeScreen");
const menuScreen=document.getElementById("menuScreen");
const gallery=document.getElementById("gallery");

function show(screen){
  welcomeScreen.classList.remove("visible");
  menuScreen.classList.remove("visible");
  screen.classList.add("visible");
}

document.getElementById("startBtn").addEventListener("click",()=>show(menuScreen));
document.getElementById("homeBtn").addEventListener("click",()=>show(welcomeScreen));

scenes.forEach((scene,index)=>{
  const card=document.createElement("button");
  card.className="card";
  card.innerHTML=`
    <img class="card-image" src="${scene.image}" alt="" loading="lazy">
    <div class="card-overlay"></div>
    <div class="card-content">
      <div class="card-number">PANORAMA ${String(index+1).padStart(2,"0")}</div>
      <div class="card-title">${scene.title}</div>
      <div class="card-desc">${scene.description}</div>
    </div>`;
  card.addEventListener("click",()=>{
    location.href=`viewer.html?scene=${index+1}`;
  });
  gallery.appendChild(card);
});
