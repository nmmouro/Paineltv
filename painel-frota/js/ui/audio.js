const audio = document.getElementById("beep");
let soundEnabled = true;

document.getElementById("toggle-audio").onclick = ()=>{
  soundEnabled = !soundEnabled;
};

function playBeep(){
  if(!soundEnabled) return;
  audio.currentTime = 0;
  audio.play();
}
