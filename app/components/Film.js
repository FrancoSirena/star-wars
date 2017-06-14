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
    <div key={item.episode_id}>
        <div className="ui large image floatImage">
            <img src={"/imgs/film_cover_"+item.episode_id+".jpg"} />
        </div>
        <div className="content floatContent">
            <span className="header">{item.title}</span> <span className="date">{item.release_date}</span>
            <div className="description">
                {item.opening_crawl}
            </div>
            <div className="ui styled accordion">
              <div className="title">
                <i className="users icon"> </i>
                Characters
              </div>
              <div className="content">
                {this.state.characters.map((item) =>{
                  return (<p> {item.name} </p> );
                })}
              </div>
            </div>
        </div>
    </div>)
  }
}