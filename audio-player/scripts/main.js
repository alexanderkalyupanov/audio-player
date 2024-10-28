"use strict";

window.addEventListener("DOMContentLoaded", () => {

    let audioContainer = document.querySelector(".audio__container"),
    audioVolume = document.querySelector(".volume__bar"),
    audioImg = document.querySelector(".audio__img"),
    audioArtist = document.querySelector(".audio__artist"),
    audioName = document.querySelector(".audio__name"),
    track = document.querySelector(".track"),
    progressContainer = document.querySelector(".progress__container"), 
    progressBar = document.querySelector(".progress__bar"),
    btnBack = document.querySelector(".backward"),
    btnPlay = document.querySelector(".play-pause"),
    btnForward = document.querySelector(".forward"),
    btnSrc = document.querySelector(".btn__src"),
    currentTrack = document.querySelector(".currentTime"),
    durationTrack = document.querySelector(".duration")

let audioIndex = 0;
let isDragging = false;

const songsName = ["Dont Hurt Yourself", "Dont Start Now", "Ice Baby", "Полковнику никто не пишет", "Нежная", "Птица"];
const songsArtist = ["Beyonce", "Dua Lipa", "Guf", "БИ-2", "Диана Гурцкая", "DJ Smash"]

function loadAudio(song) {
    audioArtist.innerHTML = songsArtist[audioIndex];
    audioName.innerHTML = song;
    track.src = `./assets/audio/${song}.mp3`;
    audioImg.src = `./assets/img/${song}.png`
}

loadAudio(songsName[audioIndex])

function playAudio() {
    audioContainer.classList.add("play")
    btnSrc.src = `./assets/icons/pause.svg`;
    track.play();
}

function pauseAudio() {
    audioContainer.classList.remove("play")
    btnSrc.src = `./assets/icons/play.svg`;
    track.pause();
}

btnPlay.addEventListener("click", () => {
    let isPlay = audioContainer.classList.contains("play");
    if (isPlay) {
        pauseAudio();
    } else {
        playAudio();
    }
})

currentTrack.addEventListener('click', (e) => {
    e.stopPropagation(); 
});

durationTrack.addEventListener('click', (e) => {
    e.stopPropagation();
});

function nextAudio() {
    audioIndex++;
    if (audioIndex > songsName.length - 1) {
        audioIndex = 0;
    }
    loadAudio(songsName[audioIndex])
    playAudio();
}

function prevAudio() {
    audioIndex--;
    if (audioIndex < 0) {
        audioIndex = songsName.length - 1;
    }
    loadAudio(songsName[audioIndex])
    playAudio();
}

btnForward.addEventListener("click", () => {
    nextAudio();
})

btnBack.addEventListener("click", () => {
    prevAudio();
})

function correctTime() {
     if (!isNaN(track.duration)) {
        let currentMinutes = Math.floor(track.currentTime / 60);
        let currentSeconds = Math.floor(track.currentTime - currentMinutes * 60)
        let durationMinutes = Math.floor(track.duration / 60)
        let durationSeconds = Math.floor(track.duration - durationMinutes * 60)

        if (currentSeconds < 10) {
            currentSeconds = "0" + currentSeconds;
        }
        if (currentMinutes < 10) {
            currentMinutes = "0" + currentMinutes;
        }
        if (durationMinutes < 10) {
            durationMinutes = "0" + durationMinutes;
        }
        if (durationSeconds < 10) {
            durationSeconds = "0" + durationSeconds;
        }
        currentTrack.textContent = currentMinutes + ":" + currentSeconds;
        durationTrack.textContent = durationMinutes + ":" + durationSeconds;
    }
}

function updateProgressBar() {
    if (!isDragging) { 
        let { duration, currentTime } = track;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.value = progressPercent;
        
        correctTime();
    }
}

track.addEventListener("timeupdate", updateProgressBar)
track.addEventListener("loadedmetadata", updateProgressBar);

function setTimeTrack(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    let {duration} = track;
    track.currentTime = (clickX / width) * duration;
    correctTime();
}

function setVolume() {
    track.volume = audioVolume.value / 100;
}

audioVolume.addEventListener("change", setVolume)
progressContainer.addEventListener("click", setTimeTrack)
track.addEventListener("ended", nextAudio)

progressBar.addEventListener('mousedown', () => isDragging = true);
progressBar.addEventListener('mouseup', () => {
    isDragging = false;
    correctTime(); 
});
progressBar.addEventListener('mousemove', (e) => {
    if (isDragging) {
        setTimeTrack(e);
    }
});

});

