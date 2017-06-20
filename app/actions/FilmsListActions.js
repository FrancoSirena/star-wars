import alt from '../alt';

class FilmsListActions {
    constructor() {
        this.generateActions(
            'getAllFilmsSuccess',
            'getAllFilmsFail',
            'load'
        );
    }
    getAllFilms() {
        $.ajax({
            url:'/api/films'
        }).then((data) => {
            this.getAllFilmsSuccess(data);
        }).fail((jqXhr) => {
            this.getAllFilmsFail(jqXhr);
        })
    }
}

export default alt.createActions(FilmsListActions);