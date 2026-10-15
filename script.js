const photos = [
  ["images/photo1.jpg","That smile... unfairly beautiful."],
  ["images/photo2.jpg","My favourite travel companion."],
  ["images/photo3.jpg","Some memories just feel like home."],
  ["images/photo4.jpg","Do pagal se hum… aur ek yaad, jise dil baar-baar jeena chahe. ❤️🫠"],
  ["images/photo5.jpg","Phir se tumse pyaar ho jaata hai. ❤️"],
  ["images/photo6.jpg","You + me = my favourite view."],
  ["images/photo7.jpg","This one deserves a place in my heart."],
  ["images/photo8.jpg","The kind of moment I wish I could pause."],
  ["images/photo9.jpg","Your smile has its own superpower."],
  ["images/photo10.jpg","Proof that simple moments are the best ones."],
  ["images/photo11.jpg","Even a normal call becomes a memory with you."],
  ["images/photo12.jpg","And here's to many, many more."]
];

let current = 0;
const mainPhoto = document.getElementById("mainPhoto");
const photoCaption = document.getElementById("photoCaption");
const photoNumber = document.getElementById("photoNumber");
const photoCard = document.getElementById("photoCard");
const dots = document.getElementById("dots");

photos.forEach((_, i) => {
  const d = document.createElement("div");
  d.className = "dot" + (i === 0 ? " active" : "");
  d.onclick = () => showPhoto(i);
  dots.appendChild(d);
});

function showPhoto(index) {
  current = (index + photos.length) % photos.length;
  photoCard.style.opacity = "0";
  photoCard.style.transform = "rotate(2deg) scale(.96)";
  setTimeout(() => {
    mainPhoto.src = photos[current][0];
    photoCaption.textContent = photos[current][1];
    photoNumber.textContent = String(current + 1).padStart(2,"0") + " / " + photos.length;
    [...dots.children].forEach((d,i) => d.classList.toggle("active", i === current));
    photoCard.style.opacity = "1";
    photoCard.style.transform = "rotate(-2deg) scale(1)";
  }, 220);
}
document.getElementById("nextBtn").onclick = () => showPhoto(current + 1);
document.getElementById("prevBtn").onclick = () => showPhoto(current - 1);


const pauseBtn = document.getElementById("pauseBtn");

// Yahan timing change karna, 5000 = 5 seconds
const slideInterval = 3000;

let isPaused = false;
let slideshowTimer;

function startSlideshow() {
  clearInterval(slideshowTimer);

  if (!isPaused) {
    slideshowTimer = setInterval(() => {
      showPhoto(current + 1);
    }, slideInterval);
  }
}

pauseBtn.onclick = () => {
  isPaused = !isPaused;

  pauseBtn.textContent = isPaused ? "▶ Play" : "⏸ Pause";
  pauseBtn.setAttribute("aria-pressed", String(isPaused));

  startSlideshow();
};

// Start automatic slideshow
startSlideshow();




function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({behavior:"smooth"});
}

// Loader
const boot = [
  "Loading memories........ 100%",
  "Finding the most beautiful person...",
  "Result: 1 found ❤️",
  "Compiling feelings........ 100%",
  "Deploying forever........ READY"
];
const bootLines = document.getElementById("bootLines");
let bi = 0;
function addBootLine(){
  if(bi < boot.length){
    const p = document.createElement("div");
    p.textContent = boot[bi++];
    bootLines.appendChild(p);
    setTimeout(addBootLine, 420);
  } else {
    setTimeout(() => document.getElementById("loader").classList.add("hide"), 850);
  }
}
setTimeout(addBootLine, 500);

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add("visible");
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Floating hearts
const hearts = document.getElementById("hearts");
function createHeart(){
  const h = document.createElement("span");
  h.className = "floating-heart";
  h.textContent = Math.random() > .25 ? "♥" : "✦";
  h.style.left = Math.random()*100 + "vw";
  h.style.bottom = "-30px";
  h.style.fontSize = (8 + Math.random()*18) + "px";
  h.style.animationDuration = (5 + Math.random()*6) + "s";
  h.style.setProperty("--drift",(Math.random()*180-90)+"px");
  hearts.appendChild(h);
  setTimeout(()=>h.remove(),12000);
}
setInterval(createHeart, 650);

// Letter
const overlay = document.getElementById("letterOverlay");
const envelope = document.getElementById("envelope");
document.getElementById("openLetter").onclick = () => {
  overlay.classList.add("open");
  setTimeout(()=>envelope.classList.add("opened"),150);
};
document.getElementById("closeLetter").onclick = () => {
  envelope.classList.remove("opened");
  setTimeout(()=>overlay.classList.remove("open"),500);
};
overlay.addEventListener("click", e => {
  if(e.target === overlay) document.getElementById("closeLetter").click();
});

// Final surprise
document.getElementById("foreverBtn").onclick = () => {
  for(let i=0;i<45;i++) setTimeout(createHeart, i*35);
  const toast = document.getElementById("toast");
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),3500);
  document.getElementById("finalText").innerHTML = "I love you.<br><em> Gugguuu. ❤️</em>";
};

// Tiny cursor heart trail on desktop
const cursorHeart = document.getElementById("cursorHeart");
let lastTrail = 0;
document.addEventListener("mousemove", e => {
  if(Date.now()-lastTrail < 100) return;
  lastTrail = Date.now();
  cursorHeart.style.left = e.clientX+8+"px";
  cursorHeart.style.top = e.clientY+8+"px";
  cursorHeart.style.opacity = ".6";
});
const music = document.getElementById("loveMusic");

document.addEventListener("click", function () {
    music.currentTime = 5; // Song 14 seconds se start hoga
    music.play();
}, { once: true });


// Optional music:
// Put a file named music.mp3 inside a "music" folder, then uncomment below.
/*
const audio = new Audio("music/music.mp3");
audio.loop = true;
document.getElementById("musicBtn").onclick = () => {
  if(audio.paused){ audio.play(); musicBtn.textContent="❚❚"; }
  else { audio.pause(); musicBtn.textContent="♫"; }
};
*/
