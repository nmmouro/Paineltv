let soundEnabled = true;

export function playBeep(){

    if(!soundEnabled)
        return;

    const audio =
    document.getElementById("beep");

    audio.currentTime = 0;

    audio.play();
}

export function initAudio(){

    const btn =
    document.getElementById(
        "toggle-audio"
    );

    btn.onclick = () => {

        soundEnabled =
        !soundEnabled;

        btn.innerText =
        soundEnabled
        ? "🔊 SOM ON"
        : "🔇 SOM OFF";
    };
}
