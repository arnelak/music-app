class RadioClass {
  constructor() {
    this.getStations();
  }

  getStations = () => {
    fetch('http://api.dirble.com/v2/stations?token=b05161d75740fe06b19e2d5eac')
    .then((res) => res.json())
    .then((res) => console.log('result', res))
    .catch((err) => console.log('err'));
  }
}
