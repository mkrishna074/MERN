import React, {useEffect} from 'react';
import {useHttp} from '../hooks/useHttp'
import Slider from './controls/slider.control'
import horizontalCss from './controls/controls.scss'

const Detail = props => {
    let [isLoading, fetchedData] = useHttp(
        'https://jsonplaceholder.typicode.com/posts/'+ props.id,
        [props.id]
      );

      useEffect(() => {
        return () => {
          console.log('component did unmount');
        };
      }, []);
      let content = <p>Loading data...</p>;

      if (!isLoading && fetchedData) {
        const images = ['https://picsum.photos/200/200', 
        'https://picsum.photos/200/200', 'https://picsum.photos/200/200'];
        const highlights = ['one', 'two', 'three'];
        const i = {...fetchedData, images, highlights};
        content = (
            <div key={i.id} className="customCard">
            <div className="detailContainer">
              <div className="colDetailCard one">
              <p>{i.body}</p>
              </div>
              <div className="colDetailCard two">
              <Slider classNames={horizontalCss}>
              {i.images.map((item, index) => (
                  <div
                    key={index}
                    style={{ background: `url('${item}') no-repeat center center` }}>
                  </div>
                  ))}
              </Slider>
              </div>
            </div>
            <div className="detailContainer">
              <div className="rowDetailCard one">
              {i.highlights.map((item, index) => ( <button key={index} type="button" className="btn btn-primary" disabled> {item}</button>))}
              </div>
              <div className="colDetailCard two">
              <div className="card">
                  <div className="card-header">
                    Featured
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>);
      } else if (!isLoading && !fetchedData) {
        content = <p>Failed to fetch data.</p>;
      }
      return content;
}
      
export default React.memo(Detail);