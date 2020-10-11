import React from 'react';
import Carousel from './controls/carousel.component'

const Detail = React.forwardRef((props, ref) => {

  return (<details ref = {ref}> {/* open = {props.idx === 0} */}
          <summary className="summary">
            <div className="title"><h4>{props.event.title}</h4></div>
            <div  className="tags">{props.event.tags.map((item, index) => <span key={index} className="tag"> #{item}</span>)}</div>
          </summary>
          <div  className="detail-container">
          <main className="content column">
            <Carousel highlights={props.event.highlights} idx={props.idx} imgUrls={props.event.media.map(i => '/api/todayi/getFile?filename=' + i)}></Carousel>
          </main>
          <main className="ref-content column"> <div><p> References</p> </div>
          {props.event.references.map((item, index) => <div key={index}><a target="_blank" rel="noopener noreferrer" className="refs" href={'https://'+item}> https://{item}</a></div>)}
          </main>
          <aside className="misc-content column"> <div><p> Misc.</p> </div>
          {props.event.references.map((item, index) => <div key={index}><a target="_blank" rel="noopener noreferrer" className="refs" href={'https://'+item}> https://{item}</a></div>)}
          </aside>
          </div>
          </details>);
})
      
export default React.memo(Detail);