import alt from '../alt';

class HomeActions {
    constructor() {
        this.generateActions(
            'getAllFilmsSuccess',
            'getAllFilmsFail'
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

export default alt.createActions(HomeActions);