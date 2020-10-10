import React, { useState } from 'react';
import './controls.scss'

const Carousel = (props) => {

const[currentIndex, setCurrentIndex] = useState(0);

const previousSlide = () => {
    const lastIndex = props.imgUrls.length - 1;
    const shouldResetIndex = currentIndex === 0;
    const index =  shouldResetIndex ? lastIndex : currentIndex - 1;

    setCurrentIndex(index);
  }

  const nextSlide = () => {
    const lastIndex = props.imgUrls.length - 1;
    const shouldResetIndex = currentIndex === lastIndex;
    const index =  shouldResetIndex ? 0 : currentIndex + 1;
    setCurrentIndex(index);
  }

return(<>
        <Arrow
          direction="left"
          clickFunction={ previousSlide }
          glyph="&#60;"/>
    <div><p className="bold">{props.highlights[currentIndex]}</p></div>
    <ImageSlide url={ props.imgUrls[currentIndex] }/>
    <Arrow
          direction="right"
          clickFunction={ nextSlide }
          glyph="&#62;"/>
        </>)
}

const ImageSlide = ({ url }) => {
    const styles = {
      backgroundImage: `url(${url})`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '40vh',
      width: '90vw',
      margin: '0.5rem'
    };
    return (
      <div className="image-slide" style={styles}></div>
    );
}

const Arrow = ({ direction, clickFunction, glyph }) => (
  <button onClick={ clickFunction } className={`${direction}Btn carousel-arrow`}>
    { glyph }
 </button>
  );
export default React.memo(Carousel);