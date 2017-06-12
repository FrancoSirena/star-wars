import React from 'react';
import {render} from 'react-dom';
import {IndexRoute,BrowserRouter as Router, Route, Link} from 'react-router-dom';

import FilmsList from './components/FilmsList';
import Film from './components/Film';

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
            <Route exact path="/" component={FilmsList}/>
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