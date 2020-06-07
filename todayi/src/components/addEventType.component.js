import React, {useState} from 'react';
import axios from 'axios';


const AddEventType = () => {
    const[type, setType] = useState({});
    const handleInput = (e) => {
        console.log(e.target.value);
        setType({name: e.target.value});
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
        const body = JSON.stringify(type);
        axios
        .post('http://localhost:5000/api/todayi/addType',body, config)
        .then(res => {
            console.log(res);
            clearForm();
        })
        .catch(err => {
            console.log(err)
        });
    };
    const clearForm = () => { 
        document.getElementById("create-type-form").reset();
    }
return(<>
    <div className="component-container clear">
        <form id="create-type-form">
            <input type="text" className="item-input" onChange={handleInput}></input>
            <button type="submit" className="submit-button" onClick={handleOnSubmit}>
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