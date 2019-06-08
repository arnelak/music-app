class TemplatesClass {
  constructor() {
    const contentBlock = document.querySelector("#page-block");
    const page = this.getHomepage();

    contentBlock.innerHTML = page;
  }

  renderTemplate = (state, songBlockElement) => {
    console.log("URL", state);
    if(state && state.url && state.url === "/login") {
      songBlockElement.innerHTML = this.getLoginPage();
    }
    else if(state && state.url && state.url === "/register") {
      songBlockElement.innerHTML = this.getRegisterPage();
    }
    else if(state && state.url && state.url.includes('/albums') === true) {
      /*
      znaci imamo ovaj uslov, posto smo proslijedili onaj state objekat koji u sebi i ma ID i url
      i posto mozemo imat url=/songs/3 url=/genres/5 url=/albums/7
      koristimo metodu na stringu .includes('/nekistring'), a includes vraca true ili false ako string sadrzi to
      i naravno ako url sadrzi /albums, onda ocigledno hocemo da prikazemo albums details page
      getAlbumsPage metoda
      */
      songBlockElement.innerHTML = this.getAlbumsPage(state.ID);
    }
    else if(state && state.url && state.url.includes('/song') === true) {
      const song = songs.filter((item) => item.id === parseInt(state.ID));
      songBlockElement.innerHTML = this.getDetailsPage(song[0]);
        events.addEventListenerOnPlayButton(song[0]);
    }
    else {
      songBlockElement.innerHTML = this.getHomepage();
    }
  }

  getHomepage = () => {
    const template = Handlebars.compile(`
      ${this.renderAlbums()}
      ${this.renderSongsList()}
      `);
    return template();
  }

  getAlbumsPage = (id) => {
    const template = Handlebars.compile(`
      album
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
                    <a href="/albums/${item.id}" data-id="${item.id}" class="albums-wrapper-block">
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
          <i class="fas flaticon-multimedia-1 list-play-button" data-id="{{id}}"></i>
          <i class="flaticon-heart"></i>
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
