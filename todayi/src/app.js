import React from 'react';
import './app.scss';
import {Router, Switch, Route} from 'react-router-dom'
import Events from './components/events.component'
import AddEvent from './components/addEvent.component'
import AddEventType from './components/addEventType.component'
import Home from './components/home.component'
import Login from './components/auth/login'
import Register from './components/auth/register'
import history from './helpers/history'
import ProtectedRoute from './helpers/protectedRoute'
import Header from './components/header.component'

function App() {
  return (
    <Router history={history}>
    <div className="App">
      <div className="push">
        <div className="head">
          <Header/>
        </div>
      </div>
      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/learned" exact component={Events} />
          <Route path="/partners" exact component={Home} />
          <Route path="/price" exact component={Home} />
          <Route path="/contacts" exact component={Events} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <ProtectedRoute path="/addevent" exact component={AddEvent} />
          <ProtectedRoute path="/addtype" exact component={AddEventType} />
        </Switch>
    </div>
    </Router>
  );
}

export default App;
