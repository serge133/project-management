import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route} from 'react-router-dom';

// Pages
import App from './App';
import OpenProject from './OpenProject';


const routing = (
    <Router>
        <Route exact path = "/" component={App}/>
        <Route exact path = "/projects/:projectID" component={OpenProject}/>
    </Router>
);
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();