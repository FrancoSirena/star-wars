import alt from '../alt';
import AppActions from '../actions/AppActions';

class AppStore {
  constructor() {
    this.bindActions(AppActions);
    this.activeItem = '';
    this.isLoading = true;
  }

  OnActivateItem(item) {
    this.activeItem = item;
  }

}

export default alt.createStore(AppStore);