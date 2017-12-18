import React from 'react';
import ReactDOM from 'react-dom';
import { Route,Router,hashHistory,browserHistory} from 'react-router';
import './index.css';
import '../node_modules/leaflet/dist/leaflet.css'
import App from './App';
import Sinomap from './sinomap'
import FlipMoveDemo from './FlipMoveDemo';

var routes=()=>(
    <Router history={browserHistory}>
        <Route path='/' component={Sinomap}/>
        <Route path='/map' component={App}/>
        <Route path='/move' component={FlipMoveDemo} />
    </Router>
)
ReactDOM.render(routes(), document.getElementById('root'));
