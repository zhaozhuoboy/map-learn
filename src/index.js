import React from 'react';
import ReactDOM from 'react-dom';
import { Route,Router,hashHistory} from 'react-router';
import './index.css';
import '../node_modules/leaflet/dist/leaflet.css'
import App from './App';
import Sinomap from './sinomap'


var routes=()=>(
    <Router history={hashHistory}>
        <Route path='/' component={Sinomap}/>
        <Route path='/map' component={App}/>
    </Router>
)
ReactDOM.render(routes(), document.getElementById('root'));
