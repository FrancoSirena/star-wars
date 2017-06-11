import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore{
    constructor() {
        this.bindActions(HomeActions);
        this.films = [];
        this.isLoading = true;
    }
    onGetAllFilmsSuccess(data) {
        this.films = data;
        this.isLoading = false;

    }
    onGetAllFilmsFail(jqXhr) {
        toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }

}

export default alt.createStore(HomeStore);