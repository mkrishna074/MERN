import React, {useEffect, useState} from 'react';

const AddMenuItem = () => {
return(
    <div className="menu-container clear">
        <form>
            <input type="text" className="item-input"></input>
            <button type="submit" className="submit-button">
                <i className="fas fa-plus-square"></i>
            </button>
        </form>
     </div>
);
}
export default React.memo(AddMenuItem);