import React from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux'
import Carousel from '../components/controls/carousel.component' 

const Home = () => {

  const images = [];
  //store
  const dispatch = useDispatch();
  const state = useSelector(state => state, shallowEqual);

   return(<><div className="component-container clear">
      {state.auth.isAuthenticated && <p>Hello {state.auth.username} {state.auth.responseMsg}</p>}
      < Carousel imgUrls={images}/>
    </div></>)
}


export default React.memo(Home);