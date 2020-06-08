import React, {useState} from 'react';
import axios from 'axios';


const Login = () => {
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
    };
    const clearForm = () => { 
        document.getElementById("create-login-form").reset();
    }
return(
    <div className="component-container clear">
        <form id="create-login-form">
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <button type="submit" className="submit-button" onClick={handleOnSubmit}>
                Sign In
            </button>
        </form>
    </div>
);
}
export default React.memo(Login);