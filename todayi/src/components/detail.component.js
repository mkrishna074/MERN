import React, {useState, useEffect} from 'react';
import Carousel from './controls/carousel.component' 
import axios from 'axios'

const Detail = React.forwardRef((props, ref) => {
  const  [details,setDetails]= useState({});
  const images = ['/IMG_2432.JPG'];

/*   useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:5000/api/todayi/getFile',
      params: {filename: '1592672682968.jpg'}
  })
  .then(res => {
    images.push("data:image/jpg;base64," + Buffer.from(res.data, 'binary').toString('base64'));
    console.log(images);
  })
  .catch((e) => {
    console.log(e);
  })
  }, []) */

  return (<> <details open = {props.idx === 0} ref = {ref}>
          <summary className="one">
            <div className="one-one"><h4>{props.event.title}</h4></div>
            <div  className="one-two">{props.event.tags.map((item, index) => <span key={index} className="tag"> #{item}</span>)}</div>
          </summary>
          <div className="two">
            <Carousel imgUrls={images}></Carousel>
          </div>
          <div className="three">test
          </div>
          </details></>);
})
      
export default React.memo(Detail);