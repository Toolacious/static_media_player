songs = ["besttime.mp3", "change.mp3"];
names = ["對的時間點", "交換餘生"];
cv = ["besttime.jpg", "change.jpg"];
covers = ["url('besttime.jpg')", "url('change.jpg')"];
songIndex = 0;
let title = document.querySelector('#songname');
let play_btn = document.querySelector("#pause");
let next_btn = document.querySelector("#next");
let last_btn = document.querySelector("#last");
let range = document.querySelector("#range");
let bg = document.getElementById("bg");
let play_img = document.getElementById("pause");
let cvpic = document.getElementById('cvpic');
let total_time = 0;
let currentTime = 0;
let isPlaying = false;
let song = new Audio();
window.onload = playSong;

function playSong(){
    song.src = songs[songIndex];
    bg.style.backgroundImage = covers[songIndex];
    cvpic.src = cv[songIndex];
    title.innerHTML = names[songIndex];
    console.log(song);
    play_btn.addEventListener('click',function(){
        if(!isPlaying){
            song.play();
            isPlaying = true;
            cvpic.classList.add("rotate");
            total_time = song.duration;
            range.max = total_time;
            play_img.style.backgroundImage = "url('buttons/pause.png')";
            play_img.style.backgroundSize = "100%"
        }else{
            song.pause();
            cvpic.classList.remove("rotate");
            isPlaying = false;
            play_img.style.backgroundImage = "url('buttons/play-button.png')";
            play_img.style.backgroundSize = "60%"
        }
       song.addEventListener('ended',function(){
            song.currentTime = 0;
            song.pause();
            cvpic.classList.remove("rotate");
            isPlaying = false;
            range.value = 0;
            play_img.style.backgroundImage = "url('buttons/play-button.png')";
            play_img.style.backgroundSize = "60%"
            nextSong();
        })
        song.addEventListener('timeupdate',function(){
            range.value = song.currentTime;
            console.log(range.value);
        })
        range.addEventListener('change',function(){
            song.currentTime = range.value;
        })
       
    })
    function nextSong() {
        song.pause();
        songIndex++;
        if (songIndex > 1) 
            songIndex = 0;
        isPlaying = false;
        playSong();
    }
    function previousSong() {
        song.pause();
        songIndex--;
        if (songIndex < 0) 
            songIndex = 1;
        isPlaying = false;
        playSong();
    }
    
    next_btn.addEventListener('click',function() {
        nextSong();
    })
    last_btn.addEventListener('click', function(){
        previousSong();
    })
}
