import alt from '../alt';

class AppActions {
  constructor() {
    this.generateActions(
      'activateItem'
    );
  }
}

export default alt.createActions(AppActions);