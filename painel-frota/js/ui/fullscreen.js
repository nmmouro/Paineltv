document.getElementById("toggle-fullscreen").onclick = async ()=>{
  if(!document.fullscreenElement){
    await document.documentElement.requestFullscreen();
  }else{
    await document.exitFullscreen();
  }
};
