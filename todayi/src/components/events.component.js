import React, {useEffect, useState, useRef, useCallback} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux'
import Detail from './detail.component'
import {withRouter} from 'react-router-dom'
import {setPageNumber} from '../store/actions/eventActions'

const Events = props => {
  const state = useSelector(state => state, shallowEqual);
  const dispatch = useDispatch();
  const observer = useRef();
  const lastEvent = (node) => {
    console.log(node);
    if(state.event.loading) return
    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(e =>{
      console.log(state.event.hasMore);
      if(e[0].isIntersecting && state.event.hasMore){
        console.log('inside if');
        dispatch(setPageNumber())
      }
    });
    if(node) observer.current.observe(node);
    console.log(node);
  }
  return (<>
    <div className="custom-container clear"> 
    {state.event.events.map((i, idx) => {
      return <Detail {...state.event.events.length === idx +1 ? {ref:lastEvent}:null} key = {i} title = {i}>{i}</Detail>
  })}
    </div>
    <div className="component-container">{ state.event?.loading &&<p>Loading...</p>}</div>
    <div className="component-container">{ state.event?.isError &&<p className="error-msg">{}</p>}</div>
     </>
  )
}


export default React.memo(withRouter(Events));