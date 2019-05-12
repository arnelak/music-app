class EventsClass {

  constructor() {
    this.addClickOnLink();
    this.addClickOnControls();
    this.onLoginSubmit();
    this.onLogout();
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

  addClickOnControls = () => {
    const playButton = document.querySelector("#play");

    playButton.addEventListener("click", (event) => {
      if(audio.paused) {
          audio.play();
      }
      else {
          audio.pause();
      }

      this.changePlayerButton();
    });
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

      this.playSong(song);
      this.changePlayerButton();
    });
  }

  playSong = (song) => {
    audio.pause();
    audio.src = song.src;
    audio.play();
  }

  changePlayerButton = () => {
    const playButton = document.querySelector("#play");
    //const pauseButton = document.querySelector("#play");

    playButton.innerHTML = audio.paused ? templates.getIconPlay() : templates.getIconPause();
  }
}
