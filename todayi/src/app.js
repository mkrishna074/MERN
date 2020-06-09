import React, {useState} from 'react';
import './app.scss';
import Nav from './components/nav.component'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Events from './components/events.component'
import AddEvent from './components/addEvent.component'
import AddEventType from './components/addEventType.component'
import Login from './components/auth/login'
import Register from './components/auth/register'
import {AuthContext} from './components/auth/auth'
import ProtectedRoute from './components/auth/protectedRoute'

function App() {

  const existingToken = JSON.parse(localStorage.getItem("token"));
  const [authTokens, setAuthTokens] = useState(existingToken);
  
  const setTokens = (data) => {
    localStorage.setItem("token", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
    <Router>
    <div className="App">
      <Nav/>
      <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/works" exact component={Events} />
          <Route path="/partners" exact component={AddEvent} />
          <ProtectedRoute path="/price" exact component={AddEventType} />
          <Route path="/contacts" exact component={Events} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact render={props => <Register {...props}/>} />
        </Switch>
    </div>
    </Router>
    </AuthContext.Provider>
  );
}


const HomePage = () => (
  <div>
    <h1>Home Page</h1>
  </div>
)

export default App;
