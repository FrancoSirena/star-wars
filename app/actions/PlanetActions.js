import alt from '../alt';

class PlanetActions {
  constructor() {
    this.generateActions('changeBackground', 'changeBackgroundToDefault');
  }
}

export default alt.createActions(PlanetActions);