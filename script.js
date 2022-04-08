const image = document.querySelector("#cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const background = document.getElementById("background");
const musics = [
  {
    path: "https://dls.music-fa.com/tagdl/1401/Yosef%20Zamani%20-%20Gole%20Shekaste%20(320).mp3",
    musicName: "گل شکسته",
    artist: "یوسف زمانی",
    cover:
      "https://music-fa.com/wp-content/uploads/2022/03/Yousef-Zamani-Music-fa.com_.jpg",
  },
  {
    path: "https://dls.music-fa.com/tagdl/1401/Ali%20Roshan%20-%20Shoroo%20(320).mp3",
    musicName: "شروع",
    artist: "علی روشن",
    cover:
      "https://music-fa.com/wp-content/uploads/2022/04/Ali-Roshan-Shoroo-Music-fa.com_.jpg",
  },
  {
    path: "http://dls.music-fa.com/tagdl/1401/Alisan%20-%20Kari%20Kardi%20(128).mp3",
    musicName: "کاری کردی",
    artist: "علیسان",
    cover:
      "https://music-fa.com/wp-content/uploads/2022/04/IMG_06042022_214634_450_x_450_pixel.jpg",
  },
  {
    path: "https://dls.music-fa.com/tagdl/1401/Kamran%20Dadras%20-%20Rooze%20To%20(320).mp3",
    displayName: "روز تو",
    artist: "کامران دادرس",
    cover:
      "https://music-fa.com/wp-content/uploads/2022/04/Kamran-Dadras-Rooze-To-Music-fa.com_.jpg",
  },
];
let isPlaying = false;

const playSong = () => {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}
const pauseSong = () => {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

const loadSong = (song) => {
  console.log(song);
  title.textContent = song.musicName;
  artist.textContent = song.artist;
  music.src = song.path;
  changeCover(song.cover);
}

const changeCover = (cover) => {
  image.classList.remove("active");
  setTimeout(() => {
    image.src = cover;
    image.classList.add("active");
  }, 100);
  background.src = cover;
}

let songIndex = 0;

const prevSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = musics.length - 1;
  }
  loadSong(musics[songIndex]);
  playSong();
}
const nextSong = () => {
  songIndex++;
  if (songIndex > musics.length - 1) {
    songIndex = 0;
  }
  loadSong(musics[songIndex]);
  playSong();
}

loadSong(musics[songIndex]);

const updateProgressBar = (e) => {
  if (isPlaying) {
    const duration = e.srcElement.duration;
    const currentTime = e.srcElement.currentTime;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = progressPercent + "%";
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (durationSeconds) {
      durationEl.textContent = durationMinutes + ":" + durationSeconds;
    }
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    currentTimeEl.textContent = currentMinutes + ":" + currentSeconds;
  }
}

function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = music.duration;
  music.currentTime = (clickX / width) * duration;
}

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
