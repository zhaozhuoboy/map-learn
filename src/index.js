import React from 'react';
import ReactDOM from 'react-dom';
import { Route,Router,browserHistory} from 'react-router';
import './index.css';
import '../node_modules/leaflet/dist/leaflet.css'
import App from './App';

var routes=()=>(
    <Router history={browserHistory}>
        <Route path='/' component={App}/>
    </Router>
)
ReactDOM.render(routes(), document.getElementById('root'));
