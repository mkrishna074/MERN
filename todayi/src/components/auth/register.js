import React, {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'


const Register = () => {
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
        document.getElementById("create-register-form").reset();
    }
return(
    <div className="component-container clear">
        <form id="create-register-form">
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <input type="password" placeholder="password again" />
            <button type="submit" className="submit-button" onClick={handleOnSubmit}>
                Sign Up
            </button>
        </form>
      <Link to="/login">Already have an account?</Link>
    </div>
);
}
export default React.memo(Register);