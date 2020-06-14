import React, {useEffect, useState} from 'react';
import Carousel from 'react-images'

const Detail = React.forwardRef((props, ref) => {
  const  [error, setError] =  useState({});
  const  [details,setDetails]= useState({});
  const images = [{source: {regular: 'https://picsum.photos/200'}},
  {source: {regular: 'https://picsum.photos/200'}},
  {source: {regular: 'https://picsum.photos/200'}}];
  const highlights = ['one', 'two', 'three'];

  return (<><div ref = {ref} key={details.id} className="custom-card">
           <div className="detail-container detail-header">
      <div className="col-detail-card two">
            <p>{props.title}</p>
      </div>
      <div className="row-detail-card one">
      {highlights.map((item, index) => ( <span key={index} className="tag"> {item}</span>))}
      </div>
    </div>
            <div className="detail-container">
              <div className="col-detail-card one">
              <p>{props.title}</p>
              </div>
              <div className="col-detail-card two">
                {/* <Carousel views = {images}/> */}
              </div>
            </div>
          </div>
          <div className="component-container">{ error.response &&<p className="error-msg">{error.response}</p>}</div>
          </>);
})
      
export default React.memo(Detail);