import React from 'react';
import './app.scss';
import Nav from './components/nav.component'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Events from './components/events.component'
import { Provider } from 'react-redux'
import store from './store/store'

function App() {
  return (

    <Provider store={ store }>
    <Router>
    <div className="App">
      <Nav/>
      <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/works" exact component={Events} />
          <Route path="/partners" exact component={Events} />
          <Route path="/price" exact component={Events} />
          <Route path="/contacts" exact component={Events} />
        </Switch>
    </div>
    </Router>
    </Provider>
  );
}


const HomePage = () => (
  <div>
    <h1>Home Page</h1>
  </div>
)

export default App;
