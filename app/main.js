import React from 'react';
import {render} from 'react-dom';
import {IndexRoute,BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Menu} from 'semantic-ui-react';
import App from './components/App';
render(
    <App />,
    document.getElementById('app')
)