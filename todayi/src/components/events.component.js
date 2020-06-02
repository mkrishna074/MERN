import React, {useEffect} from 'react';
import {useHttp} from '../hooks/useHttp'
import Detail from './detail.component'

const Events = props => {
    let [isLoading, fetchedData] = useHttp(
        'https://jsonplaceholder.typicode.com/posts',
        []
      );

      useEffect(() => {
        return () => {
          console.log('component did unmount');
        };
      }, []);
      let content = <p>Loading data...</p>;

      if (!isLoading && fetchedData) {
        fetchedData = fetchedData.slice(0, 2).map(i => i);
        content = (
            <div className="customContainer"> 
            {fetchedData.map(i => <Detail key = {i.id} id = {i.id}/>)}
            </div>
        );
      } else if (!isLoading && !fetchedData) {
        content = <p>Failed to fetch data.</p>;
      }
      return content;
}


export default React.memo(Events);