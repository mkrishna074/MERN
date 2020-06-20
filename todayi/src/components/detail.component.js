import React, {useState} from 'react';
import Carousel from './controls/carousel.component' 

const Detail = React.forwardRef((props, ref) => {
  const  [details,setDetails]= useState({});
  const highlights = ['one', 'two', 'three'];
  const images = ['/IMG_2432.JPG'];

  return (<> <details open = {props.idx === 0} ref = {ref}>
          <summary className="one">
            <div className="one-one"><h4>{props.event.title}</h4></div>
            <div  className="one-two">{props.event.highlights.map((item, index) => <span key={index} className="tag"> #{item}</span>)}</div>
          </summary>
          <div className="two">
            <Carousel imgUrls={images}></Carousel>
          </div>
          <div className="three">test
          </div>
          </details></>);
})
      
export default React.memo(Detail);