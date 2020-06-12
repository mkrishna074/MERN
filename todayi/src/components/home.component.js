import React from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux'

const Home = () => {

  //store
  const dispatch = useDispatch();
  const state = useSelector(state => state, shallowEqual);

   return(<div className="component-container">
      <h1>Home Page</h1>
{state.auth.isAuthenticated && <p>Hello {state.auth.username} {state.auth.responseMsg}</p>}
    </div>)
}


export default React.memo(Home);