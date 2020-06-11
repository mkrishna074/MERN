import React, {useState} from 'react';
import axios from 'axios';


const AddEventType = () => {
    const[type, setType] = useState({});
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const handleInput = (e) => {
        setType({name: e.target.value});
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
        if (localStorage.getItem('token')) {
            config.headers['x-auth-token'] = localStorage.getItem('token');
        }
        const body = JSON.stringify(type);
        axios
        .post('http://localhost:5000/api/todayi/addType',body, config)
        .then(res => {
            console.log(res);
            clearForm();
        })
        .catch(e => {
            setIsError(true);
            setErrorMsg(e.response.data.message);
        });
    };
    const clearForm = () => { 
        document.getElementById("create-type-form").reset();
    }
return(<>
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
     <div className="component-container">{ isError &&<p className="error-msg">{errorMsg}</p>}</div> </>
);
}
export default React.memo(AddEventType);