songs = ["besttime.mp3", "change.mp3"];
names = ["對的時間點", "交換餘生"];
cv = ["besttime.jpg", "change.jpg"];
covers = ["url('besttime.jpg')", "url('change.jpg')"];
songIndex = 0;
const song = document.querySelector('#song');
let title = document.querySelector('#songname');
let play_btn = document.querySelector("#pause");
let next_btn = document.querySelector("#next");
let last_btn = document.querySelector("#last");
let range = document.querySelector("#range");
let bg = document.getElementById("bg");
let time = document.getElementById("time");
let play_img = document.getElementById("pause");
let cvpic = document.getElementById('cvpic');
let total_time = 0;
let currentTime = 0;
let Playing = true;

function PlaySong() {
    if (Playing) {
        const song = document.querySelector('#song');
        play_img.style.backgroundImage = "url('buttons/pause.png')";
        play_img.style.backgroundSize = "100%";
        song.play();
        total_time = song.duration;
        range.max = total_time;
        cvpic.classList.add("rotate");
        Playing = false;
    }
    else {
        play_img.style.backgroundImage = "url('buttons/play-button.png')";
        play_img.style.backgroundSize = "60%";
        song.pause();
        cvpic.classList.remove("rotate");
        Playing = true;
    }
}
song.addEventListener('ended', function(){
    song.currentTime = 0;
    range.value = 0;
    cvpic.classList.remove("rotate");
    nextSong();
})

function nextSong() {
    songIndex++;
    if (songIndex > 1) 
        songIndex = 0;
    song.src = songs[songIndex];
    bg.style.backgroundImage = covers[songIndex];
    cvpic.src = cv[songIndex];
    title.innerHTML = names[songIndex];
    Playing = true;
    playSong();
}
function previousSong() {
    songIndex--;
    if (songIndex < 0) 
        songIndex = 1;
    song.src = songs[songIndex];
    bg.style.backgroundImage = covers[songIndex];
    cvpic.src = cv[songIndex];
    title.innerHTML = names[songIndex];
    Playing = true;
    playSong();
}

next_btn.addEventListener('click',function() {
    nextSong();
})
last_btn.addEventListener('click', function(){
    previousSong();
})
play_btn.addEventListener('click', function(){
    PlaySong();
})

song.addEventListener('timeupdate',function(){
    range.value = song.currentTime;
    time.innerHTML = (formatTime(Math.floor(song.currentTime)));
})
range.addEventListener('change',function(){
    song.currentTime = range.value;
})

function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10){ 
        sec  = `0${sec}`;
    };
    return `${min}:${sec}`;
};