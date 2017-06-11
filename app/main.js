import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Home from './components/Home';

class App extends React.Component { 

  render () {
    return (  
    <Router>
      <div>
        <div className="ui pointing menu">
            <Link to="/Films" className="item"> <i className="small film icon"></i> Films </Link>
            <Link to="/Planets" className="item"> <i className="small world icon"></i> Planets </Link>
        </div>
        <div className="body">
            <img src="/imgs/cover.jpg" />
            <Route path="/" component={Home}/>
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