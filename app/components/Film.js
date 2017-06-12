import React from 'react';
import FilmStore from '../stores/FilmStore';
import FilmActions from '../actions/FilmActions';

export default class Film extends React.Component {
  constructor(props) {
    super(props);
    this.state = FilmStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    FilmStore.listen(this.onChange);
    FilmActions.getFilmByID(this.props.match.params.id);
  }
  componentWillUnmount() {
    FilmStore.unlisten(this.onChage);
  }
  onChange(state) {
    this.setState(state);
  }
  render() {
    let item = this.state.film;
    return(
    <div key={item.episode_id} className="ui card">
        <div className="image">
            <img src={"/imgs/film_cover_"+item.episode_id+".jpg"} />
        </div>
        <div className="content">
            <a className="header" href={'/films/'+item.episode_id}>{item.title}</a>
            <div className="meta">
                <span className="date">{item.release_date}</span>
            </div>
            <div className="description">
                {item.opening_crawl}
            </div>
        </div>
    </div>)
  }
}