function secondsToMins (secondsInput) {
    var sec_num = parseInt(secondsInput, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes+':'+seconds;
}

function getSongObjectByID (id) {
  const song = songs.find((item) => item.id === id);
  return song;
}

function getAlbumObjectByID (id) {
    id = parseInt(id);
    const album = albums.find((item) => item.id === id);
    return album;
}

function getSongsFromAlbumByID (id) {
    id = parseInt(id);
    const songsFromAlbum = songs.filter((item) => item.albumID === id);
    return songsFromAlbum;
}

