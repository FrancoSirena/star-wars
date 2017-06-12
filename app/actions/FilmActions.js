import alt from '../alt';

class FilmActions {
  constructor() {
    this.generateActions (
      'getFilmByIDSuccess',
      'getFilmByIDFail'
    )
  }
  getFilmByID(id) {
    $.ajax({
      url: '/api/film/',
      data: {id: id},
      type: 'POST'
    }).then((data) => {
      this.getFilmByIDSuccess(data);
    }).fail((jqXhr) => {
      this.getFilmByIDFail(jqXhr);
    })
  }
}

export default alt.createActions(FilmActions);