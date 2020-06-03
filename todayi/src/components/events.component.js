import React, {useEffect, useState} from 'react';
import Detail from './detail.component'

const Events = props => {
  const  [error, setError] =  useState({});
  const  [events,setEvents]= useState([]);

  useEffect(() => {
    async function getData() {
      try{
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const json1 = await res.json();
      setEvents(json1.slice(0, 10));
        } catch (e) {
          setError(e);
      }
    }
    getData()
  }, [])

  return (
    <div className="customContainer"> 
    {events.map(i => <Detail key = {i.id} id = {i.id}/>)}
    </div>
  )
}


export default React.memo(Events);