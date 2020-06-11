import React, {useEffect, useState} from 'react';
import Slider from './controls/slider.control'
import horizontalCss from './controls/controls.scss'

const Detail = props => {
  const  [error, setError] =  useState({});
  const  [details,setDetails]= useState({});
  const images = [];
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
  return (<><div key={details.id} className="custom-card">
           <div className="detail-container detail-header">
      <div className="col-detail-card two">
            <p>{details.title}</p>
      </div>
      <div className="row-detail-card one">
      {highlights.map((item, index) => ( <span key={index} className="tag"> {item}</span>))}
      </div>
    </div>
            <div className="detail-container">
              <div className="col-detail-card one">
              <p>{details.body}</p>
              <p>{details.body}</p>
              <p>{details.body}</p>
              <p>{details.body}</p>
              <p>{details.body}</p>
              </div>
              <div className="col-detail-card two">
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
          </div>
          <div className="component-container">{ error.response &&<p className="error-msg">{error.response}</p>}</div>
          </>);
}
      
export default React.memo(Detail);