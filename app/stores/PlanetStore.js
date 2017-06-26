import alt from '../alt';
import PlanetActions from '../actions/PlanetActions';

class PlanetStore {
  constructor() {
    this.bindActions(PlanetActions);
    this.planet = {};
  }
}

export default alt.createStore(PlanetStore);