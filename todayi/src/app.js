import React from 'react';
import './app.scss';
import Nav from './components/nav.component'
import {Router, Switch, Route} from 'react-router-dom'
import Events from './components/events.component'
import AddEvent from './components/addEvent.component'
import AddEventType from './components/addEventType.component'
import Home from './components/home.component'
import Login from './components/auth/login'
import Register from './components/auth/register'
import history from './components/auth/history'
import ProtectedRoute from './components/auth/protectedRoute'

function App() {
  return (
    <Router history={history}>
    <div className="App">
      <Nav/>
      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/works" exact component={Events} />
          <ProtectedRoute path="/partners" exact component={AddEvent} />
          <ProtectedRoute path="/price" exact component={AddEventType} />
          <Route path="/contacts" exact component={Events} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </Switch>
    </div>
    </Router>
  );
}

export default App;
