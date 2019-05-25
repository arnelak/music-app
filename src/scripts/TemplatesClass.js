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
      <h3>Recomended Albums</h3>
      <div id="songList">
        <div>
          <img class="blockImage" src="https://freight.cargo.site/t/original/i/c842d1eb353838ef10c6b5f11fa27e47549604a59ec9f180791d0431b3ea209c/02_BONOBO-FIRST-FIRES-single.jpg" >
          <h5>Bonobo</h5>
          <p>12 Songs</p>
        </div>
        <div>
          <img class="blockImage" src="https://img.discogs.com/7s2dUoQwO_QIorLghKxn56IYObk=/fit-in/600x594/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-689255-1322218106.jpeg.jpg">
          <h5>Burial</h5>
          <p>5 Songs</p>
        </div>
        <div>
          <img class="blockImage" src="http://is5.mzstatic.com/image/thumb/Music18/v4/24/2e/d3/242ed380-9dde-4ea7-eb57-185971e3b0dd/source/100000x100000-999.jpg" >
          <h5>Zhu</h5>
          <p>8 Songs</p>
        </div>
        <div>
          <img class="blockImage" src="https://lamaster.es/wp-content/uploads/2019/02/ariana-grande-thank-you-next-cover.jpg" >
          <h5>Ariana Grande</h5>
          <p>10 Songs</p>
        </div>
      </div>
      ${this.renderSongsList()}
      `);
    return template();
  }

  renderSongsList = () => {
    const template = Handlebars.compile(`
      <ul>
        <li>
          <i class="fas fa-caret-right"></i>
          <img class="listImg" src="https://f4.bcbits.com/img/a2150662318_10.jpg" >
          <a href="/song-1" data-id="1">Song 1</a>
          <i class="fas fa-heart"></i>
        </li>
        <li>
          <i class="fas fa-caret-right"></i>
          <img class="listImg" src="http://static.stereogum.com/blogs.dir/2/files/img/enjoyed/enjoyed_cover_print.jpg" >
          <a href="/song-2" data-id="2">Song 2</a>
          <i class="fas fa-heart"></i>
        </li>
        <li>
          <i class="fas fa-caret-right"></i>
          <img class="listImg" src="http://static.stereogum.com/blogs.dir/2/files/img/enjoyed/enjoyed_cover_print.jpg" >
          <a href="/song-3" data-id="3">Song 3</a>
          <i class="fas fa-heart"></i>
        </li>
        <li>
          <i id="pauseList" class="fas fa-pause">
          </i><img class="listImg" src="https://freight.cargo.site/t/original/i/c842d1eb353838ef10c6b5f11fa27e47549604a59ec9f180791d0431b3ea209c/02_BONOBO-FIRST-FIRES-single.jpg" >
          <a href="/song-4" data-id="4">Bonobo-Eyesdown</a>
          <i class="fas fa-heart"></i>
        </li>
        <li>
          <i class="fas fa-caret-right"></i>
          <img class="listImg" src="https://f4.bcbits.com/img/a2150662318_10.jpg" >
          <a href="/song-5" data-id="5">Burial-Near Dark</a>
          <i class="fas fa-heart"></i>
        </li>
        <li>
          <i class="fas fa-caret-right"></i>
          <img class="listImg" src="https://img.discogs.com/7s2dUoQwO_QIorLghKxn56IYObk=/fit-in/600x594/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-689255-1322218106.jpeg.jpg" >
          <a href="/song-6" data-id="6">ZHU-Want U</a>
          <i class="fas fa-heart"></i>
        </li>
        <li>
          <i class="fas fa-caret-right"></i>
          <img class="listImg" src="http://is5.mzstatic.com/image/thumb/Music18/v4/24/2e/d3/242ed380-9dde-4ea7-eb57-185971e3b0dd/source/100000x100000-999.jpg" >
          <a href="/song-7" data-id="7">Ariana Grande-7 Rings</a>
          <i class="fas fa-heart"></i>
        </li>
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
