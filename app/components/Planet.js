import React from 'react';
import PlanetActions from '../actions/PlanetActions';
import PlanetStore from '../stores/PlanetStore';
import {List} from 'semantic-ui-react';

export default class Planet extends React.Component {
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = PlanetStore.getState();
  }
  componentDidMount () {
    PlanetStore.listen(this.onChange);
  }
  componentWillUnmount () {
    PlanetStore.unlisten(this.onChange);
  }
  onChange(state) {
    this.setState(state);
  }
  onClick(planet) {
    PlanetActions.changeBackground(planet);
  }
  render () {
    let planet = this.props.planet;
    return (
      <List.Item onClick={this.onClick.bind(this, planet)} ref="planet" className="mLink" key={planet.name}>{planet.name} </List.Item>
    )
  }
}