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
return(
    <div className="component-container clear">
        <form id="create-type-form">

        <div className="form-group">
            <label>Type</label>
            <input type="text" 
            name="type"
            className="form-control" 
            onChange={handleInput}></input>
        </div>
            <button type="submit" onClick={handleOnSubmit}>
                <i className="fas fa-plus-square"></i>
            </button>
        </form>
     </div>
);
}
export default React.memo(AddEventType);