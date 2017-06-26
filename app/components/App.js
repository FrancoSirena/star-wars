import React from 'react';
import {render} from 'react-dom';
import {IndexRoute,BrowserRouter as Router, Route, Link} from 'react-router-dom';

import {Segment, Dimmer, Loader} from 'semantic-ui-react';

import FilmsList from './FilmsList';
import Film from './Film';
import FilmsListStore from '../stores/FilmsListStore';
import FilmStore from '../stores/FilmStore';

import {Menu} from 'semantic-ui-react';

import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';

export default class App extends React.Component { 
  constructor(props) {
    super(props);
    this.state = AppStore.getState();
    this.onChange = this.onChange.bind(this);
    this.onLoading = this.onLoading.bind(this);
  }
  componentDidMount() {
    AppStore.listen(this.onChange);
    FilmsListStore.listen(this.onLoading);
    FilmStore.listen(this.onLoading);
  }
  componentWillUnmount() {
    AppStore.unlisten(this.onChange);
    FilmsListStore.unlisten(this.onLoading);
    FilmStore.unlisten(this.onLoading);
  }
  onLoading(state) {
    this.setState({isLoading: state.isLoading});
  }
  onChange(state) {
    this.setState(state);
  }
  handleItemClick (e, {name}) {
    AppActions.activateItem(name);
  }
  render () {
    return (  
    <Router>
      <div>
        <Menu >
            <Menu.Item name='films'
                        active={this.state.activeItem === 'films'}
                        as={Link}
                        to="/films"
                        onClick={this.handleItemClick.bind(this)}>
              <i className="small film icon"></i> Films
            </Menu.Item>
            
            <Menu.Item name='planets'
                        active={this.state.activeItem === 'planets'}
                        as={Link}
                        to="/planets"
                        onClick={this.handleItemClick.bind(this)}> <i className="small world icon"></i> Planets</Menu.Item>
        </Menu>
        <div className="body">
            <Route exact path="/" component={FilmsList}/>
            <Route exact path="/Films" component={FilmsList}/>
            <Route path="/films/:id" component={Film} />
            <Segment disabled={!this.state.isLoading}> 
              <Dimmer active inverted>
                <Loader style={{position: 'fixed', left: "50%", top: "50%"}} disabled={!this.state.isLoading} size="medium" >Loading</Loader>
              </Dimmer>
            </Segment>
        </div>
        <footer>
            Franco Sirena
        </footer>
      </div>
    </Router>   
    )
  }
}