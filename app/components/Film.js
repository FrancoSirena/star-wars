import React from 'react';
import FilmStore from '../stores/FilmStore';
import FilmActions from '../actions/FilmActions';
import {Accordion, Icon} from 'semantic-ui-react';

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
    let item = this.state.film.data;
    let charsList = this.state.film.characters.map((char, idx) =>{
      return (<p key={"c"+idx}>{char.name}  </p>);
    });
    let planetsList = this.state.film.planets.map((planet, idx) => {
        return (<p key={"p"+idx}>{planet.name} </p>);
    })
    return(
    <div key={item.episode_id} className="ui two column very relaxed grid" style={{height: '70%'}}>
      <div className="ui image column " style={{width: '30%'}}>
        <img src={"/imgs/film_cover_"+item.episode_id+".jpg"} />
      </div>
      <div className="ui column">
        <span className="header">{item.title}</span> <span className="date">{item.release_date}</span>
        <div className="description">
          {item.opening_crawl}
          <div className="ui two column very relaxed grid">
            <Accordion className="column">
              <Accordion.Title>
                <Icon name="users" />Chars
              </Accordion.Title>
              <Accordion.Content>
                  {charsList}
              </Accordion.Content>
            </Accordion>
            <Accordion className="column">
              <Accordion.Title>
                <Icon name="world" />Planets
              </Accordion.Title>
              <Accordion.Content>
                {planetsList}
              </Accordion.Content>                
            </Accordion>
          </div>
        </div>
      </div>
    </div>)
  }
}