class EventsClass {

  constructor() {
    this.addOnListPlayEvent();
    this.addClickOnLink();
    this.addClickOnControls();
    this.onLoginSubmit();
    this.onLogout();
    this.onRegisterSubmit();
    this.addClickOnProgress();

    this.interval = null;
  }

  addClickOnLink = () =>  {
    $(document).on('click', 'a', function(event){
      event.preventDefault();

      history.pushState({
        songID: event.target.getAttribute('data-id'),
        url: event.target.getAttribute('href'),
      },
        null,
        event.target.getAttribute('href'));
      });
  }

  addClickOnProgress = () => {
    $('#progress-bar').on('click', (event) => {
      this.seekTo(event.offsetX);
    });
  }

  addOnListPlayEvent = () => {
    $('body').on('click', '.list-play-button', (event) => {
      console.log("EV", event);
    });
  }

  addClickOnControls = () => {
    const playButton = document.querySelector("#play");
    const playNextButton = document.querySelector("#play-next");
    const playPreviousButton = document.querySelector("#play-previous");

    /*
      dodali smo click event na next song button, koji poziva tu metodu playNextSong
    */
    playPreviousButton.addEventListener("click", (event) => {
      this.playPreviousSong();
    });

    playNextButton.addEventListener("click", (event) => {
      this.playNextSong();
    });

    playButton.addEventListener("click", (event) => {
      if(audio.paused) {
          audio.play();
          this.setCurrentTimeInterval();
      }
      else {
          audio.pause();
          clearInterval(this.interval);
      }

      this.changePlayerButton();
    });
  }

  seekTo = (clickedValueinPx) => {
    const progressElement = document.querySelector("#progress-bar");
    const progressTotalWidth = progressElement.offsetWidth;
    const clickedPositionInPercentage = clickedValueinPx / progressTotalWidth * 100;
    const totalTime = audio.duration;
    const songSeekToSeconds = totalTime / 100 * clickedPositionInPercentage;

    audio.currentTime = songSeekToSeconds;
  }

  onLoginSubmit = () => {
    $(document).on('submit', '#login-form', function(event){
      event.preventDefault();
      const email = document.querySelector("#login-email").value;
      const password = document.querySelector("#login-password").value;

      firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        history.pushState(
          null,
          null,
          "/"
        );
      })
      .catch((error) => {
        console.log("ERR", error);
      });
    });
  }

/*
  dodajemo submit event na register formu, znaci kad je popunimo i kliknemo na register Button
  i uzmemo ova tri elementa iz forme, email, password i confirmPassword
  password i confirmPassword moraju biti isti da bismo proslijedili dalje da se registrujemo
  i onda koristimo ove ugradjene firebase metode .createUserWithEmailAndPassword
  a iznad smo koristili signIn metodu za login, i onda radi isto kao fetch, vrati ti response i
  mozes korstit then i catch, ako je uspjela registracija izvrsit ce se then,
  ako vec postoji registrovan user, onda ce ti se izvrsit catch, tj. desio se neki error
  i onda u then, ako je uspjela registracija, koristio sam history.pushState da nas prebaci na homepage "/"
*/
  onRegisterSubmit = () => {
    $(document).on('submit', '#register-form', function(event){
      event.preventDefault();
      const email = document.querySelector("#register-email").value;
      const password = document.querySelector("#register-password").value;
      const confirmPassword = document.querySelector("#register-confirm-password").value;

      if(password === confirmPassword) {
        firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          history.pushState(
            null,
            null,
            "/"
          );
        })
        .catch((error) => {
          console.log("ERR", error);
        });
      }
    });
  }

  onLogout = () => {
    document.querySelector("#logoutElement").addEventListener("click", () => {
      firebase.auth()
      .signOut()
      .then(() => {
        console.log("LOGOUT SUCCESS");
      })
      .catch((err) => {
        console.log("LOGOUT FAILED", err);
      });
    });
  }

  addEventListenerOnPlayButton = (song) => {
    document.querySelector("#play-button").addEventListener("click", () => {
      templates.updatePlayerControlsContent(song);

      document.querySelector("#sidebar ul").classList.add("short-height");

      songObject.setSong(song);

      this.playSong(song);

      this.setCurrentTimeInterval();

      requestAnimationFrame(() => {
        const currentTime = audio.currentTime;
        const totalTime = audio.duration;
        const progressValue = Math.round(currentTime / totalTime * 100 * 100) / 100;

        this.setProgress(progressValue);
      });

      setTimeout(() => {
        document.querySelector("#duration-time").innerHTML = Math.round(audio.duration / 60 * 100) / 100;
      }, 1000);

      this.changePlayerButton();
    });
  }


/*
  iz globalne klase songObject koja cuva podatke o trentnoj pjesmi, imamo metodu getCurrentSong
  koja nam vrati podatke o trenutnoj pjesmi, onda ima metoda find na nizovima
  posto imamo songs niz, find prolazi kroz taj niz i trazi pjesmu ciji id zadovljava uslov currentSong id + 1
  znaci + 1, je ustvari sljedeca pjesma i vrati nam podatke o sljedecoj pjesmi
  onda smo od prije imali metodu playSong koja prima pjesmu i playa je, isto tako imamo metodu updatePlayerControlsContent
  iz druge klase koja isto prima pjesmu, izvuce iz nje sliku i text i prikaze

  i posto smo rekli da songObject (tj. SongClass) cuva podatke o trenutnoj pjesmi koja playa, mi smo pustili sjedecu pjesmu,
  pa samim tim trebamo da updateujemo ovaj songObject jer sad playa druga pjesma, i sve tako, kad god pustimo drugu pjesmu
  trebamo uradit update na ovom objektu da znamo uvijek trenutno stanje
*/
  playPreviousSong = () => {
    const currentSong = songObject.getCurrentSong();
    let previousSong = songs.find((item) => item.id === currentSong.id - 1);

    if(!previousSong) {
      previousSong = songs[songs.length - 1];
    }

    songObject.setSong(previousSong);

    this.playSong(previousSong);
    templates.updatePlayerControlsContent(previousSong);
  }

  playNextSong = () => {
    const currentSong = songObject.getCurrentSong();
    let nextSong = songs.find((item) => item.id === currentSong.id + 1);

    if(!nextSong) {
      nextSong = songs[0];
    }

    songObject.setSong(nextSong);

    this.playSong(nextSong);
    templates.updatePlayerControlsContent(nextSong);
  }

  setCurrentTimeInterval = () => {
    this.interval = setInterval(() => {
      document.querySelector("#current-time").innerHTML = secondsToMins(audio.currentTime) + ' - ';
    }, 1000);
  }

  playSong = (song) => {
    audio.pause();
    audio.src = song.src;
    audio.play();
  }

  setProgress = (value) => {
    document.querySelector("#progress-bar span.active-track").style.width = value + '%';

    requestAnimationFrame(() => {
      const currentTime = audio.currentTime;
      const totalTime = audio.duration;
      const progressValue = Math.round(currentTime / totalTime * 100 * 100) / 100;

      this.setProgress(progressValue);
    });
  }

  changePlayerButton = () => {
    const playButton = document.querySelector("#play");

    playButton.innerHTML = audio.paused ? templates.getIconPlay() : templates.getIconPause();

  }
}
