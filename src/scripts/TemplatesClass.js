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

      if(state && state.url && state.url === "/login") {
        songBlockElement.innerHTML = this.getLoginPage();
      }
      else if(state && state.url && state.url === "/register") {
        songBlockElement.innerHTML = this.getRegisterPage();
      }
      else {
        songBlockElement.innerHTML = this.getHomepage();
      }
      /*
        ista stvar i ovdje, getHomepageTemplate vrati novi html sa onim linkovima
        i svaki put moramo ponovo da dodamo click evente na te linkove da bi radili bez reloada
      */
      //events.addClickOnLink();
    }
  }

  getHomepage = () => {
    const template = Handlebars.compile(`
      <ul>
        <li><a href="/song-1" data-id="1">Song 1</a></li>
        <li><a href="/song-2" data-id="2">Song 2</a></li>
        <li><a href="/song-3" data-id="3">Song 3</a></li>
        <li><a href="/song-4" data-id="4">Bonobo-Eyesdown</a></li>
        <li><a href="/song-5" data-id="5">Burial-Near Dark</a></li>
        <li><a href="/song-6" data-id="6">ZHU-Want U</a></li>
        <li><a href="/song-7" data-id="7">Ariana Grande-7 Rings</a></li>
      </ul>
      `);
    return template();
  }

  getDetails = (song) => {
    const template = Handlebars.compile(`
      <div class="details-page">

        <div class="details-content">
          <div>
            <img class="cover-img" src="{{albumCover}}" />
          </div>
          <div>
            <h4>Song: {{artist}} - {{title}} </h4>
            <button id="play-button">Play</button>
          </div>
        </div>
      </div>
    `);
    return template(song);
  };

  getLoginPage = () => {
    const template = Handlebars.compile(`
      <div class="login-page">
        <form id="login-form">
          <input id="login-email" type="email" placeholder="Email" />
          <input id="login-password" type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </div>
    `);
    return template();
  };

  getRegisterPage = () => {
    const template = Handlebars.compile(`
      <div class="register-page">
        <form id="register-form">
          <input id="register-email" type="email" placeholder="Email" />
          <input id="register-password" type="password" placeholder="Password" />
          <input id="register-confirm-password" type="password" placeholder="Confirm Password" />
          <button type="submit">Register</button>
        </form>
      </div>
    `);
    return template();
  };

  getIconPause = () => {
    const iconPause = Handlebars.compile(`
      <i class="fas fa-pause-circle"></i>
    `);
    return iconPause();
  }

  getIconPlay = () => {
    const iconPlay = Handlebars.compile(`
      <i class="fas fa-play-circle"></i>
    `);
    return iconPlay();
  }

  updatePlayerControlsContent = (song) => {
    document.querySelector("#player").classList.add("visible");
    document.querySelector("#player-album-img").src = song.albumCover;
    document.querySelector("#play-song-name").innerHTML = 'Playing: ' + song.title;
  }
}
