class TemplatesClass {

  renderTemplate = (state, songBlockElement) => {

    if(state && state.songID) {
      const song = songs.filter((item) => item.id === parseInt(state.songID));

      songBlockElement.innerHTML = this.getDetails(song[0]);
      /*
        Ovdje je fazon, posto ne koristimo jquery vec cisti javascript
        funkcija getSongPageTemplate generise novi html,
        u sklopu tog html-a je i play button,
        al je fazon svaki put kad generises novi html na taj button trebas dodat event listener
        i zato ponovo pozovam addEventListenerOnPlayButton da dodas click event na taj button
        alternativa tome bi bila da koristimo jquery i .on('click'),
        u tom slucaju ne bi morali svaki put da dodajemo taj addEventListenerOnPlayButton
      */
      events.addEventListenerOnPlayButton(song[0]);
    }
    else {
      songBlockElement.innerHTML = this.getHomepage();
      /*
        ista stvar i ovdje, getHomepageTemplate vrati novi html sa onim linkovima
        i svaki put moramo ponovo da dodamo click evente na te linkove da bi radili bez reloada
      */
      events.addClickOnLink();
    }
  }

  getHomepage = () => {
    const template = Handlebars.compile(`
      <ul>
        <li><a href="/song-1" data-id="1">Song 1</a></li>
        <li><a href="/song-2" data-id="2">Song 2</a></li>
        <li><a href="/song-3" data-id="3">Song 3</a></li>
      </ul>
      `);
    return template();
  }
  
  getDetails = (song) => {
    const template = Handlebars.compile(`
      <div class="details-page">
        <img class="background-img" src="{{background}}" />
        <div class="details-content">
          <div>
            <img class="cover-img" src="{{albumCover}}" />
          </div>
          <div>
            <h4>Song: {{title}} </h4>
            <button id="play-button">Play</button>
          </div>
        </div>
      </div>
    `);
    return template(song);
  };

  getIconPause = () => {
    const iconPause = Handlebars.compile(`
      <i class="fas fa-pause"></i>
    `);
    return iconPause();
  }

  getIconPlay = () => {
    const iconPlay = Handlebars.compile(`
      <i class="fas fa-play"></i>
    `);
    return iconPlay();
  }

  updatePlayerControlsContent = (song) => {
    document.querySelector("#player").classList.add("visible");
    document.querySelector("#player-album-img").src = song.albumCover;
    document.querySelector("#play-song-name").innerHTML = 'Playing: ' + song.title;
  }
}
