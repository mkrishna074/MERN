import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux'
import Detail from './detail.component'
import {withRouter} from 'react-router-dom'
import {setPageNumber, setEvents} from '../store/actions/eventActions'
import { useLocation } from 'react-router-dom'
import useSearch from '../hooks/useSearch'

const Events = props => {
  let location = useLocation();
  const [pageNumber, setPagenumber] = useState(1);
  const state = useSelector(state => state, shallowEqual);
  const dispatch = useDispatch();
  const observer = useRef();
  const lastEvent = (node) => {
    //console.log(node);
    if(state.event.loading) return
    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(e =>{
      if(e[0].isIntersecting && state.event.hasMore){
        dispatch(setPageNumber())
      }
    });
    if(node) observer.current.observe(node);
  }
  const {isLoading, events, hasMore} = useSearch(location.pathname.replace(/\//g, ''), pageNumber);

  useEffect(() => {
    dispatch(setEvents(events, isLoading, hasMore))
  }, [events, dispatch, isLoading, hasMore])
  return (<>
  {state.event.events.slice(0, 10).map((i, idx) => {
        return(<div key = {i._id}>
            <Detail {...state.event.events.length === idx + 1 && state.event?.events?.length > 5 ? {ref:lastEvent}:null} idx = {i._id} event = {i}></Detail>
        </div>)
  })}
    <div className="component-container">{ state.event?.loading &&<p>Loading...</p>}</div>
    <div className="component-container">{ state.event?.isError &&<p className="error-msg">{}</p>}</div>
     </>
  )
}


export default React.memo(withRouter(Events));