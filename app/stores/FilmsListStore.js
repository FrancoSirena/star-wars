import alt from '../alt';
import FilmsListActions from '../actions/FilmsListActions';

class FilmsListStore{
    constructor() {
        this.bindActions(FilmsListActions);
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

export default alt.createStore(FilmsListStore);