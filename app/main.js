import React from 'react';
import {render} from 'react-dom';
import {IndexRoute,BrowserRouter as Router, Route, Link} from 'react-router-dom';

import FilmsList from './components/FilmsList';
import Film from './components/Film';

import {Menu} from 'semantic-ui-react';

class App extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      activeItem: {}
    } ;
  }
  handleItemClick (e, {name}) {
    this.setState({activeItem:name});
  }
  render () {
    return (  
    <Router>
      <div>
        <Menu>
            <Menu.Item name='films'
                        active={this.state.activeItem === 'films'}
                        onClick={this.handleItemClick.bind(this)}> <i className="small film icon"></i> Films</Menu.Item>
            <Menu.Item name='planets'
                        active={this.state.activeItem === 'planets'}
                        onClick={this.handleItemClick.bind(this)}> <i className="small world icon"></i> Planets</Menu.Item>
        </Menu>
        <div className="body">
            <Route exact path="/" component={FilmsList}/>
            <Route exact path="/Films" component={FilmsList}/>
            <Route path="/films/:id" component={Film} />
        </div>
      </div>
    </Router>   
    )
  }
}

render(
    <App />,
    document.getElementById('app')
)