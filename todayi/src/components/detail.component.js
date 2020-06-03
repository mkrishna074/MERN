import React, {useEffect, useState} from 'react';
import Slider from './controls/slider.control'
import horizontalCss from './controls/controls.scss'

const Detail = props => {
  const  [error, setError] =  useState({});
  const  [details,setDetails]= useState({});
  const images = ['https://picsum.photos/200/200', 
  'https://picsum.photos/200/200', 'https://picsum.photos/200/200'];
  const highlights = ['one', 'two', 'three'];

  useEffect(() => {
    async function getData(){
      try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts/"+ props.id);
      const json1 = await res.json();
      console.log(json1);
      setDetails(json1)
      } catch (e) {
        setError(e);
      }
    }
    getData()
  }, [props.id]);
  return (<div key={details.id} className="customCard">
           <div className="detailContainer detailHeader">
      <div className="colDetailCard two">
            <h4>{details.title}</h4>
      </div>
      <div className="rowDetailCard one">
      {highlights.map((item, index) => ( <button key={index} type="button" className="btn btn-warning btn-sm" disabled> {item}</button>))}
      </div>
    </div>
            <div className="detailContainer">
              <div className="colDetailCard one">
              <p>{details.body}</p>
              <p>{details.body}</p>
              <p>{details.body}</p>
              <p>{details.body}</p>
              <p>{details.body}</p>
              </div>
              <div className="colDetailCard two">
              <Slider classNames={horizontalCss}>
              {images.map((item, index) => (
                  <div
                    key={index}
                    style={{ background: `url('${item}') no-repeat center center` }}>
                  </div>
                  ))}
              </Slider>
              </div>
            </div>
          </div>);
}
      
export default React.memo(Detail);