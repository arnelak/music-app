class TemplatesClass {
  constructor() {
    const contentBlock = document.querySelector("#song-block");
    const page = this.getHomepage();

    contentBlock.innerHTML = page;
  }

  renderTemplate = (state, songBlockElement) => {
    if(state && state.songID) {
      const song = songs.filter((item) => item.id === parseInt(state.songID));

      songBlockElement.innerHTML = this.getDetailsPage(song[0]);
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
      ${this.renderAlbums()}
      ${this.renderSongsList()}
      `);
    return template();
  }

  renderAlbums = () => {
    const template = Handlebars.compile(`
      <h3>Recomended Albums</h3>
      <div class="albumsList">
        <div>
          ${
          albums.map((item) => {
            return (
                  `
                    <a href="/albums/${item.id}">
                      <img class="blockImage" src="${item.albumCover}" >
                      <h5>${item.title}</h5>
                      <p>12 Songs</p>
                    </a>  
                  `
              )
            }).join('')
          }
        </div>
        </div>
      `);
    return template();
  };

  renderSongsList = () => {
    const template = Handlebars.compile(`
      <ul class="songs-play-list">
        ${ songs.map((item) => {
          return this.renderSingleSong(item);
        }).join('') }
      </ul>
    `);
    return template();
  };

  renderSingleSong = (song) => {
    const template = Handlebars.compile(`
      <li>
        <img class="listImg" src="{{albumCover}}" >
        <a href="/song-{{id}}" data-id="{{id}}">{{title}}</a>
        <div>
          <i class="fas fa-caret-right list-play-button" data-id="{{id}}"></i>
          <i class="fas fa-heart"></i>
        </div>
      </li>
    `);
    return template(song);
  }

  getDetailsPage = (song) => {
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
