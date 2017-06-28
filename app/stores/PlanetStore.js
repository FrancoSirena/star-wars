import alt from '../alt';
import PlanetActions from '../actions/PlanetActions';

class PlanetStore {
  constructor() {
    this.bindActions(PlanetActions);
    this.planet = {};
    this.backgroundColor = "";
    this.backgroundColorGradient = "";
  }
  onChangeBackground(planet) {
    this.planet = planet;
    if  (planet.climate.toLowerCase().indexOf('arid') > -1){
      this.backgroundColor = '#e8713a';
      this.backgroundColorGradient = '#84310a';
    } else if (planet.climate.toLowerCase().indexOf('temperate') > -1){
      this.backgroundColor = '#4cb203';
      this.backgroundColorGradient = "#214209";
    } else{
      this.backgroundColor = '#c7d3ea';
      this.backgroundColorGradient = 'darkblue';
    }
  }
  onChangeBackgroundToDefault() {
    this.backgroundColor = '#c7d3ea';
    this.backgroundColorGradient = 'darkblue';
  }

}

export default alt.createStore(PlanetStore);