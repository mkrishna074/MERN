import React, {useEffect, useState} from 'react';
import Carousel from './controls/carousel.component' 

const Detail = React.forwardRef((props, ref) => {
  const  [error, setError] =  useState({});
  const  [details,setDetails]= useState({});
  const highlights = ['one', 'two', 'three'];
  const images = ['https://picsum.photos/200/300', '/IMG_2432.JPG', 'https://picsum.photos/200/300', ''];

  return (<> <div ref = {ref} key={details.id}>
          <div className="one" key={details.id} >
            <div className="one-one"><h4>{props.title}</h4></div>
            <div  className="one-two">{highlights.map((item, index) => <span key={index} className="tag"> #{item}</span>)}</div>
          </div>
          <div className="two" key={details.id}>
                    <p>{props.title}{props.title}{props.title}</p>
                    <p>{props.title}</p>
            <Carousel key={details.id} imgUrls={images}></Carousel>
          </div>
          <div className="three" key={details.id} >test
          </div>
          <div className="component-container">
            { error.response &&<p className="error-msg">{error.response}</p>}
          </div>
          
          </div></>);
})
      
export default React.memo(Detail);