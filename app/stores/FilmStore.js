import alt from '../alt';
import FilmActions from '../actions/FilmActions';

class FilmStore {
  constructor() {
    this.bindActions(FilmActions);
    this.film = {data: {}, characters: [], planets: []};
  }
  onGetFilmByIDSuccess(data) {
    this.film = data;
  }
  onGetFilmByIDFail(jqXhr) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }
}

export default alt.createStore(FilmStore);