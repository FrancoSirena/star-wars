import React from 'react';
import FilmStore from '../stores/FilmStore';
import FilmActions from '../actions/FilmActions';
import {Accordion, Icon, List} from 'semantic-ui-react';
import Planet from './Planet';
import {Link} from 'react-router-dom';

export default class Film extends React.Component {
  constructor(props) {
    super(props);
    this.state = FilmStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    FilmStore.listen(this.onChange);
    FilmActions.load(true);
    FilmActions.getFilmByID(this.props.match.params.id);
  }
  componentWillUnmount() {
    FilmStore.unlisten(this.onChage);
  }
  onChange(state) {
    if (this.refs.myDivRef)
      this.setState(state); 
  }
  onClickPlanet
  render() {
    let item = this.state.film.data;
    let charsList = this.state.film.characters.map((char, idx) =>{
      let arr = char.url.split('/');
      let index = arr.length;
      return (<List.Item as={Link} to={"/Characters/"+arr[index-2]} key={"c"+idx}>{char.name}  </List.Item>);
    });
    let planetsList = this.state.film.planets.map((planet, idx) => {
      return (<Planet key={"p"+idx} planet={planet}> </Planet>  );
    })
    return(
    <div ref="myDivRef" key={item.episode_id} className="ui two column very relaxed grid" style={{height: '70%'}}>
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
                <List>
                  {charsList}
                </List>
              </Accordion.Content>
            </Accordion>
            <Accordion className="column">
              <Accordion.Title>
                <Icon name="world" />Planets
              </Accordion.Title>
              <Accordion.Content>
                <List>
                  {planetsList}
                </List>
              </Accordion.Content>                
            </Accordion>
          </div>
        </div>
      </div>
    </div>)
  }
}