import React, {useEffect, useState} from 'react';

const AddEventType = () => {
return(<>
    <div className="component-container clear">
        <form>
            <input type="text" className="item-input"></input>
            <button type="submit" className="submit-button">
                <i className="fas fa-plus-square"></i>
            </button>
        </form>
     </div>
        <div className="component-container">
            <ul className="type-list">
            <div className="type">
            <li>Test</li>
            <button className="trash-btn">
                <i className="fas fa-trash"></i>
            </button>
            </div>
            </ul>
        </div>
     </>
);
}
export default React.memo(AddEventType);