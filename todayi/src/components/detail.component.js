import React from 'react';
import Carousel from './controls/carousel.component'

const Detail = React.forwardRef((props, ref) => {

  return (<> <details open = {props.idx === 0} ref = {ref}>
          <summary className="one">
            <div className="one-one"><h4>{props.event.title}</h4></div>
            <div  className="one-two">{props.event.tags.map((item, index) => <span key={index} className="tag"> #{item}</span>)}</div>
          </summary>
          <div className="two">
            <Carousel imgUrls={props.event.media.map(i => 'http://localhost:5000/api/todayi/getFile?filename=' + i)}></Carousel>
          </div>
          <div className="three">test
          </div>
          </details></>);
})
      
export default React.memo(Detail);