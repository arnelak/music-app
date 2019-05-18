class SongClass {
  song = null;
  constructor(song) {
    if(song) {
      this.song = song;
    }
  }

  setSong = (song) => {
    this.song = song;
  }

  getCurrentSong = () => {
    return this.song;
  }
}
