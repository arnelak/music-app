class EventsClass {

  constructor() {
    this.addClickOnLink();
    this.addClickOnControls();
  }

  addClickOnLink = () =>  {
    const aElements = document.querySelectorAll("a");

    aElements.forEach(function(element) {
      element.addEventListener("click", function(event) {
        event.preventDefault();
        history.pushState({
          songID: element.getAttribute('data-id'),
        },
        null,
        element.getAttribute('href'));
      });
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
